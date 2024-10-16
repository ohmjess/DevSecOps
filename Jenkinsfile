pipeline {
    agent any

    environment {
        APP_PORT = '3201'
        GIT_URL = 'https://github.com/BSO-Space/DevSecOps'
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch name for the build')
        string(name: 'DOCKER_TAG', defaultValue: 'latest', description: 'Docker image tag')
    }

    stages {
        stage('Checkout & Pulling') {
            steps {
                script {
                    cleanWs()
                    git branch: "${params.BRANCH_NAME}", url: "${GIT_URL}"
                    if ("${params.BRANCH_NAME}" != "main") {
                        error("This pipeline only runs on the main branch. Current branch: ${params.BRANCH_NAME}")
                    }
                    echo 'Pulling the project...'
                    sh "git pull origin ${params.BRANCH_NAME}"
                }
            }
        }

        // stage('Verify Branch') {
        //     steps {
        //         script {
        //             if ("${params.BRANCH_NAME}" != "main") {
        //                 error("This pipeline only runs on the main branch. Current branch: ${params.BRANCH_NAME}")
        //             }
        //         }
        //     }
        // }

        // stage('Pulling Project')
        // {
        //     steps {
        //         echo 'Pulling the project...'
        //         sh "git pull origin ${params.BRANCH_NAME}"
        //     }
        // }

        stage('Install Dependencies') {
            steps {
                echo 'Building the project...'
                sh 'npm install'
            }
        }

        stage('Testing with Jest') {
            steps {
                echo 'Running unit tests...'
                sh 'npm test'
            }
        }

        stage('Code analysis') {
            steps {
                withCredentials([string(credentialsId: 'test-sonar', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        npm install sonar-scanner
                        npx sonar-scanner \
                        -Dsonar.projectKey=mywebapp \
                        -Dsonar.host.url=http://sonarqube-dso-demo:9000 \
                        -Dsonar.login=$SONAR_TOKEN
                    '''
                }
            }
        }

        stage('Docker Deployment') {
            steps {
                echo 'Deploying the application...'
                sh "docker-compose up -d --build"
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
