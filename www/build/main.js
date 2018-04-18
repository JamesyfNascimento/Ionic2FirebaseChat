webpackJsonp([0],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


var extractError = function (error) {
    // In a real world app, we might use a remote logging infrastructure
    var errMsg;
    if (error instanceof __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* Response */]) {
        var body = error.json() || '';
        var err = body.error || JSON.stringify(body);
        errMsg = error.status + " - " + (error.statusText || '') + " " + err;
    }
    else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return errMsg;
};
var BaseService = (function () {
    function BaseService() {
    }
    BaseService.prototype.handlePromiseError = function (error) {
        return Promise.reject(extractError(error));
    };
    BaseService.prototype.handleObservableError = function (error) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].throw(extractError(error));
    };
    BaseService.prototype.mapListKeys = function (list) {
        return list
            .snapshotChanges()
            .map(function (actions) { return actions.map(function (action) { return (__assign({ $key: action.key }, action.payload.val())); }); });
    };
    BaseService.prototype.mapObjectKey = function (object) {
        return object
            .snapshotChanges()
            .map(function (action) { return (__assign({ $key: action.key }, action.payload.val())); });
    };
    return BaseService;
}());

//# sourceMappingURL=base-service.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_chat_model__ = __webpack_require__(853);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_chat__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_chat_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signup_signup__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = (function () {
    function HomePage(authService, chatService, menuCtrl, navCtrl, userService) {
        this.authService = authService;
        this.chatService = chatService;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.view = 'chats';
    }
    HomePage.prototype.ionViewCanEnter = function () {
        return this.authService.authenticated;
    };
    HomePage.prototype.ionViewDidLoad = function () {
        this.chats = this.chatService.mapListKeys(this.chatService.chats)
            .map(function (chats) { return chats.reverse(); });
        this.users = this.userService.users;
        this.menuCtrl.enable(true, 'user-menu');
    };
    HomePage.prototype.filterItems = function (event) {
        var searchTerm = event.target.value;
        this.chats = this.chatService.mapListKeys(this.chatService.chats)
            .map(function (chats) { return chats.reverse(); });
        this.users = this.userService.users;
        if (searchTerm) {
            switch (this.view) {
                case 'chats':
                    this.chats = this.chats
                        .map(function (chats) { return chats.filter(function (chat) { return (chat.title && chat.title.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1); }); });
                    break;
                case 'users':
                    this.users = this.users
                        .map(function (users) { return users.filter(function (user) { return (user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1); }); });
                    break;
            }
        }
    };
    HomePage.prototype.onChatCreate = function (recipientUser) {
        var _this = this;
        this.userService
            .mapObjectKey(this.userService.currentUser)
            .first()
            .subscribe(function (currentUser) {
            _this.chatService
                .mapObjectKey(_this.chatService.getDeepChat(currentUser.$key, recipientUser.$key))
                .first()
                .subscribe(function (chat) {
                if (!chat.title) {
                    var timestamp = __WEBPACK_IMPORTED_MODULE_8_firebase_app___default.a.database.ServerValue.TIMESTAMP;
                    var chat1 = new __WEBPACK_IMPORTED_MODULE_3__models_chat_model__["a" /* Chat */]('', timestamp, recipientUser.name, (recipientUser.photo || ''));
                    _this.chatService.create(chat1, currentUser.$key, recipientUser.$key);
                    var chat2 = new __WEBPACK_IMPORTED_MODULE_3__models_chat_model__["a" /* Chat */]('', timestamp, currentUser.name, (currentUser.photo || ''));
                    _this.chatService.create(chat2, recipientUser.$key, currentUser.$key);
                }
            });
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chat_chat__["a" /* ChatPage */], {
            recipientUser: recipientUser
        });
    };
    HomePage.prototype.onChatOpen = function (chat) {
        var _this = this;
        var recipientUserId = chat.$key;
        this.userService.mapObjectKey(this.userService.get(recipientUserId))
            .first()
            .subscribe(function (user) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chat_chat__["a" /* ChatPage */], {
                recipientUser: user
            });
        });
    };
    HomePage.prototype.onSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__signup_signup__["a" /* SignupPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/home/home.html"*/'<ion-header>\n\n  <custom-logged-header [title]="view | capitalize:true"></custom-logged-header>\n\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="view">\n      <ion-segment-button value="chats">\n        Chats\n      </ion-segment-button>\n      <ion-segment-button value="users">\n        Users\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n  <ion-toolbar>\n    <ion-searchbar (ionInput)="filterItems($event)"></ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <div [ngSwitch]="view">\n\n    <ion-list *ngSwitchCase="\'chats\'" no-lines>\n      <button ion-item *ngFor="let chat of chats | async" (click)="onChatOpen(chat)">\n        <ion-avatar item-start>\n          <img [src]="chat.photo || \'assets/images/no-photo.jpg\'">\n        </ion-avatar>\n        <h2>{{ chat.title }}</h2>\n        <p *ngIf="chat.lastMessage; else customMessage">{{ chat.timestamp | date:\'dd/MM/y H:mm\' }} - {{ chat.lastMessage }}</p>\n        <ng-template #customMessage>\n          <p>No messages</p>\n        </ng-template>\n      </button>\n    </ion-list>\n\n    <ion-list *ngSwitchCase="\'users\'" no-lines>\n      <button ion-item *ngFor="let user of users | async" (click)="onChatCreate(user)">\n        <ion-avatar item-start>\n          <img [src]="user.photo || \'assets/images/no-photo.jpg\'">\n        </ion-avatar>\n        {{ user.name }}\n      </button>\n    </ion-list>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_user_service__["a" /* UserService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_service__ = __webpack_require__(112);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChatService = (function (_super) {
    __extends(ChatService, _super);
    function ChatService(afAuth, db, http) {
        var _this = _super.call(this) || this;
        _this.afAuth = afAuth;
        _this.db = db;
        _this.http = http;
        _this.setChats();
        return _this;
    }
    ChatService.prototype.setChats = function () {
        var _this = this;
        this.afAuth.authState
            .subscribe(function (authUser) {
            if (authUser) {
                _this.chats = _this.db.list("/chats/" + authUser.uid, function (ref) { return ref.orderByChild('timestamp'); });
            }
        });
    };
    ChatService.prototype.create = function (chat, userId1, userId2) {
        return this.db.object("/chats/" + userId1 + "/" + userId2)
            .set(chat)
            .catch(this.handlePromiseError);
    };
    ChatService.prototype.getDeepChat = function (userId1, userId2) {
        return this.db.object("/chats/" + userId1 + "/" + userId2);
    };
    ChatService.prototype.updatePhoto = function (chat, chatPhoto, recipientUserPhoto) {
        if (chatPhoto != recipientUserPhoto) {
            return chat.update({
                photo: recipientUserPhoto
            }).then(function () {
                return true;
            }).catch(this.handlePromiseError);
        }
        return Promise.resolve(false);
    };
    ChatService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ChatService);
    return ChatService;
}(__WEBPACK_IMPORTED_MODULE_4__base_service__["a" /* BaseService */]));

//# sourceMappingURL=chat-service.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_first__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_first__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_service__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupPage = (function () {
    function SignupPage(alertCtrl, authService, formBuilder, loadingCtrl, navCtrl, navParams, userService) {
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.signupForm = this.formBuilder.group({
            name: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3)]],
            username: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(3)]],
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(emailRegex)])],
            password: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6)]],
        });
    }
    SignupPage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.showLoading();
        var formUser = this.signupForm.value;
        var username = formUser.username;
        this.userService.userExists(username)
            .first()
            .subscribe(function (userExists) {
            if (!userExists) {
                _this.authService.createAuthUser({
                    email: formUser.email,
                    password: formUser.password
                }).then(function (authUser) {
                    delete formUser.password;
                    var uuid = authUser.uid;
                    _this.userService.create(formUser, uuid)
                        .then(function () {
                        console.log('Usuario cadastrado!');
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                        loading.dismiss();
                    }).catch(function (error) {
                        console.log(error);
                        loading.dismiss();
                        _this.showAlert(error);
                    });
                }).catch(function (error) {
                    console.log(error);
                    loading.dismiss();
                    _this.showAlert(error);
                });
            }
            else {
                _this.showAlert("O username " + username + " j\u00E1 est\u00E1 sendo usado em outra conta!");
                loading.dismiss();
            }
        });
    };
    SignupPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    SignupPage.prototype.showAlert = function (message) {
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/signup/signup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sign Up</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h1 text-center>\n    <ion-icon class="auth-icon" name="person-add" color="primary"></ion-icon>\n  </h1>\n\n  <form [formGroup]="signupForm" (ngSubmit)="onSubmit(); $event.preventDefault()">\n\n    <ion-item>\n      <ion-icon name="person" item-start color="primary"></ion-icon>\n      <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="at" item-start color="primary"></ion-icon>\n      <ion-input type="text" placeholder="Username" formControlName="username"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="mail" item-start color="primary"></ion-icon>\n      <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="lock" item-start color="primary"></ion-icon>\n      <ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n    </ion-item>\n\n    <br>\n    <button ion-button full type="submit" [disabled]="signupForm.invalid">Create Account</button>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/signup/signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user_service__["a" /* UserService */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SigninPage = (function () {
    function SigninPage(alertCtrl, authService, formBuilder, loadingCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.signinForm = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern(emailRegex)])],
            password: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].minLength(6)]],
        });
    }
    SigninPage.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.showLoading();
        this.authService.signinWithEmail(this.signinForm.value)
            .then(function (isLogged) {
            if (isLogged) {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                loading.dismiss();
            }
        }).catch(function (error) {
            console.log(error);
            loading.dismiss();
            _this.showAlert(error);
        });
    };
    SigninPage.prototype.onSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */]);
    };
    SigninPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    SigninPage.prototype.showAlert = function (message) {
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/signin/signin.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Sign In</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <h1 text-center>\n    <ion-icon class="auth-icon" name="chatboxes" color="primary"></ion-icon>\n  </h1>\n\n  <form [formGroup]="signinForm" (ngSubmit)="onSubmit(); $event.preventDefault()">\n\n    <ion-item>\n      <ion-icon name="mail" item-start color="primary"></ion-icon>\n      <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="lock" item-start color="primary"></ion-icon>\n      <ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n    </ion-item>\n\n    <br>\n    <button ion-button full type="submit" [disabled]="signinForm.invalid">Enter</button>\n\n  </form>\n\n  <button ion-button full clear textx-center (click)="onSignup()">Sign Up</button>\n\n</ion-content>'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/signin/signin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(name, username, email, photo) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.photo = photo;
    }
    return User;
}());

//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ 222:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 222;

/***/ }),

/***/ 267:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 267;

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_first__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_first__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_service__ = __webpack_require__(112);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService(afAuth, http) {
        var _this = _super.call(this) || this;
        _this.afAuth = afAuth;
        _this.http = http;
        console.log('Hello Auth Provider');
        return _this;
    }
    AuthService.prototype.createAuthUser = function (user) {
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
            .catch(this.handlePromiseError);
    };
    AuthService.prototype.signinWithEmail = function (user) {
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then(function (authUser) {
            return authUser != null;
        }).catch(this.handlePromiseError);
    };
    AuthService.prototype.logout = function () {
        return this.afAuth.auth.signOut();
    };
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.afAuth
                    .authState
                    .first()
                    .subscribe(function (authUser) {
                    (authUser) ? resolve(true) : reject(false);
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AuthService);
    return AuthService;
}(__WEBPACK_IMPORTED_MODULE_5__base_service__["a" /* BaseService */]));

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_chat_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_message_model__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_message_service__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ChatPage = (function () {
    function ChatPage(authService, chatService, messageService, navCtrl, navParams, userService) {
        this.authService = authService;
        this.chatService = chatService;
        this.messageService = messageService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
    }
    ChatPage.prototype.ionViewCanEnter = function () {
        return this.authService.authenticated;
    };
    ChatPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.recipient = this.navParams.get('recipientUser');
        this.pageTitle = this.recipient.name;
        this.userService
            .mapObjectKey(this.userService.currentUser)
            .first()
            .subscribe(function (currentUser) {
            _this.sender = currentUser;
            _this.chat1 = _this.chatService.getDeepChat(_this.sender.$key, _this.recipient.$key);
            _this.chat2 = _this.chatService.getDeepChat(_this.recipient.$key, _this.sender.$key);
            if (_this.recipient.photo) {
                _this.chatService
                    .mapObjectKey(_this.chat1)
                    .first()
                    .subscribe(function (chat) {
                    _this.chatService.updatePhoto(_this.chat1, chat.photo, _this.recipient.photo);
                });
            }
            var doSubscription = function () {
                _this.viewMessages = _this.messageService.mapListKeys(_this.messages);
                _this.viewMessages
                    .subscribe(function (messages) {
                    _this.scrollToBottom();
                });
            };
            _this.messages = _this.messageService
                .getMessages(_this.sender.$key, _this.recipient.$key);
            _this.messages
                .valueChanges()
                .first()
                .subscribe(function (messages) {
                if (messages.length === 0) {
                    _this.messages = _this.messageService
                        .getMessages(_this.recipient.$key, _this.sender.$key);
                    doSubscription();
                }
                else {
                    doSubscription();
                }
            });
        });
    };
    ChatPage.prototype.sendMessage = function (newMessage) {
        var _this = this;
        if (newMessage) {
            var currentTimestamp_1 = __WEBPACK_IMPORTED_MODULE_7_firebase_app___default.a.database.ServerValue.TIMESTAMP;
            this.messageService.create(new __WEBPACK_IMPORTED_MODULE_4__models_message_model__["a" /* Message */](this.sender.$key, newMessage, currentTimestamp_1), this.messages).then(function () {
                _this.chat1
                    .update({
                    lastMessage: newMessage,
                    timestamp: currentTimestamp_1
                });
                _this.chat2
                    .update({
                    lastMessage: newMessage,
                    timestamp: currentTimestamp_1
                });
            });
        }
    };
    ChatPage.prototype.scrollToBottom = function (duration) {
        var _this = this;
        setTimeout(function () {
            if (_this.content._scroll) {
                _this.content.scrollToBottom(duration || 300);
            }
        }, 50);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/chat/chat.html"*/'<ion-header>\n\n  <custom-logged-header [title]="pageTitle" [user]="recipient"></custom-logged-header>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <message-box *ngFor="let m of viewMessages | async" [message]="m" [isFromSender]="(m.userId === sender.$key)"></message-box>\n\n</ion-content>\n\n<ion-footer>\n\n  <ion-toolbar>\n    <ion-item no-lines>\n      <ion-input type="text" (keyup.enter)="sendMessage(newMessage); newMessage=\'\'" placeholder="Message..." [(ngModel)]="newMessage"></ion-input>\n      <button ion-button item-end (click)="sendMessage(newMessage); newMessage=\'\'">\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_chat_service__["a" /* ChatService */],
            __WEBPACK_IMPORTED_MODULE_5__providers_message_service__["a" /* MessageService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_user_service__["a" /* UserService */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
var Message = (function () {
    function Message(userId, text, timestamp) {
        this.userId = userId;
        this.text = text;
        this.timestamp = timestamp;
    }
    return Message;
}());

//# sourceMappingURL=message.model.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_service__ = __webpack_require__(112);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MessageService = (function (_super) {
    __extends(MessageService, _super);
    function MessageService(db, http) {
        var _this = _super.call(this) || this;
        _this.db = db;
        _this.http = http;
        return _this;
    }
    MessageService.prototype.create = function (message, listMessages) {
        return Promise.resolve(listMessages.push(message));
    };
    MessageService.prototype.getMessages = function (userId1, userId2) {
        console.log(userId1, userId2);
        return this.db.list("/messages/" + userId1 + "-" + userId2, function (ref) { return ref.limitToLast(30).orderByChild('timestamp'); });
    };
    MessageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], MessageService);
    return MessageService;
}(__WEBPACK_IMPORTED_MODULE_4__base_service__["a" /* BaseService */]));

//# sourceMappingURL=message-service.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_signin_signin__ = __webpack_require__(208);

var BaseComponent = (function () {
    function BaseComponent(alertCtrl, authService, app, menuCtrl) {
        this.alertCtrl = alertCtrl;
        this.authService = authService;
        this.app = app;
        this.menuCtrl = menuCtrl;
    }
    BaseComponent.prototype.ngOnInit = function () {
        this.navCtrl = this.app.getActiveNavs()[0];
    };
    BaseComponent.prototype.onLogout = function () {
        var _this = this;
        this.alertCtrl.create({
            message: 'Do you want to quit?',
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        _this.authService.logout()
                            .then(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__pages_signin_signin__["a" /* SigninPage */]);
                            _this.menuCtrl.enable(false, 'user-menu');
                        });
                    }
                },
                {
                    text: 'No'
                }
            ]
        }).present();
    };
    return BaseComponent;
}());

//# sourceMappingURL=base.components.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_service__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserProfilePage = (function () {
    function UserProfilePage(authService, navCtrl, navParams, userService) {
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.canEdit = false;
    }
    UserProfilePage.prototype.ionViewCanEnter = function () {
        return this.authService.authenticated;
    };
    UserProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userService.currentUser
            .valueChanges()
            .subscribe(function (user) {
            _this.currentUser = user;
        });
    };
    UserProfilePage.prototype.onSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.filePhoto) {
            var uploadTask_1 = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);
            uploadTask_1.on('state_changed', function (snapshot) {
                _this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, function (error) {
                // catch error
            });
            uploadTask_1.then(function (UploadTaskSnapshot) {
                _this.editUser(uploadTask_1.snapshot.downloadURL);
            });
        }
        else {
            this.editUser();
        }
    };
    UserProfilePage.prototype.onPhoto = function (event) {
        this.filePhoto = event.target.files[0];
    };
    UserProfilePage.prototype.editUser = function (photoUrl) {
        var _this = this;
        this.userService
            .edit({
            name: this.currentUser.name,
            username: this.currentUser.username,
            photo: photoUrl || this.currentUser.photo || ''
        }).then(function () {
            _this.canEdit = false;
            _this.filePhoto = undefined;
            _this.uploadProgress = 0;
        });
    };
    UserProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-profile',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/user-profile/user-profile.html"*/'<ion-header>\n\n  <custom-logged-header [title]="\'User Profile\'"></custom-logged-header>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <user-info [user]="currentUser"></user-info>\n\n  <button ion-button block (click)="canEdit = !canEdit">Edit</button>\n\n  <form (ngSubmit)="onSubmit($event)" *ngIf="canEdit" #profileForm="ngForm">\n\n    <ion-item>\n      <ion-icon name="person" item-start></ion-icon>\n      <ion-input type="text" placeholder="Name" name="name" [(ngModel)]="currentUser.name" required minlenght="3">\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="at" item-start></ion-icon>\n      <ion-input type="text" placeholder="Username" name="username" [(ngModel)]="currentUser.username" required minlenght="3">\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="image" item-start></ion-icon>\n      <input type="file" accept="image/*" (change)="onPhoto($event)">\n    </ion-item>\n\n    <progress-bar *ngIf="uploadProgress" [progress]="uploadProgress"></progress-bar>\n\n    <br>\n    <button ion-button block type="submit" [disabled]="profileForm.form.invalid">Save</button>\n\n  </form>\n\n</ion-content>'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/pages/user-profile/user-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_service__["a" /* UserService */]])
    ], UserProfilePage);
    return UserProfilePage;
}());

//# sourceMappingURL=user-profile.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(462);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_auth_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pipes_capitalize_pipe__ = __webpack_require__(834);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_chat_chat__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_chat_service__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_message_box_message_box_component__ = __webpack_require__(852);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_message_service__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_home__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_component__ = __webpack_require__(854);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_progress_bar_progress_bar_component__ = __webpack_require__(855);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_signin_signin__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_signup_signup__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_user_info_user_info_component__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_user_menu_user_menu_component__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_user_profile_user_profile__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_user_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_custom_logged_header_custom_logged_header_component__ = __webpack_require__(858);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var firebaseAppConfig = {
    apiKey: "AIzaSyD2lMF5nm3FgAyWqQNp6Q20akiE-T_SU_o",
    authDomain: "ionic-2-firebase-chat-3eaef.firebaseapp.com",
    databaseURL: "https://ionic-2-firebase-chat-3eaef.firebaseio.com",
    projectId: "ionic-2-firebase-chat-3eaef",
    storageBucket: "ionic-2-firebase-chat-3eaef.appspot.com",
    messagingSenderId: "633521561183"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__pipes_capitalize_pipe__["a" /* CapitalizePipe */],
                __WEBPACK_IMPORTED_MODULE_11__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_24__components_custom_logged_header_custom_logged_header_component__["a" /* CustomLoggedHeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_13__components_message_box_message_box_component__["a" /* MessageBoxComponent */],
                __WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_17__components_progress_bar_progress_bar_component__["a" /* ProgressBarComponent */],
                __WEBPACK_IMPORTED_MODULE_18__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_20__components_user_info_user_info_component__["a" /* UserInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_user_menu_user_menu_component__["a" /* UserMenuComponent */],
                __WEBPACK_IMPORTED_MODULE_22__pages_user_profile_user_profile__["a" /* UserProfilePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_6_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseAppConfig),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_user_profile_user_profile__["a" /* UserProfilePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__providers_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_12__providers_chat_service__["a" /* ChatService */],
                __WEBPACK_IMPORTED_MODULE_14__providers_message_service__["a" /* MessageService */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_23__providers_user_service__["a" /* UserService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_storage__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_storage__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService(afAuth, db, firebaseApp, http) {
        var _this = _super.call(this) || this;
        _this.afAuth = afAuth;
        _this.db = db;
        _this.firebaseApp = firebaseApp;
        _this.http = http;
        _this.listenAuthState();
        return _this;
    }
    UserService.prototype.setUsers = function (uidToExclude) {
        this.users = this.mapListKeys(this.db.list("/users", function (ref) { return ref.orderByChild('name'); }))
            .map(function (users) {
            return users.filter(function (user) { return user.$key !== uidToExclude; });
        });
    };
    UserService.prototype.listenAuthState = function () {
        var _this = this;
        this.afAuth
            .authState
            .subscribe(function (authUser) {
            if (authUser) {
                console.log('Auth state alterado!');
                _this.currentUser = _this.db.object("/users/" + authUser.uid);
                _this.setUsers(authUser.uid);
            }
        });
    };
    UserService.prototype.create = function (user, uuid) {
        return this.db.object("/users/" + uuid)
            .set(user)
            .catch(this.handlePromiseError);
    };
    UserService.prototype.edit = function (user) {
        return this.currentUser
            .update(user)
            .catch(this.handlePromiseError);
    };
    UserService.prototype.userExists = function (username) {
        return this.db.list("/users", function (ref) { return ref.orderByChild('name').equalTo(username); })
            .valueChanges()
            .map(function (users) {
            return users.length > 0;
        }).catch(this.handleObservableError);
    };
    UserService.prototype.get = function (userId) {
        return this.db.object("/users/" + userId);
    };
    UserService.prototype.uploadPhoto = function (file, userId) {
        return this.firebaseApp
            .storage()
            .ref()
            .child("/users/" + userId)
            .put(file);
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2__["b" /* FirebaseApp */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], UserService);
    return UserService;
}(__WEBPACK_IMPORTED_MODULE_5__base_service__["a" /* BaseService */]));

//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CapitalizePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CapitalizePipe = (function () {
    function CapitalizePipe() {
    }
    CapitalizePipe.prototype.transform = function (value, onlyFirst) {
        if (onlyFirst)
            return value.charAt(0).toUpperCase() + value.substr(1);
        var words = value.split(' ');
        var output = '';
        words.forEach(function (value, index, words) {
            output += value.charAt(0).toUpperCase() + value.substr(1).toLowerCase() + ' ';
        });
        return output;
    };
    CapitalizePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'capitalize'
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], CapitalizePipe);
    return CapitalizePipe;
}());

//# sourceMappingURL=capitalize.pipe.js.map

/***/ }),

/***/ 852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageBoxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_message_model__ = __webpack_require__(448);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageBoxComponent = (function () {
    function MessageBoxComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_message_model__["a" /* Message */])
    ], MessageBoxComponent.prototype, "message", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], MessageBoxComponent.prototype, "isFromSender", void 0);
    MessageBoxComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'message-box',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/message-box/message-box.component.html"*/'<div class="text" [ngClass]="{\'sender-background\': isFromSender}">\n  <p>{{ message.text }}</p>\n  <p class="timestamp">{{ message.timestamp | date:\'dd/MM/y H:mm\' }}</p>\n</div>'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/message-box/message-box.component.html"*/,
            host: {
                '[style.justify-content]': '((!isFromSender) ? "flex-start" : "flex-end")',
                '[style.text-align]': '((!isFromSender) ? "left" : "right")'
            }
        }),
        __metadata("design:paramtypes", [])
    ], MessageBoxComponent);
    return MessageBoxComponent;
}());

//# sourceMappingURL=message-box.component.js.map

/***/ }),

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
var Chat = (function () {
    function Chat(lastMessage, timestamp, title, photo) {
        this.lastMessage = lastMessage;
        this.timestamp = timestamp;
        this.title = title;
        this.photo = photo;
    }
    return Chat;
}());

//# sourceMappingURL=chat.model.js.map

/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signin_signin__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_service__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(authService, platform, statusBar, splashScreen, userService) {
        var _this = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_signin_signin__["a" /* SigninPage */];
        authService
            .afAuth
            .authState
            .subscribe(function (authUser) {
            if (authUser) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
                userService.currentUser
                    .valueChanges()
                    .subscribe(function (user) {
                    _this.currentUser = user;
                });
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_signin_signin__["a" /* SigninPage */];
            }
        });
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__providers_user_service__["a" /* UserService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], ProgressBarComponent.prototype, "progress", void 0);
    ProgressBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'progress-bar',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/progress-bar/progress-bar.component.html"*/'<div class="progress-outer">\n  <div class="progress-inner" [style.width]="progress + \'%\'">\n    {{ progress }}%\n  </div>\n</div>'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/progress-bar/progress-bar.component.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());

//# sourceMappingURL=progress-bar.component.js.map

/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_user_model__ = __webpack_require__(209);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserInfoComponent = (function () {
    function UserInfoComponent() {
        this.isMenu = false;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models_user_model__["a" /* User */])
    ], UserInfoComponent.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], UserInfoComponent.prototype, "isMenu", void 0);
    UserInfoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'user-info',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/user-info/user-info.component.html"*/'<div *ngIf="user">\n  <ion-avatar [ngClass]="{\'custom-background\': isMenu}">\n    <img class="round" [src]="user.photo || \'assets/images/no-photo.jpg\'">\n  </ion-avatar>\n  <h2 text-center>{{ user.name }}</h2>\n  <p text-center>@{{ user.username }}</p>\n</div>'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/user-info/user-info.component.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], UserInfoComponent);
    return UserInfoComponent;
}());

//# sourceMappingURL=user-info.component.js.map

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_components__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user_model__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_user_profile_user_profile__ = __webpack_require__(456);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserMenuComponent = (function (_super) {
    __extends(UserMenuComponent, _super);
    function UserMenuComponent(alertCtrl, authService, app, menuCtrl) {
        var _this = _super.call(this, alertCtrl, authService, app, menuCtrl) || this;
        _this.alertCtrl = alertCtrl;
        _this.authService = authService;
        _this.app = app;
        _this.menuCtrl = menuCtrl;
        return _this;
    }
    UserMenuComponent.prototype.onProfile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_user_profile_user_profile__["a" /* UserProfilePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('user'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__models_user_model__["a" /* User */])
    ], UserMenuComponent.prototype, "currentUser", void 0);
    UserMenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'user-menu',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/user-menu/user-menu.component.html"*/''/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/user-menu/user-menu.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
    ], UserMenuComponent);
    return UserMenuComponent;
}(__WEBPACK_IMPORTED_MODULE_3__base_components__["a" /* BaseComponent */]));

//# sourceMappingURL=user-menu.component.js.map

/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomLoggedHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_user_model__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__base_components__ = __webpack_require__(455);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CustomLoggedHeaderComponent = (function (_super) {
    __extends(CustomLoggedHeaderComponent, _super);
    function CustomLoggedHeaderComponent(alertCtrl, authService, app, menuCtrl) {
        var _this = _super.call(this, alertCtrl, authService, app, menuCtrl) || this;
        _this.alertCtrl = alertCtrl;
        _this.authService = authService;
        _this.app = app;
        _this.menuCtrl = menuCtrl;
        return _this;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], CustomLoggedHeaderComponent.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__models_user_model__["a" /* User */])
    ], CustomLoggedHeaderComponent.prototype, "user", void 0);
    CustomLoggedHeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'custom-logged-header',template:/*ion-inline-start:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/custom-logged-header/custom-logged-header.component.html"*/'<ion-navbar>\n\n  <button ion-button menuToggle="user-menu">\n    <ion-icon name="menu"></ion-icon>\n  </button>\n\n  <ion-title>\n\n    <ion-item detail-none no-lines color="transparent" *ngIf="user; else titleTemplate">\n      <ion-avatar item-start>\n        <img [src]="user.photo || \'assets/images/no-photo.jpg\'"> \n      </ion-avatar>\n      {{ title }}\n    </ion-item>\n\n    <ng-template #titleTemplate>\n      {{ title }}\n    </ng-template>\n\n  </ion-title>\n\n  <ion-buttons end>\n    <button ion-button icon-only (click)="onLogout()">\n      <ion-icon name="exit"></ion-icon>\n    </button>\n  </ion-buttons>\n\n</ion-navbar>'/*ion-inline-end:"/home/james/Git/Ionic/Ionic2FirebaseChat/src/components/custom-logged-header/custom-logged-header.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
    ], CustomLoggedHeaderComponent);
    return CustomLoggedHeaderComponent;
}(__WEBPACK_IMPORTED_MODULE_4__base_components__["a" /* BaseComponent */]));

//# sourceMappingURL=custom-logged-header.component.js.map

/***/ })

},[457]);
//# sourceMappingURL=main.js.map