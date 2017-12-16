import Config from 'getconfig';
import Pack from './../package';
import Speech from './routes/speech';
import Hapi from 'hapi';
import fs from 'fs';


const server = new Hapi.Server();

let connectionConfig = Config.connectConfig;

server.connection(connectionConfig);

server.route(Speech);

server.register(
    [
        require('vision'),
        require('inert'),
        {
            register: require('hapi-swagger'),
            options: {
                info: {
                    title: 'Test API Documentation',
                    version: Pack.version
                }
            }
        },
        {
            register: require('good'),
            options: Config.goodConfig
        }
    ],
    (err) => {
        if (err) {
            return console.error(err);
        }
        server.start((e) => {
            if (e) {
                throw e;
            }
			server.connections.forEach((item)=>{
				 console.log(`Server running at: ${item.info.uri}`);
			});           
        });
    }
);

export default server;
