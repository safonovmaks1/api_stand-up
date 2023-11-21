import fs from 'node:fs/promises';
import http from 'node:http';

const PORT = 8080;

http
	.createServer(async (reg, res) => {
		if (reg.method === 'GET' && reg.url === '/comedians') {
			try {
				const data = await fs.readFile('comedians2.json', 'utf-8');

				res.writeHead(200, {
					'Content-Type': 'text/json; charset=utf-8',
					'Access-Control-Allow-Origin': '*',
				});
				res.end(data);
			} catch (error) {
				res.writeHead(500, {
					'Content-Type': 'text/plain; charset=utf-8',
				});
				res.end(`Ошибка сервера: ${error}`);
			}
		} else {
			res.writeHead(404, {
				'Content-Type': 'text/plain; charset=utf-8',
			});
			res.end('Not Found');
		}
	})
	.listen(PORT);
console.log(`сервер запущен на http://localhost:${PORT}`);
