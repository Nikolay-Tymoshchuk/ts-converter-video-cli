import { dirname, isAbsolute, join } from 'path';
import { promises } from 'fs';

export class FileService {
  private async isExists(path:string) {
    try {
      await promises.stat(path)
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, ext: string) {

    if (!isAbsolute(path)) {
      path = join(__dirname + '/' + path)
    }
    return join(dirname(path) + '/' + name + '.' + ext);
  }

  async deleteDileIfExists(path: string) {
    if(await this.isExists(path)) {
      await promises.unlink(path);
    }
  }
}