"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// snippet-comment:[These are tags for the AWS doc team's sample catalog. Do not remove.]
// snippet-comment:[This should be in the lib/ directory]
// snippet-comment:[and only works with my_widget_service.ts in the bin/ directory]
// snippet-comment:[and widgets.js in the resources/ directory.]
// snippet-sourceauthor:[Doug-AWS]
// snippet-sourcedescription:[Creates an S3 bucket, handler for HTTP requests, and API Gateway to Lambda functions.]
// snippet-keyword:[CDK V0.24.1]
// snippet-keyword:[ApiGateway.LambdaIntegration function]
// snippet-keyword:[ApiGateway.RestApi function]
// snippet-keyword:[Bucket.grantReadWrite function]
// snippet-keyword:[Lambda.Function function]
// snippet-keyword:[S3.Bucket function]
// snippet-keyword:[TypeScript]
// snippet-service:[cdk]
// snippet-keyword:[Code Sample]
// snippet-sourcetype:[full-example]
// snippet-sourcedate:[2019-2-8]
// Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// This file is licensed under the Apache License, Version 2.0 (the "License").
// You may not use this file except in compliance with the License. A copy of the
// License is located at
//
// http://aws.amazon.com/apache2.0/
//
// This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
// OF ANY KIND, either express or implied. See the License for the specific
// language governing permissions and limitations under the License.
// snippet-start:[cdk.typescript.widget_service]
const cdk = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const s3 = require("@aws-cdk/aws-s3");
class WidgetService extends cdk.Construct {
    constructor(scope, id) {
        super(scope, id);
        const bucket = new s3.Bucket(this, "WidgetStore", {
            // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
            // the new bucket, and it will remain in your account until manually deleted. By setting the policy to 
            // DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
        const handler = new lambda.Function(this, "WidgetHandler", {
            runtime: lambda.Runtime.NODEJS_8_10,
            code: lambda.AssetCode.asset("resources"),
            handler: "widgets.main",
            environment: {
                BUCKET: bucket.bucketName
            }
        });
        bucket.grantReadWrite(handler); // was: handler.role);
        const api = new apigateway.RestApi(this, "widgets-api", {
            restApiName: "Widget Service",
            description: "This service serves widgets."
        });
        const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        });
        api.root.addMethod("GET", getWidgetsIntegration); // GET /
        // snippet-start:[cdk.typescript.widget_service.wire_up_functions]
        const widget = api.root.addResource("{id}");
        // Add new widget to bucket with: POST /{id}
        const postWidgetIntegration = new apigateway.LambdaIntegration(handler);
        // Get a specific widget from bucket with: GET /{id}
        const getWidgetIntegration = new apigateway.LambdaIntegration(handler);
        // Remove a specific widget from the bucket with: DELETE /{id}
        const deleteWidgetIntegration = new apigateway.LambdaIntegration(handler);
        widget.addMethod("POST", postWidgetIntegration); // POST /{id}
        widget.addMethod("GET", getWidgetIntegration); // GET /{id}
        widget.addMethod("DELETE", deleteWidgetIntegration); // DELETE /{id}
        // snippet-end:[cdk.typescript.widget_service.wire_up_functions]
    }
}
exports.WidgetService = WidgetService;
// snippet-end:[cdk.typescript.widget_service]
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0X3NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWRnZXRfc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlGQUF5RjtBQUN6Rix5REFBeUQ7QUFDekQsbUZBQW1GO0FBQ25GLGdFQUFnRTtBQUNoRSxrQ0FBa0M7QUFDbEMsb0hBQW9IO0FBQ3BILGdDQUFnQztBQUNoQywwREFBMEQ7QUFDMUQsZ0RBQWdEO0FBQ2hELG1EQUFtRDtBQUNuRCw2Q0FBNkM7QUFDN0MsdUNBQXVDO0FBQ3ZDLCtCQUErQjtBQUMvQix3QkFBd0I7QUFDeEIsZ0NBQWdDO0FBQ2hDLG9DQUFvQztBQUNwQyxnQ0FBZ0M7QUFDaEMsK0VBQStFO0FBQy9FLEVBQUU7QUFDRiwrRUFBK0U7QUFDL0UsaUZBQWlGO0FBQ2pGLHdCQUF3QjtBQUN4QixFQUFFO0FBQ0YsbUNBQW1DO0FBQ25DLEVBQUU7QUFDRixpRkFBaUY7QUFDakYsMkVBQTJFO0FBQzNFLG9FQUFvRTtBQUNwRSxnREFBZ0Q7QUFDaEQscUNBQXNDO0FBQ3RDLHNEQUF1RDtBQUN2RCw4Q0FBK0M7QUFDL0Msc0NBQXVDO0FBRXZDLE1BQWEsYUFBYyxTQUFRLEdBQUcsQ0FBQyxTQUFTO0lBQzlDLFlBQVksS0FBb0IsRUFBRSxFQUFVO1FBQzFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDaEQsZ0dBQWdHO1lBQ2hHLHVHQUF1RztZQUN2RyxxR0FBcUc7WUFDckcsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztTQUN6QyxDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUN6RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDekMsT0FBTyxFQUFFLGNBQWM7WUFDdkIsV0FBVyxFQUFFO2dCQUNYLE1BQU0sRUFBRSxNQUFNLENBQUMsVUFBVTthQUMxQjtTQUNGLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFFdEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDdEQsV0FBVyxFQUFFLGdCQUFnQjtZQUM3QixXQUFXLEVBQUUsOEJBQThCO1NBQzVDLENBQUMsQ0FBQztRQUVILE1BQU0scUJBQXFCLEdBQUcsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFO1lBQ3RFLGdCQUFnQixFQUFFLEVBQUUsa0JBQWtCLEVBQUUseUJBQXlCLEVBQUU7U0FDcEUsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxRQUFRO1FBRTFELGtFQUFrRTtRQUNsRSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1Qyw0Q0FBNEM7UUFDNUMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4RSxvREFBb0Q7UUFDcEQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2RSw4REFBOEQ7UUFDOUQsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsYUFBYTtRQUM5RCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsWUFBWTtRQUMzRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsZUFBZTtRQUNwRSxnRUFBZ0U7SUFDbEUsQ0FBQztDQUNGO0FBbERELHNDQWtEQztBQUNELDhDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNuaXBwZXQtY29tbWVudDpbVGhlc2UgYXJlIHRhZ3MgZm9yIHRoZSBBV1MgZG9jIHRlYW0ncyBzYW1wbGUgY2F0YWxvZy4gRG8gbm90IHJlbW92ZS5dXG4vLyBzbmlwcGV0LWNvbW1lbnQ6W1RoaXMgc2hvdWxkIGJlIGluIHRoZSBsaWIvIGRpcmVjdG9yeV1cbi8vIHNuaXBwZXQtY29tbWVudDpbYW5kIG9ubHkgd29ya3Mgd2l0aCBteV93aWRnZXRfc2VydmljZS50cyBpbiB0aGUgYmluLyBkaXJlY3RvcnldXG4vLyBzbmlwcGV0LWNvbW1lbnQ6W2FuZCB3aWRnZXRzLmpzIGluIHRoZSByZXNvdXJjZXMvIGRpcmVjdG9yeS5dXG4vLyBzbmlwcGV0LXNvdXJjZWF1dGhvcjpbRG91Zy1BV1NdXG4vLyBzbmlwcGV0LXNvdXJjZWRlc2NyaXB0aW9uOltDcmVhdGVzIGFuIFMzIGJ1Y2tldCwgaGFuZGxlciBmb3IgSFRUUCByZXF1ZXN0cywgYW5kIEFQSSBHYXRld2F5IHRvIExhbWJkYSBmdW5jdGlvbnMuXVxuLy8gc25pcHBldC1rZXl3b3JkOltDREsgVjAuMjQuMV1cbi8vIHNuaXBwZXQta2V5d29yZDpbQXBpR2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbiBmdW5jdGlvbl1cbi8vIHNuaXBwZXQta2V5d29yZDpbQXBpR2F0ZXdheS5SZXN0QXBpIGZ1bmN0aW9uXVxuLy8gc25pcHBldC1rZXl3b3JkOltCdWNrZXQuZ3JhbnRSZWFkV3JpdGUgZnVuY3Rpb25dXG4vLyBzbmlwcGV0LWtleXdvcmQ6W0xhbWJkYS5GdW5jdGlvbiBmdW5jdGlvbl1cbi8vIHNuaXBwZXQta2V5d29yZDpbUzMuQnVja2V0IGZ1bmN0aW9uXVxuLy8gc25pcHBldC1rZXl3b3JkOltUeXBlU2NyaXB0XVxuLy8gc25pcHBldC1zZXJ2aWNlOltjZGtdXG4vLyBzbmlwcGV0LWtleXdvcmQ6W0NvZGUgU2FtcGxlXVxuLy8gc25pcHBldC1zb3VyY2V0eXBlOltmdWxsLWV4YW1wbGVdXG4vLyBzbmlwcGV0LXNvdXJjZWRhdGU6WzIwMTktMi04XVxuLy8gQ29weXJpZ2h0IDIwMTAtMjAxOSBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy9cbi8vIFRoaXMgZmlsZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBBIGNvcHkgb2YgdGhlXG4vLyBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbi8vXG4vLyBodHRwOi8vYXdzLmFtYXpvbi5jb20vYXBhY2hlMi4wL1xuLy9cbi8vIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TXG4vLyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWNcbi8vIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4vLyBzbmlwcGV0LXN0YXJ0OltjZGsudHlwZXNjcmlwdC53aWRnZXRfc2VydmljZV1cbmltcG9ydCBjZGsgPSByZXF1aXJlKFwiQGF3cy1jZGsvY29yZVwiKTtcbmltcG9ydCBhcGlnYXRld2F5ID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1hcGlnYXRld2F5XCIpO1xuaW1wb3J0IGxhbWJkYSA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtbGFtYmRhXCIpO1xuaW1wb3J0IHMzID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1zM1wiKTtcblxuZXhwb3J0IGNsYXNzIFdpZGdldFNlcnZpY2UgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgYnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCBcIldpZGdldFN0b3JlXCIsIHtcbiAgICAgIC8vIFRoZSBkZWZhdWx0IHJlbW92YWwgcG9saWN5IGlzIFJFVEFJTiwgd2hpY2ggbWVhbnMgdGhhdCBjZGsgZGVzdHJveSB3aWxsIG5vdCBhdHRlbXB0IHRvIGRlbGV0ZVxuICAgICAgLy8gdGhlIG5ldyBidWNrZXQsIGFuZCBpdCB3aWxsIHJlbWFpbiBpbiB5b3VyIGFjY291bnQgdW50aWwgbWFudWFsbHkgZGVsZXRlZC4gQnkgc2V0dGluZyB0aGUgcG9saWN5IHRvIFxuICAgICAgLy8gREVTVFJPWSwgY2RrIGRlc3Ryb3kgd2lsbCBhdHRlbXB0IHRvIGRlbGV0ZSB0aGUgYnVja2V0LCBidXQgd2lsbCBlcnJvciBpZiB0aGUgYnVja2V0IGlzIG5vdCBlbXB0eS5cbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksIC8vIE5PVCByZWNvbW1lbmRlZCBmb3IgcHJvZHVjdGlvbiBjb2RlXG4gICAgfSk7XG5cbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIldpZGdldEhhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzhfMTAsIC8vIFNvIHdlIGNhbiB1c2UgYXN5bmMgaW4gd2lkZ2V0LmpzXG4gICAgICBjb2RlOiBsYW1iZGEuQXNzZXRDb2RlLmFzc2V0KFwicmVzb3VyY2VzXCIpLFxuICAgICAgaGFuZGxlcjogXCJ3aWRnZXRzLm1haW5cIixcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEJVQ0tFVDogYnVja2V0LmJ1Y2tldE5hbWVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGJ1Y2tldC5ncmFudFJlYWRXcml0ZShoYW5kbGVyKTsgLy8gd2FzOiBoYW5kbGVyLnJvbGUpO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuUmVzdEFwaSh0aGlzLCBcIndpZGdldHMtYXBpXCIsIHtcbiAgICAgIHJlc3RBcGlOYW1lOiBcIldpZGdldCBTZXJ2aWNlXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJUaGlzIHNlcnZpY2Ugc2VydmVzIHdpZGdldHMuXCJcbiAgICB9KTtcblxuICAgIGNvbnN0IGdldFdpZGdldHNJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGhhbmRsZXIsIHtcbiAgICAgIHJlcXVlc3RUZW1wbGF0ZXM6IHsgXCJhcHBsaWNhdGlvbi9qc29uXCI6ICd7IFwic3RhdHVzQ29kZVwiOiBcIjIwMFwiIH0nIH1cbiAgICB9KTtcblxuICAgIGFwaS5yb290LmFkZE1ldGhvZChcIkdFVFwiLCBnZXRXaWRnZXRzSW50ZWdyYXRpb24pOyAvLyBHRVQgL1xuXG4gICAgLy8gc25pcHBldC1zdGFydDpbY2RrLnR5cGVzY3JpcHQud2lkZ2V0X3NlcnZpY2Uud2lyZV91cF9mdW5jdGlvbnNdXG4gICAgY29uc3Qgd2lkZ2V0ID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoXCJ7aWR9XCIpO1xuXG4gICAgLy8gQWRkIG5ldyB3aWRnZXQgdG8gYnVja2V0IHdpdGg6IFBPU1QgL3tpZH1cbiAgICBjb25zdCBwb3N0V2lkZ2V0SW50ZWdyYXRpb24gPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihoYW5kbGVyKTtcblxuICAgIC8vIEdldCBhIHNwZWNpZmljIHdpZGdldCBmcm9tIGJ1Y2tldCB3aXRoOiBHRVQgL3tpZH1cbiAgICBjb25zdCBnZXRXaWRnZXRJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGhhbmRsZXIpO1xuXG4gICAgLy8gUmVtb3ZlIGEgc3BlY2lmaWMgd2lkZ2V0IGZyb20gdGhlIGJ1Y2tldCB3aXRoOiBERUxFVEUgL3tpZH1cbiAgICBjb25zdCBkZWxldGVXaWRnZXRJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGhhbmRsZXIpO1xuXG4gICAgd2lkZ2V0LmFkZE1ldGhvZChcIlBPU1RcIiwgcG9zdFdpZGdldEludGVncmF0aW9uKTsgLy8gUE9TVCAve2lkfVxuICAgIHdpZGdldC5hZGRNZXRob2QoXCJHRVRcIiwgZ2V0V2lkZ2V0SW50ZWdyYXRpb24pOyAvLyBHRVQgL3tpZH1cbiAgICB3aWRnZXQuYWRkTWV0aG9kKFwiREVMRVRFXCIsIGRlbGV0ZVdpZGdldEludGVncmF0aW9uKTsgLy8gREVMRVRFIC97aWR9XG4gICAgLy8gc25pcHBldC1lbmQ6W2Nkay50eXBlc2NyaXB0LndpZGdldF9zZXJ2aWNlLndpcmVfdXBfZnVuY3Rpb25zXVxuICB9XG59XG4vLyBzbmlwcGV0LWVuZDpbY2RrLnR5cGVzY3JpcHQud2lkZ2V0X3NlcnZpY2VdXG4iXX0=