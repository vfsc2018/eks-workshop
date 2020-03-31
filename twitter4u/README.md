# Twitter Streaming Reader

## Configuring: `.env.sh`

* [ ] DOCKER_REGISTRY_PASSWORD
* [ ] CONSUMER_KEY=        Twitter consumer_key
* [ ] CONSUMER_SECRET=     Twitter consumer_secret
* [ ] ACCESS_TOKEN=        Twitter access_token
* [ ] ACCESS_TOKEN_SECRET= Twitter access_token_secret

* [ ] TWITTER_TOPICS=AWS,EC2,S3,Workspaces,Covid
* [ ] TWITTER_LANGUAGES=en,vi
* [ ] TWITTER_FILTER_LEVEL=none
* [ ] DESTINATION=kinesis:<your_kinesis_stream_name>,firehose:<your_firehose_stream_name>,stdout

> 🚀 `./deploy.sh`

## How to use this Docker Image

```bash
$ docker run \
    -e CONSUMER_KEY=xxxxx \
    -e CONSUMER_SECRET=xxxxx \
    -e ACCESS_TOKEN=xxxxx \
    -e ACCESS_TOKEN_SECRET=xxxxx \
    nnthanh101/twitter4u
```

### about Twitter Authentication

- `-e CONSUMER_KEY=...`
- `-e CONSUMER_SECRET=...`
- `-e ACCESS_TOKEN=...`
- `-e ACCESS_TOKEN_SECRET=...`

### Other options

- `-e TWITTER_TOPICS=AWS,EC2,S3,Workspaces,Covid`
- `-e TWITTER_LANGUAGES=en,vi`
- `-e TWITTER_FILTER_LEVEL=none`  # default: none
- `-e DESTINATION=kinesis:<your_kinesis_stream_name>,firehose:<your_firehose_stream_name>,stdout`  # default: stdout
