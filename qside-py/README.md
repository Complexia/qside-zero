install poetry using something

run: poetry install

poetry run uvicorn src.app:app --port 8000 --host 0.0.0.0 --timeout-keep-alive 100

localhost:8000/docs

Update reqs:
pipreqs --force

## Local run with auto hot-reload is obvs therefore:

poetry run uvicorn src.app:app --port 8000 --reload

## To run with dock

docker-compose up