import { schema } from 'normalizr'

const user = new schema.Entity('users');
const message = new schema.Entity('messages', {
    user: user
});

export const log = new schema.Entity('logs', {
    messages: [message]
});

