from prometheus_client import start_http_server, Gauge
import psutil
import time

# Define Prometheus metrics
cpu_usage = Gauge('cpu_usage_percent', 'CPU Usage Percentage')
memory_usage = Gauge('memory_usage_percent', 'Memory Usage Percentage')

# Start Prometheus server on port 8000
start_http_server(8000)

while True:
    # Collect system metrics
    cpu_usage.set(psutil.cpu_percent())
    print("ok")
    memory_usage.set(psutil.virtual_memory().percent)
    time.sleep(5)
