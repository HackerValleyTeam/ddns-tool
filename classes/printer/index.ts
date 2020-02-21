interface ColorIndex { // 颜色映射表接口
  blue:string,
  red:string,
  yellow:string,
  shineBlue:string,
  purple:string
}

class Printer {
  constructor() {
    this.style = { // 定义几种颜色，想增加颜色查表后在此增加
      blue: '\x1b[96m',
      red: '\x1b[91m',
      yellow: '\x1b[93m',
      shineBlue: '\x1b[36;5m',
      purple: '\x1b[34m',
    };
    this.print = this.print.bind(this);
    this.styledText = this.styledText.bind(this);
  }

  style:ColorIndex

  // print(<title>, <context>),分别输入提示符和输出内容文字，可单独使用
  print(title:string, context:string):void {
    process.stdout.write(`${this.style.blue}\u2744\x1b[95m ${title} \x1b[96m\u2744\x1b[0m ${context}\n`);
  }

  // 可以单独使用，用以生成有颜色的文字
  styledText(text:string, style:string):string {
    let result:string;
    switch (style) {
      case 'blue':
        result = `${this.style.blue}${text}\x1b[0m`;
        break;
      case 'red':
        result = `${this.style.red}${text}\x1b[0m`;
        break;
      case 'yellow':
        result = `${this.style.yellow}${text}\x1b[0m`;
        break;
      case 'shineBlue':
        result = `${this.style.shineBlue}${text}\x1b[0m`;
        break;
      case 'purple':
        result = `${this.style.purple}${text}\x1b[0m`;
        break;
      default:
        result = `${this.style.blue}${text}\x1b[0m`;
        break;
    }
    return result;
  }
}

const { print, styledText } = new Printer();
// 引用方法：
// import { print, styledText } from '../printer'
export { print, styledText };
