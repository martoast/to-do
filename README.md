Build the Docker image:

docker build . -t to-do

Run the image:

docker run -p 3000:80 -d to-do