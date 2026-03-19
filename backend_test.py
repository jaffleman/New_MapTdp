import requests
import sys
from datetime import datetime
import json
import uuid

class MapTDPAPITester:
    def __init__(self, base_url="https://8596d153-c879-488a-aa7e-2fb549655121.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=None):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details or {}
        }
        self.test_results.append(result)

    def run_test(self, name, method, endpoint, expected_status, data=None, auth_required=False):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        if auth_required and self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        print(f"   Method: {method}")
        print(f"   Expected status: {expected_status}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            response_data = {}
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text}

            if success:
                print(f"✅ PASSED - Status: {response.status_code}")
                self.log_test(name, True, {
                    "status_code": response.status_code,
                    "response_size": len(response.text),
                    "has_data": bool(response_data)
                })
            else:
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.log_test(name, False, {
                    "expected_status": expected_status,
                    "actual_status": response.status_code,
                    "response": response.text[:200]
                })

            return success, response_data

        except Exception as e:
            print(f"❌ FAILED - Network Error: {str(e)}")
            self.log_test(name, False, {"error": str(e)})
            return False, {}

    def test_healthz(self):
        """Test health check endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/healthz",
            200
        )
        if success:
            if response.get('status') == 'ok':
                print("   Health response is valid")
            else:
                print(f"   Warning: Unexpected health response: {response}")
        return success

    def test_register(self, email, password, username):
        """Test user registration"""
        success, response = self.run_test(
            "User Registration",
            "POST",
            "api/auth/register",
            200,
            data={"email": email, "password": password, "username": username}
        )
        if success and 'token' in response:
            self.token = response['token']
            print(f"   Registered user: {username} ({email})")
            print(f"   Token received: {response['token'][:20]}...")
            return True
        return False

    def test_login(self, email, password):
        """Test user login"""
        success, response = self.run_test(
            "User Login",
            "POST",
            "api/auth/login",
            200,
            data={"email": email, "password": password}
        )
        if success and 'token' in response:
            self.token = response['token']
            print(f"   Login successful for: {email}")
            print(f"   Token received: {response['token'][:20]}...")
            return True
        return False

    def test_login_wrong_password(self, email, wrong_password):
        """Test login with wrong password"""
        success, response = self.run_test(
            "Login Wrong Password",
            "POST",
            "api/auth/login",
            401,
            data={"email": email, "password": wrong_password}
        )
        if success:
            print(f"   Correctly rejected wrong password")
        return success

    def test_get_me(self):
        """Test getting current user info"""
        if not self.token:
            print("❌ No token available for /me test")
            self.log_test("Get Current User", False, {"error": "No token available"})
            return False
            
        success, response = self.run_test(
            "Get Current User",
            "GET",
            "api/auth/me",
            200,
            auth_required=True
        )
        if success:
            print(f"   User info: {response.get('username')} ({response.get('email')})")
        return success

    def test_register_duplicate(self, email, password, username):
        """Test registering with duplicate email"""
        success, response = self.run_test(
            "Register Duplicate Email",
            "POST",
            "api/auth/register",
            400,
            data={"email": email, "password": password, "username": username}
        )
        if success:
            print(f"   Correctly rejected duplicate email")
        return success

    def test_proxy_endpoint(self):
        """Test a proxy endpoint to Express backend"""
        success, response = self.run_test(
            "Search Proxy (Express Backend)",
            "POST",
            "api/search",
            200,
            data={"query": "test"}
        )
        # Note: This might return empty array if Express backend is not connected
        print(f"   Search response: {response}")
        return success

def main():
    print("🚀 Starting MapTDP Backend API Tests")
    print("=" * 50)
    
    tester = MapTDPAPITester()
    
    # Generate unique test user
    test_id = str(uuid.uuid4())[:8]
    test_email = f"test_{test_id}@maptdp.fr"
    test_password = "TestPass123!"
    test_username = f"TestUser{test_id}"
    
    # Test 1: Health Check
    print("\n📋 Testing Health Endpoint")
    if not tester.test_healthz():
        print("❌ Health check failed - backend may be down")
        return 1

    # Test 2: Register New User
    print("\n📋 Testing User Registration")
    if not tester.test_register(test_email, test_password, test_username):
        print("❌ Registration failed, stopping tests")
        return 1

    # Test 3: Get Current User Info
    print("\n📋 Testing User Info Endpoint")
    if not tester.test_get_me():
        print("❌ Get user info failed")

    # Test 4: Login with Test User
    print("\n📋 Testing User Login")
    if not tester.test_login(test_email, test_password):
        print("❌ Login failed")

    # Test 5: Test Wrong Password
    print("\n📋 Testing Auth Error Handling")
    if not tester.test_login_wrong_password(test_email, "wrongpassword"):
        print("❌ Wrong password test failed")

    # Test 6: Test Duplicate Registration
    print("\n📋 Testing Duplicate Registration")
    if not tester.test_register_duplicate(test_email, test_password, test_username):
        print("❌ Duplicate registration test failed")

    # Test 7: Test Existing User (from requirements)
    print("\n📋 Testing Existing User Login")
    existing_success = tester.test_login("test@maptdp.fr", "test123")
    if not existing_success:
        print("❌ Warning: Existing test user login failed")

    # Test 8: Test Proxy Endpoint (Optional)
    print("\n📋 Testing Proxy Endpoint")
    proxy_success = tester.test_proxy_endpoint()
    if not proxy_success:
        print("⚠️  Proxy endpoint failed (Express backend may not be connected)")

    # Print Summary
    print("\n" + "=" * 50)
    print("📊 Test Results Summary")
    print("=" * 50)
    print(f"Total tests: {tester.tests_run}")
    print(f"Passed: {tester.tests_passed}")
    print(f"Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    # Save detailed results
    results_summary = {
        "total_tests": tester.tests_run,
        "passed_tests": tester.tests_passed,
        "success_rate": f"{(tester.tests_passed/tester.tests_run*100):.1f}%",
        "test_details": tester.test_results
    }
    
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results_summary, f, indent=2)
    
    print(f"\n📁 Detailed results saved to: /app/backend_test_results.json")
    
    # Return 0 if all critical tests pass, 1 otherwise
    critical_failures = tester.tests_run - tester.tests_passed
    return 0 if critical_failures <= 1 else 1  # Allow 1 failure for proxy endpoint

if __name__ == "__main__":
    sys.exit(main())