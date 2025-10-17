Here are the step-by-step instructions to create and configure an AWS EC2 server to host your Dockerized React application:

### Launch and Configure EC2 Instance
- Go to AWS Management Console, then EC2 Dashboard, and click “Launch Instance”.[1][2][3]
- Select an Amazon Machine Image (AMI), commonly Ubuntu Server 20.04 or Amazon Linux 2 AMI.[2][1]
- Choose an instance type (t2.micro is good for small apps).[1][2]
- Configure security groups: open SSH (port 22), HTTP (port 80), and HTTPS (port 443) so you can access your app and server.[2][1]
- Download the key pair (.pem file) for SSH access when you launch the instance.[3][1][2]

### SSH Into Instance and Setup Docker
- Set permissions for your key file: `chmod 400 your-key.pem`.[1]
- Connect via SSH: `ssh -i your-key.pem ubuntu@your-ec2-ip` (for Ubuntu) or `ssh -i "your-key.pem" ec2-user@your-ec2-public-ip` (for Amazon Linux 2).[3][2][1]
- Update the package list and install Docker:
  - Ubuntu:  
    ```
    sudo apt-get update
    sudo apt-get install docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    ```
  - Amazon Linux 2:
    ```
    sudo yum update -y
    sudo amazon-linux-extras install docker
    sudo service docker start
    ```
- Optionally, install Docker Compose:
  ```
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  docker-compose --version
  ```


### Prepare and Upload Your React App
- On your local machine, make sure your React app directory has a Dockerfile at the root, for example:
  ```Dockerfile
  FROM node:18-alpine AS build
  WORKDIR /app
  COPY package.json yarn.lock ./
  RUN yarn install --frozen-lockfile
  COPY . .
  RUN yarn build

  FROM nginx:alpine
  COPY --from=build /app/build /usr/share/nginx/html
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  ```
- Transfer your project to EC2 using `scp` or `git clone` if it's on GitHub.[4][5][3][1]

### Build and Run the Docker Container
- Inside your project directory on EC2, build the Docker image:
  ```
  sudo docker build -t react-app .
  ```
- Run the container:
  ```
  sudo docker run -d -p 80:80 react-app
  ```
- Now your React app should be accessible via your EC2 instance’s public IP.[3][1][2]

### Optional: Use Docker Compose
- For more complex setups (backend/frontend, Nginx proxy, etc.), create a `docker-compose.yml` file and start all services with:
  ```
  sudo docker-compose up -d
  ```


### Final Checks and Best Practices
- Ensure EC2’s security group allows traffic on required ports and that your instance’s public IP is reachable.[1][2]
- For production apps, consider adding a domain name and SSL/TLS (use Certbot with Nginx for HTTPS).[6][7][8]
- Automate deployment and scaling later with CI/CD pipelines (GitHub Actions) and infrastructure tools as needed.[9][2]

These steps will set up your AWS EC2 instance and serve your Dockerized React application on the cloud efficiently.[2][3][1]
