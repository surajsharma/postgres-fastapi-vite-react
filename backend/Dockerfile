FROM python:3.10.6
WORKDIR /backend
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
COPY ./requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt
COPY ./src /backend/src
EXPOSE 8000
WORKDIR /backend/src
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
