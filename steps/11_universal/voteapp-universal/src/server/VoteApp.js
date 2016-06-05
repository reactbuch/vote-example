"use strict";
import Hapi from 'hapi';
import Inert from 'inert';

import renderRoute from './renderRoute';

function start(port, voteDatabase) {
  const server = new Hapi.Server();
  server.connection(
    {
      port: port,

      routes: {
        // cors muss eingeschaltet werden, wenn die Client-Anwendung nicht über Hapi, sondern den Webpack Dev Server
        // ausgeliefert werden soll
        cors: true,
        json: {
          space: 2
        }
      }
    }
  );

  server.register(Inert, () => {
  });

  //
  // Wenn die Client-Anwendung über Hapi ausgeliefert werden soll, muss die folgende Route eingeschaltet werden.
  // Wenn die Client-Anwendung stattdessen über den Webpack Dev Server geliefert werden soll, dann muss die Route AUSgeschaltet werden:
  server.route({
    method:  'GET', //
    path:    '/{param*}', //
    handler: {
      directory: {
        path: `${__dirname}/../../public`
      }
    }
  });

  server.route({
    method:  'GET', //
    path:    '/api/votes', //
    handler: (request, reply) => {
      voteDatabase.getAllVotes((err, votes) => {
        const response = reply(votes);
        response.type('application/json');
      });
    }
  });

  server.route({
    method:  'GET', //
    path:    '/api/votes/{voteId}', //
    handler: (request, reply) => {
      const voteId = request.params.voteId;
      voteDatabase.getVoteById(voteId, (err, vote) => {
        if (vote) {
          const response = reply(vote);
          response.type('application/json');
        } else {
          const response = reply(`Invalid Vote id '${voteId}'`);
          response.code(404);
        }
      })
    }
  });
  //
  server.route({
    method:  'POST', //
    path:    '/api/votes', //
    handler: (request, reply) => {
      const payload = request.payload;
      const newVote = {
        title:       payload.title,
        description: payload.description,
        choices:     payload.choices.map((c) => ({count: 0, ...c}))
      };

      voteDatabase.store(newVote, (err, storedVote) => {
        const response = reply(storedVote);
        response.type('application/json');
      });
    }
  });
  //
  server.route({
    method:  'PUT', //
    path:    '/api/votes/{voteId}/choices/{choiceId}/vote', //
    handler: (request, reply) => {
      const voteId = request.params.voteId;
      const choiceId = request.params.choiceId;
      voteDatabase.getVoteById(voteId, (err, vote) => {
        if (!vote) {
          const response = reply(`Invalid Vote id '${voteId}'`);
          response.code(404);
          return;
        }

        const choice = vote.choices.find((c) => c.id === choiceId);
        if (!choice) {
          // invalid choice
          const response = reply(`Invalid Choice id '${choiceId}'`);
          response.code(404);
          return;
        }

        // increment count
        choice.count = choice.count + 1;

        // save vote
        voteDatabase.store(vote, (err, storedVote) => {
          const response = reply(storedVote);
          response.type('application/json');
        });
      });
    }
  });

  server.route({
    method:  'GET',
    path:    '/votes',
    handler: (request, reply) => {
      voteDatabase.getAllVotes((err, votes) => {
        renderRoute(request, reply, {votes});
      });
    }
  });

server.route({
  method:  'GET',
  path:    '/votes/{voteId}',
  handler: (request, reply) => {
    const voteId = request.params.voteId;
    voteDatabase.getVoteById(voteId, (err, currentVote) => {
      renderRoute(request, reply, {currentVote});
    });
  }
});

  server.start((err) => {
    if (err) {
      return console.error(`Server start failed ${err}`);
    }

    console.log(`Server running at: ${server.info.uri}`)
  });
}

export default {
  start
}


