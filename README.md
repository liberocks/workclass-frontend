# How to start gatsby with docker

```bash
docker build . -t workclass-frontend
docker run --name workclass-frontend-container -d -p 8000:8000 workclass-frontend
```
