FROM python:3-alpine
RUN python -m pip install --upgrade pip
RUN pip install flask==2.1.*

# install app
COPY hello.py /

# final configuration
ENV FLASK_APP=hello
EXPOSE 8000

CMD flask run --host 0.0.0.0 --port 8000
