# How to start gatsby with docker

```bash
docker build . -t workclass-frontend
docker run --name workclass-frontend-container -d -p 1234:1234 -e GATSBY_API_URL='http://127.0.0.1:8000' workclass-frontend
```
