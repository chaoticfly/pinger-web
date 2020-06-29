# A Simple Web Based Pinger 
The purpose of the project is to have a simple web page graph to test the network during work from home.

Functionality includes:
1. Streaming graph of ping requests
2. Packet loss monitoring.
3. Information of the available Wifi Networks.

This also demonstrates the use of websocketd as a WebSockets server for scripts. It uses a few open source libraires for charting listed below. While all the functionality is through shell scripts.

### Run the project
To run the project, download [websocketd](http://websocketd.com/) and place it in the same location. IF you have already, then run the following:
```shell
./websocketd --port=9000 --staticdir=web --dir=src
```
Each file in the src directory is accessible by apending it to the URL:
```
ws://localhost:9000/ping_loss.sh
```
Use the built in dev console for debugging.
```
./websocketd --port=9000 --devconsole --dir=src 
```
### Libraries used
Most of the library calls are through CDN to reduce the number of files used.
1. [Chart.js](https://www.chartjs.org/)
2. [Streaming Plugin](https://nagix.github.io/chartjs-plugin-streaming)
3. [Milligram](https://milligram.io/)

![pinger screen shot](https://user-images.githubusercontent.com/62998686/83900461-74c16680-a777-11ea-9747-271b9f17dbdc.png)

__Plain old JavaScript!__
