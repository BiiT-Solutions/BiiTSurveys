export class Constants {
   public static readonly SESSION_STORAGE = class {
     public static readonly SESSION: string = 'session';
     public static readonly AUTH_TOKEN: string = 'authToken';
   }
  public static readonly HEADERS = class {
    public static readonly AUTHORIZATION: string = 'Authorization';
  }

   public static readonly PATHS = class {
     public static readonly KAFKA_CONTEXT: string = 'kafka-proxy-backend';
     public static readonly ASSETS: string = './assets';
   }
}
