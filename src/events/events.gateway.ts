import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateway {
    @SubscribeMessage('events')
    handleEvent(): string {
        console.log('Evento recibido');

        return 'Ey';
    }
}
