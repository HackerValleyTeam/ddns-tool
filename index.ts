import { CronJob } from 'cron';
import { every5Minutes } from './classes/cronPatterns'; // 引入定时规则 cron Patterns
import updateDNSConfig from './classes/jobs'; // 引入定时执行的任务 Jobs

updateDNSConfig(); // 初始化DDNS服务 initial DDNS
const job = new CronJob(every5Minutes, () => { // 初始化定时任务 initial cron job
  updateDNSConfig(); // 执行DDNS服务 execute DDNS
});

job.start(); // 开始定时任务 run cron job
