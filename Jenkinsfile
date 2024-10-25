pipeline {
    agent any       // any available agent (executor)

    stages {
        stage('Build') {
            steps {
                dir('DRF') {
                    echo 'Building...'
                    sh 'virtualenv env'
                    sh 'source env/bin/activate'
                    sh 'pip install -r requirements.txt'
                    sh 'python manage.py migrate'
                }
            }
        }
        stage('Test') {
            steps {
                dir('DRF') {
                    echo 'Testing...'
                    sh 'python manage.py test api.tests -v 2'
                }
            }
        }
        stage('Sync to S3'){
            steps {
                echo 'Consider using AWS CLI, a Jenkins plugin, or a pre-defined workflow'
                
                // aws s3 sync ./output-directory s3://your-bucket-name/
                // s3Upload(bucket: 'your-bucket-name', file: './output-directory/**', path: 'output/')
                // sh 'aws s3 sync ./output-directory s3://your-bucket-name/'
            }
        }
        stage('Deploy') {
            steps {
                dir('DRF') {
                    echo 'Deploying...'
                    echo 'Deployed!'
                }
            }
        }
    }


    // Post Actions for Cleanup or Notifications
    post {
        success {
            echo 'Tests passed successfully!'
            // Actions for successful builds (e.g., notifying developers)
        }
        failure {
            echo 'Tests failed. Please check the logs.'
            // Actions for failed builds (e.g., sending notifications, archiving logs)
        }
        always {
            echo 'This will always run, regardless of the build result.'
            // Cleanup or final actions
        }
    }
}
