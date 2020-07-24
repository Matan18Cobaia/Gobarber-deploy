import IParseMailTemplateDTO from "../dtos/IParseMailTemplate";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({}: IParseMailTemplateDTO): Promise<string> {
    return 'Mail content';
  }
}
