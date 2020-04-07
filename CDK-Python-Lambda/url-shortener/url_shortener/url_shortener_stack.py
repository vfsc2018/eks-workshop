# from aws_cdk.core import App, Construct, Duration
from aws_cdk import core
from aws_cdk import aws_dynamodb, aws_lambda, aws_apigateway


class UrlShortenerStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        ## The code that defines your stack goes here
        ## ==>
        ## Define the table that maps short codes to URLs.
        table = aws_dynamodb.Table(self, "mapping-table",
                                   partition_key=aws_dynamodb.Attribute(
                                       name="id",
                                       type=aws_dynamodb.AttributeType.STRING),
                                   read_capacity=10,
                                   write_capacity=5)

        ## Define the API gateway request handler. all API requests will go to the same function.
        # handler = aws_lambda.Function(self, "UrlShortenerFunction",
        #                               code=aws_lambda.Code.asset("./lambda"),
        #                               handler="handler.main",
        #                               timeout=Duration.minutes(5),
        #                               runtime=aws_lambda.Runtime.PYTHON_3_7)
        handler = aws_lambda.Function(self, "UrlShortenerFunction",
                                      runtime=aws_lambda.Runtime.PYTHON_3_7,
                                      handler="handler.main",
                                      code=aws_lambda.AssetCode(path="./lambda"))

        ## Pass the table name to the handler through an environment variable and 
        ## grant the handler read/write permissions on the table.
        table.grant_read_write_data(handler)
        handler.add_environment('TABLE_NAME', table.table_name)

        ## Define the API endpoint and associate the handler
        api = aws_apigateway.LambdaRestApi(self, "UrlShortenerApi",
                                           handler=handler)
