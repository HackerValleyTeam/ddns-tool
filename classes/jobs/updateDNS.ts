import Core from '@alicloud/pop-core'; // 阿里云api调用SDK aliyun core SDK
import req from 'request-promise'; // 用于对外请求 To request API
import { print, styledText } from '../printer'; // 用于打印信息 To print information to process.write
import config from '../../config';

const {
  accessKeyId,
  accessKeySecret,
  endpoint,
  apiVersion,
  subDomain,
  domain,
} = config;

const client = new Core({ // 实例化阿里云客户端 a client instance from the Aliyun Croe
  accessKeyId, // accessKeyID
  accessKeySecret, // accessKeySecret
  endpoint, // default API url
  apiVersion, // default API version
});

class DNSUpdater {
  private constructor(
    SubDomain: string, // 子域名 Subdomain
    Domain: string, // 域名 Domain
  ) {
    this.client = client;
    this.subDomain = SubDomain;
    this.domain = Domain;
    this.recordID = ''; // 域名解析记录的唯一ID Distinct domain name record ID
    this.ip = '';

    this.getRecordID = this.getRecordID.bind(this);
    this.update = this.update.bind(this);
  }

  private subDomain: string

  private domain: string

  private recordID: string

  private ip: string

  private client: Core

  // 从阿里云获取当前记录的ID及解析IP Get the domain name record ID and it's paresed IP from the Aliyun DNS
  private async getRecordID():Promise<{
    recordID: string,
    ip: string
  }> {
    const result: {
      DomainRecords: {
        Record: {
          Value: string,
          RecordId: string
        } []
      }
    } = await this.client.request( // https://help.aliyun.com/document_detail/29776.html?spm=a2c4g.11174283.6.652.2649571fkFXDxW
      'DescribeDomainRecords',
      {
        RegionId: 'default',
        DomainName: this.domain,
        KeyWord: this.subDomain,
      },
      { method: 'POST' },
    );
    const recordID = result.DomainRecords.Record[0].RecordId;
    const ip = result.DomainRecords.Record[0].Value;
    const len = result.DomainRecords.Record.length;

    // 如果返回的长度为1，recordID存在，就返回recordID和ip
    // If recordID existed and distinct then return record ID and it's ip
    if (recordID && len === 1) {
      return {
        recordID,
        ip,
      };
    }
    throw new Error('域名输入有错误');
  }

  public async update():Promise<void> {
    // 下面请求得到的结果是这样的 The result below there is qual:
    // "var returnCitySN = {"cip": "139.172.203.13", "cid": "110000", "cname": "北京市"};"
    const rsp:string = await req({
      method: 'GET',
      uri: 'http://pv.sohu.com/cityjson',
    });

    const ip = rsp.split('"')[3]; // the IP is now like "139.172.203.13" after we parse the rsp

    // 如果当前IP和域名记录值不等就更新 Update the Domain record if now ip is not eqaul the original ip
    if (ip !== this.ip) {
      this.ip = ip;
      await this.client.request( // https://help.aliyun.com/document_detail/29774.html?spm=a2c4g.11174283.6.657.2649571fmkXOJi
        'UpdateDomainRecord',
        {
          RegionId: 'default',
          RecordId: this.recordID,
          RR: this.subDomain,
          Type: 'A',
          Value: this.ip,
        },
        { method: 'POST' },
      );
      print('DDNS', styledText(`${new Date().toLocaleString()} : 将域名<${this.subDomain}.${this.domain}> 解析到 <${this.ip}>`, 'blue'));
    }

    // ip一样则打印信息 print something if the IPs are the same one
    print('DDNS', styledText(`${new Date().toLocaleString()} : 本地公网IP未曾改变，不需要重新解析`, 'purple'));
  }

  // 下面的代码为了实现单例模式，为了防止DNS实例被实例化多次
  // To against the DNSUpdater be instantiated multi-time, We use the Singleton Pattern below here
  private static instance: DNSUpdater // DNSUpdater 实例  DNSUpdater instance

  public static async run():Promise<void> {
    if (!this.instance) { // 如果没有实例化过 If it's never been instantiated
      // 实例化 intantiate
      this.instance = new DNSUpdater(subDomain, domain);
      try {
        const result = await this.instance.getRecordID();
        const { recordID, ip } = result;
        this.instance.recordID = recordID;
        this.instance.ip = ip;
        print('DDNS', styledText('This domain is dynamic parsing to your develop environment:', 'blue'));
        print('DDNS', styledText(`<${this.instance.subDomain}.${this.instance.domain}>`, 'yellow'));
        print('DDNS', styledText('Your domain has parsed to this ip :', 'blue'));
        print('DDNS', styledText(`<${this.instance.ip}>`, 'yellow'));
        await this.instance.update();
      } catch (error) {
        print('DDNS', styledText(error, 'red'));
      }
    } else { // 已经实例化过 Has been instantiated
      try {
        await this.instance.update();
      } catch (error) {
        print('DDNS', styledText(error, 'red'));
      }
    }
  }
}

const update = DNSUpdater.run;
export default update;
