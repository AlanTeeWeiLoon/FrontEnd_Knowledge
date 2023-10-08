# How Webpack work?

## Webpack compilation process

#### 3 Steps of webpack compilation process:
1. Initiliazation
2. Compilation
3. Export


### Initiliazation

<p>
Webpack will mix all CLI parameters, configuration files and default configuration into the final configuration object
</p>


| Note |
|------|
| <b>Example CLI parameters</b> |
|`npx webpack -- mode = devxxx --config xxx`|
| <b>Configuration files</b> |
| normally is `webpack.config.js`|
| <b>Default configuration</b>|
| Like default entry point will be `./src/index.js`|

<p>Process of configuration will completed by thrid party - <b>yargs</b> (able to found in node moduels folder) </p>

<p>This process is to prepare the final configuration object for the next step</p>

### Compilation

#### 1. Create Chunk

<p>Create chunk based on entry point (default <b>./src/index.js</b>)</p>

<p>All chunks have below attributes:</p>

- name: default as <b>main</b>
- id: uniqe number, *developement environment* will same with name, *production environment* will start with 0.

#### 2. Build all dependent modules

![Alt text](<dependent modules.drawio.png>)


#### 3. Generate chunk assets

<p>Webpack will generate a chunk assets list based on the configuration.</p>

![Alt text](<chunk assets.drawio.png>)


| Note |
|------|
| <b>Chunk hash</b> |
| Chunk hash is a hash string generated based on the contents of all chunk assets.|
|<b>Hash</b>|
|Hash is an algorithm that converts a string of random length into a string of specific length, and can guarantee that if the content has not changed, the hash string will not change |