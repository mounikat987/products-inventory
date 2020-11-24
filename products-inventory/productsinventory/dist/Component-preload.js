//@ui5-bundle products/inventory/productsinventory/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"products/inventory/productsinventory/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","./model/models","./controller/ErrorHandler"],function(t,e,s,i){"use strict";return t.extend("products.inventory.productsinventory.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments);this._oErrorHandler=new i(this);this.setModel(s.createDeviceModel(),"device");this.getRouter().initialize()},destroy:function(){this._oErrorHandler.destroy();t.prototype.destroy.apply(this,arguments)},getContentDensityClass:function(){if(this._sContentDensityClass===undefined){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._sContentDensityClass=""}else if(!e.support.touch){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass}})});
},
	"products/inventory/productsinventory/controller/App.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("products.inventory.productsinventory.controller.App",{onInit:function(){var e,n,o=this.getView().getBusyIndicatorDelay();e=new t({busy:true,delay:0});this.setModel(e,"appView");n=function(){e.setProperty("/busy",false);e.setProperty("/delay",o)};this.getOwnerComponent().getModel().metadataLoaded().then(n);this.getOwnerComponent().getModel().attachMetadataFailed(n);this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())}})});
},
	"products/inventory/productsinventory/controller/BaseController.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/m/library"],function(e,t,r){"use strict";var o=r.URLHelper;return e.extend("products.inventory.productsinventory.controller.BaseController",{getRouter:function(){return t.getRouterFor(this)},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},onShareEmailPress:function(){var e=this.getModel("objectView")||this.getModel("worklistView");o.triggerEmail(null,e.getProperty("/shareSendEmailSubject"),e.getProperty("/shareSendEmailMessage"))}})});
},
	"products/inventory/productsinventory/controller/ErrorHandler.js":function(){sap.ui.define(["sap/ui/base/Object","sap/m/MessageBox"],function(e,s){"use strict";return e.extend("products.inventory.productsinventory.controller.ErrorHandler",{constructor:function(e){this._oResourceBundle=e.getModel("i18n").getResourceBundle();this._oComponent=e;this._oModel=e.getModel();this._bMessageOpen=false;this._sErrorText=this._oResourceBundle.getText("errorText");this._oModel.attachMetadataFailed(function(e){var s=e.getParameters();this._showServiceError(s.response)},this);this._oModel.attachRequestFailed(function(e){var s=e.getParameters();if(s.response.statusCode!=="404"||s.response.statusCode===404&&s.response.responseText.indexOf("Cannot POST")===0){this._showServiceError(s.response)}},this)},_showServiceError:function(e){if(this._bMessageOpen){return}this._bMessageOpen=true;s.error(this._sErrorText,{id:"serviceErrorMessageBox",details:e,styleClass:this._oComponent.getContentDensityClass(),actions:[s.Action.CLOSE],onClose:function(){this._bMessageOpen=false}.bind(this)})}})});
},
	"products/inventory/productsinventory/controller/NotFound.controller.js":function(){sap.ui.define(["./BaseController"],function(n){"use strict";return n.extend("products.inventory.productsinventory.controller.NotFound",{onLinkPressed:function(){this.getRouter().navTo("worklist")}})});
},
	"products/inventory/productsinventory/controller/Object.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","sap/ui/core/routing/History","../model/formatter"],function(e,t,n,o){"use strict";return e.extend("products.inventory.productsinventory.controller.Object",{formatter:o,onInit:function(){var e,n=new t({busy:true,delay:0});this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched,this);e=this.getView().getBusyIndicatorDelay();this.setModel(n,"objectView");this.getOwnerComponent().getModel().metadataLoaded().then(function(){n.setProperty("/delay",e)})},onNavBack:function(){var e=n.getInstance().getPreviousHash();if(e!==undefined){history.go(-1)}else{this.getRouter().navTo("worklist",{},true)}},_onObjectMatched:function(e){var t=e.getParameter("arguments").objectId;this.getModel().metadataLoaded().then(function(){var e=this.getModel().createKey("Products",{ProductID:t});this._bindView("/"+e)}.bind(this))},_bindView:function(e){var t=this.getModel("objectView"),n=this.getModel();this.getView().bindElement({path:e,events:{change:this._onBindingChange.bind(this),dataRequested:function(){n.metadataLoaded().then(function(){t.setProperty("/busy",true)})},dataReceived:function(){t.setProperty("/busy",false)}}})},_onBindingChange:function(){var e=this.getView(),t=this.getModel("objectView"),n=e.getElementBinding();if(!n.getBoundContext()){this.getRouter().getTargets().display("objectNotFound");return}var o=this.getResourceBundle(),i=e.getBindingContext().getObject(),a=i.ProductID,r=i.ProductName;t.setProperty("/busy",false);t.setProperty("/shareSendEmailSubject",o.getText("shareSendEmailObjectSubject",[a]));t.setProperty("/shareSendEmailMessage",o.getText("shareSendEmailObjectMessage",[r,a,location.href]))}})});
},
	"products/inventory/productsinventory/controller/Worklist.controller.js":function(){sap.ui.define(["./BaseController","sap/ui/model/json/JSONModel","../model/formatter","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,i,r,o){"use strict";return e.extend("products.inventory.productsinventory.controller.Worklist",{formatter:i,onInit:function(){var e,i,r=this.byId("table");i=r.getBusyIndicatorDelay();this._aTableSearchState=[];e=new t({worklistTableTitle:this.getResourceBundle().getText("worklistTableTitle"),shareOnJamTitle:this.getResourceBundle().getText("worklistTitle"),shareSendEmailSubject:this.getResourceBundle().getText("shareSendEmailWorklistSubject"),shareSendEmailMessage:this.getResourceBundle().getText("shareSendEmailWorklistMessage",[location.href]),tableNoDataText:this.getResourceBundle().getText("tableNoDataText"),tableBusyDelay:0});this.setModel(e,"worklistView");r.attachEventOnce("updateFinished",function(){e.setProperty("/tableBusyDelay",i)})},onUpdateFinished:function(e){var t,i=e.getSource(),r=e.getParameter("total");if(r&&i.getBinding("items").isLengthFinal()){t=this.getResourceBundle().getText("worklistTableTitleCount",[r])}else{t=this.getResourceBundle().getText("worklistTableTitle")}this.getModel("worklistView").setProperty("/worklistTableTitle",t)},onPress:function(e){this._showObject(e.getSource())},onNavBack:function(){history.go(-1)},onSearch:function(e){if(e.getParameters().refreshButtonPressed){this.onRefresh()}else{var t=[];var i=e.getParameter("query");if(i&&i.length>0){t=[new r("ProductName",o.Contains,i)]}this._applySearch(t)}},onRefresh:function(){var e=this.byId("table");e.getBinding("items").refresh()},_showObject:function(e){this.getRouter().navTo("object",{objectId:e.getBindingContext().getProperty("ProductID")})},_applySearch:function(e){var t=this.byId("table"),i=this.getModel("worklistView");t.getBinding("items").filter(e,"Application");if(e.length!==0){i.setProperty("/tableNoDataText",this.getResourceBundle().getText("worklistNoDataWithSearchText"))}}})});
},
	"products/inventory/productsinventory/i18n/i18n.properties":'# This is the resource bundle for Products Inventory\n\n#XTIT: Application name\nappTitle=Products Inventory\n\n#YDES: Application description\nappDescription=An SAP Fiori freestyle app to manage products inventory (demo)\n\n#~~~ Worklist View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Worklist view title\nworklistViewTitle=Manage <ProductsPlural>\n\n#XTIT: Worklist page title\nworklistTitle=Products Inventory\n\n#XTIT: Table view title\nworklistTableTitle=<ProductsPlural>\n\n#XTOL: Tooltip for the search field\nworklistSearchTooltip=Enter an <Products> name or a part of it.\n\n#XBLI: text for a table with no data with filter or search\nworklistNoDataWithSearchText=No matching <ProductsPlural> found\n\n#XTIT: Table view title with placeholder for the number of items\nworklistTableTitleCount=<Products> ({0})\n\n#XTIT: The title of the column containing the ProductName of Products\ntableNameColumnTitle=<ProductName>\n\n#XTIT: The title of the column containing the UnitPrice and the unit of measure\ntableUnitNumberColumnTitle=<UnitPrice>\n\n#XBLI: text for a table with no data\ntableNoDataText=No <ProductsPlural> are currently available\n\n#XLNK: text for link in \'not found\' pages\nbackToWorklist=Show Products Inventory\n\n#~~~ Object View ~~~~~~~~~~~~~~~~~~~~~~~~~~\n#XTIT: Object view title\nobjectViewTitle=<Products> Details\n\n#XTIT: Object page title\nobjectTitle=<Products>\n\n\n#XTIT: Label for the ProductName\nProductNameLabel=ProductName\n\n#XTIT: Label for the UnitPrice\nUnitPriceLabel=UnitPrice\n\n\n#~~~ Share Menu Options ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Send E-Mail subject\nshareSendEmailWorklistSubject=<Email subject PLEASE REPLACE ACCORDING TO YOUR USE CASE>\n\n#YMSG: Send E-Mail message\nshareSendEmailWorklistMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE>\\r\\n{0}\n\n#XTIT: Send E-Mail subject\nshareSendEmailObjectSubject=<Email subject including object identifier PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0}\n\n#YMSG: Send E-Mail message\nshareSendEmailObjectMessage=<Email body PLEASE REPLACE ACCORDING TO YOUR USE CASE> {0} (id: {1})\\r\\n{2}\n\n\n#~~~ Not Found View ~~~~~~~~~~~~~~~~~~~~~~~\n\n#XTIT: Not found view title\nnotFoundTitle=Not Found\n\n#YMSG: The Products not found text is displayed when there is no Products with this id\nnoObjectFoundText=This <Products> is not available\n\n#YMSG: The Products not available text is displayed when there is no data when starting the app\nnoObjectsAvailableText=No <ProductsPlural> are currently available\n\n#YMSG: The not found text is displayed when there was an error loading the resource (404 error)\nnotFoundText=The requested resource was not found\n\n#~~~ Error Handling ~~~~~~~~~~~~~~~~~~~~~~~\n\n#YMSG: Error dialog description\nerrorText=Sorry, a technical error occurred! Please try again later.',
	"products/inventory/productsinventory/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"products.inventory.productsinventory","type":"application","i18n":"i18n/i18n.properties","title":"{{appTitle}}","description":"{{appDescription}}","applicationVersion":{"version":"1.0.0"},"resources":"resources.json","dataSources":{"mainService":{"uri":"V2/Northwind/Northwind.svc/","type":"OData","settings":{"odataVersion":"2.0","localUri":"localService/metadata.xml"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"sap-icon://task","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"rootView":{"viewName":"products.inventory.productsinventory.view.App","type":"XML","async":true,"id":"app"},"dependencies":{"minUI5Version":"1.66.0","libs":{"sap.ui.core":{},"sap.m":{},"sap.f":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"products.inventory.productsinventory.i18n.i18n"}},"":{"dataSource":"mainService","preload":true}},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","viewPath":"products.inventory.productsinventory.view","controlId":"app","controlAggregation":"pages","bypassed":{"target":["notFound"]},"async":true},"routes":[{"pattern":"","name":"worklist","target":["worklist"]},{"pattern":"Products/{objectId}","name":"object","target":["object"]}],"targets":{"worklist":{"viewName":"Worklist","viewId":"worklist","viewLevel":1,"title":"{i18n>worklistViewTitle}"},"object":{"viewName":"Object","viewId":"object","viewLevel":2,"title":"{i18n>objectViewTitle}"},"objectNotFound":{"viewName":"ObjectNotFound","viewId":"objectNotFound"},"notFound":{"viewName":"NotFound","viewId":"notFound"}}}}}',
	"products/inventory/productsinventory/model/formatter.js":function(){sap.ui.define([],function(){"use strict";return{numberUnit:function(n){if(!n){return""}return parseFloat(n).toFixed(2)}}});
},
	"products/inventory/productsinventory/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"products/inventory/productsinventory/view/App.view.xml":'<mvc:View\n\tcontrollerName="products.inventory.productsinventory.controller.App"\n\tdisplayBlock="true"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><Shell><App\n\t\tid="app"\n\t\tbusy="{appView>/busy}"\n\t\tbusyIndicatorDelay="{appView>/delay}"/></Shell></mvc:View>',
	"products/inventory/productsinventory/view/NotFound.view.xml":'<mvc:View\n\tcontrollerName="products.inventory.productsinventory.controller.NotFound"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\n\t\ttitle="{i18n>notFoundTitle}"\n\t\ttext="{i18n>notFoundText}"\n\t\ticon="sap-icon://document"\n\t\tid="page"\n\t\tdescription=""><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed"/></customDescription></MessagePage></mvc:View>',
	"products/inventory/productsinventory/view/Object.view.xml":'<mvc:View\n\tcontrollerName="products.inventory.productsinventory.controller.Object"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:semantic="sap.f.semantic"><semantic:SemanticPage\n\t\tid="page"\n\t\theaderPinnable="false"\n\t\ttoggleHeaderOnTitleClick="false"\n\t\tbusy="{objectView>/busy}"\n\t\tbusyIndicatorDelay="{objectView>/delay}"><semantic:titleHeading><Title\n\t\t\t\ttext="{ProductName}"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:headerContent><ObjectNumber\n\t\t\t\tnumber="{\n\t\t\t\t\tpath: \'UnitPrice\',\n\t\t\t\t\tformatter: \'.formatter.numberUnit\'\n\t\t\t\t}"\n\t\t\t\tunit="{QuantityPerUnit}"\n\t\t\t/></semantic:headerContent><semantic:sendEmailAction><semantic:SendEmailAction id="shareEmail" press=".onShareEmailPress"/></semantic:sendEmailAction></semantic:SemanticPage></mvc:View>',
	"products/inventory/productsinventory/view/ObjectNotFound.view.xml":'<mvc:View\n\tcontrollerName="products.inventory.productsinventory.controller.NotFound"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"><MessagePage\n\t\ttitle="{i18n>objectTitle}"\n\t\ttext="{i18n>noObjectFoundText}"\n\t\ticon="sap-icon://product"\n\t\tdescription=""\n\t\tid="page"><customDescription><Link id="link" text="{i18n>backToWorklist}" press=".onLinkPressed" /></customDescription></MessagePage></mvc:View>',
	"products/inventory/productsinventory/view/Worklist.view.xml":'<mvc:View\n\tcontrollerName="products.inventory.productsinventory.controller.Worklist"\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\txmlns:semantic="sap.f.semantic"><semantic:SemanticPage\n\t\tid="page"\n\t\theaderPinnable="false"\n\t\ttoggleHeaderOnTitleClick="false"><semantic:titleHeading><Title\n\t\t\t\ttext="{i18n>worklistTitle}"\n\t\t\t\tlevel="H2"/></semantic:titleHeading><semantic:content><VBox><IconTabBar id="iconTabBar" select=".onFilterSelect" class="sapUiResponsiveContentPadding"><items><IconTabFilter showAll="true" count="{worklistView>/productsCount}" text="{i18n>worklistFilterAllProducts}" key="all"></IconTabFilter><IconTabSeparator ></IconTabSeparator><IconTabFilter icon="sap-icon://complete" iconColor="Positive" text="{i18n>worklistFilterNormalStockProducts}" key="Normal"></IconTabFilter><IconTabFilter icon="sap-icon://message-warning" iconColor="Critical" text="{i18n>worklistFilterLowStockProducts}" key="Low"></IconTabFilter><IconTabFilter icon="sap-icon://message-error" iconColor="Negative" text="{i18n>worklistFilterShortageStockProducts}" key="Shortage"></IconTabFilter></items></IconTabBar><Table\n                    id="table"\n                    width="auto"\n                    items="{\n                        path: \'/Products\',\n                        sorter: {\n                            path: \'ProductName\',\n                            descending: false\n                        }\n                    }"\n                    noDataText="{worklistView>/tableNoDataText}"\n                    busyIndicatorDelay="{worklistView>/tableBusyDelay}"\n                    growing="true"\n                    growingScrollToLoad="true"\n                    updateFinished=".onUpdateFinished"><headerToolbar><OverflowToolbar><Title\n                                id="tableHeader"\n                                text="{worklistView>/worklistTableTitle}"\n                                level="H3"/><ToolbarSpacer /><SearchField\n                                id="searchField"\n                                tooltip="{i18n>worklistSearchTooltip}"\n                                search=".onSearch"><layoutData><OverflowToolbarLayoutData\n                                        maxWidth="200px"\n                                        priority="NeverOverflow"/></layoutData></SearchField></OverflowToolbar></headerToolbar><columns><Column id="nameColumn"><Text text="{i18n>tableNameColumnTitle}" id="nameColumnTitle"/></Column><Column id="unitNumberColumn" hAlign="End"><Text text="{i18n>tableUnitNumberColumnTitle}" id="unitNumberColumnTitle"/></Column></columns><items><ColumnListItem\n                            type="Navigation"\n                            press=".onPress"><cells><ObjectIdentifier\n                                    title="{ProductName}"/><ObjectNumber\n                                    number="{\n                                        path: \'UnitPrice\',\n                                        formatter: \'.formatter.numberUnit\'\n                                    }"\n                                    unit="{QuantityPerUnit}"/></cells></ColumnListItem></items></Table></VBox></semantic:content><semantic:sendEmailAction><semantic:SendEmailAction id="shareEmail" press=".onShareEmailPress"/></semantic:sendEmailAction></semantic:SemanticPage></mvc:View>'
}});
