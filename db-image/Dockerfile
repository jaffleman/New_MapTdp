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

      - name: Show docker info (debug)
        run: |
          docker version
          docker info

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        id: buildx
        uses: docker/setup-buildx-action@v3
        with:
          install: true
          driver: docker-container
          # (optionnel) image plus récente de buildkit
          # driver-opts: image=moby/buildkit:latest

      - name: Inspect Buildx (debug)
        run: |
          docker buildx version
          docker buildx ls
          docker buildx inspect "${{ steps.buildx.outputs.name }}" --bootstrap

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build & Push
        uses: docker/build-push-action@v6
        with:
          # ⚠️ on force l'utilisation du builder créé plus haut
          builder: ${{ steps.buildx.outputs.name }}
          context: ./db-image
          file: ./db-image/Dockerfile
          push: true
          platforms: linux/amd64,linux/arm64
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ env.TAG }}
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max