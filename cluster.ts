import cluster from 'cluster';
import os from 'os';

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  console.log(`Master PID: ${process.pid}`);

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. Starting new worker`);
      cluster.fork();
    }
  });

  process.on('SIGUSR2', () => {
    const workers = Object.values(cluster.workers);

    const restartWorker = (workerIndex: number) => {
      const worker = workers[workerIndex];
      if (!worker) return;

      worker.on('exit', () => {
        if (!worker.exitedAfterDisconnect) return;
        console.log(`Exited process ${worker.process.pid}`);
        cluster.fork();
      });

      worker.disconnect();
    };

    restartWorker(0);
  });
} else {
  require('./index');
}
