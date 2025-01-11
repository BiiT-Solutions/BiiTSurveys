export class Environment {
  public static readonly ROOT_URL: string = 'DOCKER:PROTOCOL://DOCKER:MACHINE_DOMAIN';
  public static readonly KAFKA_PROXY_PATH: string = '/kafka-proxy-backend';
  public static readonly USER_MANAGER_SYSTEM: string = '/user-manager-system-backend';

  public static SIGNUP_ALLOW = 'DOCKER:SIGNUP_ALLOW';
  public static SIGNUP_HIDE_PASSWORD = 'DOCKER:SIGNUP_HIDE_PASSWORD';
  public static SIGNUP_HIDE_USERNAME = 'DOCKER:SIGNUP_HIDE_USERNAME';
  public static SIGNUP_HIDE_TEAM = 'DOCKER:SIGNUP_HIDE_TEAM_ASSIGNMENT';
}
