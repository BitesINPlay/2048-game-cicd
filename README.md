# 2048 Game with Docker and AWS CI/CD

This project is a web-based 2048 game built with HTML, CSS, and JavaScript, containerized with Docker, and deployed on AWS using a CI/CD pipeline.

Every change pushed to GitHub automatically triggers a pipeline that builds a new Docker image, pushes it to Amazon ECR, and deploys the updated version to Amazon ECS.

---

## Live Project Overview

This project demonstrates a complete deployment workflow for a containerized web application.

### Workflow
1. Code is pushed to GitHub
2. AWS CodePipeline detects the change
3. AWS CodeBuild builds a new Docker image
4. The image is pushed to Amazon ECR
5. Amazon ECS deploys the updated container

---

## Technologies Used

- HTML
- CSS
- JavaScript
- Docker
- Git and GitHub
- AWS ECR
- AWS ECS Fargate
- AWS CodeBuild
- AWS CodePipeline
