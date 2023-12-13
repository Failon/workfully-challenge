import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);
const env = process.env.NODE_ENV || 'dev';

try {
    loader.load(`${__dirname}/application_${env}.yaml`);
} catch (e: any) {
    console.log(e.message)
    throw e
}

export default container;