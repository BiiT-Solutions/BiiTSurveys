export class Constants {
  public static readonly APP = class {
    public static readonly APP_PERMISSION_NAME: string = 'BIITSURVEYS';
  }

  public static readonly SESSION_STORAGE = class {
     public static readonly SESSION: string = 'session';
     public static readonly AUTH_TOKEN: string = 'authToken';
     public static readonly AUTH_EXPIRATION: string = 'authExp';
     public static readonly USER: string = 'user';
   }
  public static readonly HEADERS = class {
    public static readonly AUTHORIZATION: string = 'Authorization';
    public static readonly AUTHORIZATION_RESPONSE: string = 'authorization';
    public static readonly EXPIRES: string = 'expires';
    public static readonly CACHE_CONTROL: string = 'Cache-Control';
    public static readonly PRAGMA: string = 'Pragma';
  }

   public static readonly PATHS = class {
     public static readonly KAFKA_CONTEXT: string = 'kafka-proxy-backend';
     public static readonly ASSETS: string = './assets';
     public static readonly NCA: string = '/nca';
     public static readonly QUERY = class {
       public static readonly EXPIRED: string = 'expired';
       public static readonly REDIRECT: string = 'r';
       public static readonly LOGOUT: string = 'logout';
     }
   }
}
