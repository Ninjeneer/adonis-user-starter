export default class Utils {
	public static buildServerUrl(values?: { protocol?: string, host?: string, port?: number }): string {
		if (values)
			return `${values.protocol ? values.protocol : 'http'}://${values.host ? values.host : 'localhost'}:${values.port ? values.port : '3333'}`;
		else
			return 'http://localhost:3333';
	}
}
