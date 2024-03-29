#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const widget_service = require("./widget_service");
class MyWidgetServiceStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new widget_service.WidgetService(this, 'Widgets');
    }
}
exports.MyWidgetServiceStack = MyWidgetServiceStack;
const app = new cdk.App();
new MyWidgetServiceStack(app, 'MyWidgetServiceStack');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBc0M7QUFDdEMsbURBQW9EO0FBRXBELE1BQWEsb0JBQXFCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDL0MsWUFBWSxLQUFjLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNGO0FBTkgsb0RBTUc7QUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixJQUFJLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3RELEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jb3JlJyk7XG5pbXBvcnQgd2lkZ2V0X3NlcnZpY2UgPSByZXF1aXJlKCcuL3dpZGdldF9zZXJ2aWNlJyk7XG5cbmV4cG9ydCBjbGFzcyBNeVdpZGdldFNlcnZpY2VTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuICBcbiAgICAgIG5ldyB3aWRnZXRfc2VydmljZS5XaWRnZXRTZXJ2aWNlKHRoaXMsICdXaWRnZXRzJyk7XG4gICAgfVxuICB9XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5uZXcgTXlXaWRnZXRTZXJ2aWNlU3RhY2soYXBwLCAnTXlXaWRnZXRTZXJ2aWNlU3RhY2snKTtcbmFwcC5zeW50aCgpO1xuIl19