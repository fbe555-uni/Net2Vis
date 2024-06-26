FROM python:3.8

WORKDIR /backend

COPY requirements.txt ./

RUN pip install -U pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "server.py"]
