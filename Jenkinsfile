pipeline {
    agent any

    environment {
        SONARQUBE_SERVER = 'SonarQube' 
        DOCKER_IMAGE = 'your-docker-image'
        APP_PORT = '3201'
        APP_NAME = 'your-app-name'
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch name for the build')
        string(name: 'DOCKER_TAG', defaultValue: 'latest', description: 'Docker image tag')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    cleanWs()
                    git branch: "${params.BRANCH_NAME}", url: 'https://github.com/your-repo/your-project'
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running unit tests...'
                sh 'npm test'
            }
        }

        stage('Scan') {
            steps {
                withCredentials([string(credentialsId: 'jenkins-sonarqube', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        npm install sonar-scanner
                        npx sonar-scanner \
                        -Dsonar.projectKey=your_project_key \
                        -Dsonar.host.url=http://sonarqube:9000 \
                        -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:${params.DOCKER_TAG} ."
                echo "Docker image built: ${DOCKER_IMAGE}:${params.DOCKER_TAG}"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // ตัวอย่างการนำไปใช้โดยใช้ Docker
                sh "docker run -d -p ${APP_PORT}:3201 ${DOCKER_IMAGE}:${params.DOCKER_TAG}"
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
        cleanup {
            echo 'Cleaning up...'
        }
    }
}
