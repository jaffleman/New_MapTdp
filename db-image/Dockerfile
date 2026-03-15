name: Build & Push DB Image (Docker Hub)

on:
  push:
    branches: [ "main" ]
    paths:
      - "db-image/**"
      - ".github/workflows/build-db-dockerhub.yml"
  workflow_dispatch: {}

env:
  REGISTRY: docker.io
  IMAGE_NAME: jaffleman971/maptdp-db
  TAG: "16.10"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        with:
          install: true
          driver: docker-container

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build & Push
        uses: docker/build-push-action@v6
        with:
          context: ./db-image
          file: ./db-image/Dockerfile
          push: true
          platforms: linux/amd64,linux/arm64
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ env.TAG }}
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max