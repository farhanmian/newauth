import React from 'react';
import {
  BackHandler,
  TouchableWithoutFeedback,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Modal,
  Animated,
  Switch,
  SafeAreaView,
  PanResponder,
  Platform,
  AppState,
  ProgressBarAndroid,
  ScrollView,
  Dimensions,
  View,
  Text,
  Button,
  PermissionsAndroid,
  TextInput,
  StyleSheet,
  Easing,
  TouchableOpacity,
  Image,
  Alert,
  LogBox,
  ImageBackground,
  Linking,
} from 'react-native';
import Contacts from 'react-native-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Menu, MenuItem} from 'react-native-material-menu';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Loader from 'react-native-three-dots-loader';
import CookieManager from '@react-native-cookies/cookies';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob'; //use rn-fetch-blob
import sjcl, {decrypt, encrypt} from './sjcl';
import SendSMS from 'react-native-sms';
import RNOtpVerify from 'react-native-otp-verify';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AwesomeAlert from 'react-native-awesome-alerts';
import PhoneInput from 'react-native-phone-number-input';
import {
  GiftedChat,
  Actions,
  Bubble,
  Composer,
  InputToolbar,
  Send,
  Time,
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Clipboard from '@react-native-community/clipboard';
import CheckBox from '@react-native-community/checkbox';
import * as Animatable from 'react-native-animatable';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen';
import Video from 'react-native-video';
import FileViewer from 'react-native-file-viewer';
import buffer from 'buffer';
global.Buffer = buffer.Buffer;
import {sha256} from 'react-native-sha256';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import FlashMessages from '../Screens/FlashMessages';
import {RTCPeerConnection, RTCIceCandidate} from 'react-native-webrtc';
import EventSource, {EventSourceListener} from 'react-native-sse';
import StepIndicator from 'react-native-step-indicator';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import ShortcutBadge from 'react-native-app-badge';
import {
  Image as ImageCompress,
  Video as VideoCompress,
} from 'react-native-compressor';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import {URL} from 'react-native-url-polyfill';
import notifee, {AndroidImportance} from '@notifee/react-native';
import BackgroundService from 'react-native-background-actions';
var immg = 'https://newauth.io/image/89852d82-602c-44a3-b319-8754630dc9fb';
var im;
var overlay;
var displayedimgindex = 0;
let BASE_URL = 'https://newauth.io/';
let authenticateduser = {};
let oldtonewflakeconverter = {}; // converts old to new and new to old flake
let newtooldflakeconverter = {}; // converts old to new and new to old flake
let flakesondevice;
let nainitialized = false;
let overlayloaded = false;
let highusagedevice = false;
let configurations = {};
let elements = [];
let hostsite = 'Default';
let STYLESHEET = BASE_URL + 'static/css/app.css';
let CONTENT_URL = BASE_URL + 'vn/init';
let ROOT = 'via-newauth';
const supportedAPI = [
  'init',
  'message',
  'bindhostuserid',
  'getauthenticateduser',
  'successhandler',
  'failurehandler',
  'logout',
]; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)
// var viewDisplay='flex';
// var imgDisplay='none';
var setImgurl = 'https://newauth.io/image/';
var clickedimgid;
var newx = 0,
  newy = 0;
var imagecounter = 0;
var collagex = 0;
var collagey = 0;
var maxzoom = 2;
var currentzoom = 0;
var succgrid;
var impliedx = 0;
var impliedy = 0;
var gridSize = 2; // 2x2 grid
var zoomfurther = true;
var responsedata = [];
var collageimagesloaded;
var originaldata = null;
var parseddata = null;
const {width, height} = Dimensions.get('window');
const screenwidth = parseInt(width);
const screenheight = parseInt(height);
var arr = [];
var tempConnArr = [];
var coonectionArr = [];
var chatConnectionArr = [];
var rndsalt = '';
var rnditer = 0;
var rndseq = 0;
var rndcrdate = '';
var vaultkey;
var checkPosArray = [];
var vaultPosArray = [];
var dotColors = [];
var resArray = [];
var imgsLength = 0;
var resImgArray = [];
var dotColorIndex;
var coloredTograyArray = [];
var pendingmessagesnotificationarray = [];
var mainimageindex = 0;
var flakeTousernameAuthor = '';
var fields = [
  {name: 'siteUrl', description: 'Site URL or name *'},
  {name: 'siteuser', description: 'User name or public key *'},
  {
    name: 'sitepwd',
    description: 'Password or private key *',
    type: 'password',
  },
  {name: 'sitedesc', description: 'Details about this entry (optional)'},
  {name: 'sitename', description: 'Name to use for this entry (optional)'},
];
var connectionIndex;
let CIRCLE_RADIUS = 36;
var userGraph = {
  maparr: [],
  edgearr: [],
};
var confsseeventsource;
var attempt = 0;
var messageCount = 0; // Variable to store the message count
let isConnecting = false;
const maxAttempts = 5;
var subscription;
var confflake;
var confusername = '';
var loggedInuserType = '';
var confpostmsgconnection = null;
const configuration = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
  // iceServers: [{urls: "stun:stun.stunprotocol.org"}]
};
const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  0.5: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 1,
    scale: 1.2,
  },
};
const zoomIn = {
  0: {
    opacity: 1,
    scale: 1.2,
  },
  0.5: {
    opacity: 1,
    scale: 1,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};
var pc = null;
var rc = null;
var dc = null;
var convIndex = null;
var countt = 0;
var conid = '';
var localUser;
var num;
var allConversationArr = [];
var encodedConvid = null;
var isMounted = false;
var multiconvids = null;
var multipleContacts = null;
var encodedContacts = null;
var pendingmsgsarr = [];
var pendingonlinemsgarr = [];
var copyarray = true;
var copymanagearray = true;
var copynotesarray = true;
var loadedFileIndex = -1;
var temp_password = '';
var validating_password = '';
var user_password_input = '';
var islockvalidated = false;
var isTypingPassword = false;
var passwordsettimeoutid = null;
var unlocktimeoutid = null;
var lastCallTime = 0;
var lastGetCallTime = 0;
var lastCallTimeForTyping = 0;
var startImageClickTime = 1234;
var testtimeoutid = null;
var failed_password_tries = 0;
var isApplLocked = false;
var borderindex = 0;
var rgbmap;
var rnd = function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};
var centerdot = 'large'; // 'large' or 'small' , '' for your size
const base64abc = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '/',
];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const labels = [
  {title: 'CONFIGURE', body: 'Setup your lock as a combination of actions.'},
  {
    title: 'TEST',
    body: 'Test the lock by making sure that you can open the lock.',
  },
  {title: 'SET APP LOCK', body: 'Secure newauth app with your lock.'},
];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#4682B4',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#4682B4',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#4682B4',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#4682B4',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#4682B4',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#4682B4',
};
/*
// This constant can also be computed with the following algorithm:
const l = 256, base64codes = new Uint8Array(l);
for (let i = 0; i < l; ++i) {
    base64codes[i] = 255; // invalid character
}
base64abc.forEach((char, index) => {
    base64codes[char.charCodeAt(0)] = index;
});
base64codes["=".charCodeAt(0)] = 0; // ignored anyway, so we just need to prevent an error
*/
const base64codes = [
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255,
  255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255,
  255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32,
  33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
];
const LOAD_EARLIER_ON_SCROLL_HEGHT_OFFSET = 100;
var bufferArray = [];
var base64String = '';
var stringg = '';
var switchingcounter = 0;
var switchcolorcounter = 0;
var contactsToRemove = [];
var contactsToAdd = [];
var dltvals = [];
var NotesAppMappedData = [];
var FoodsAppMappedData = [];
var debugtimer = 0;
var getStatusInterval = null;
import stripe, {
  StripeProvider,
  CardField,
  confirmPayment,
} from '@stripe/stripe-react-native';
import {isNullOrUndefined} from 'util';
import {title} from 'process';
import BackgroundFetch from 'react-native-background-fetch';
// ITEM code - TEN-DOT-SUB
var stripePublishableKey = 'pk_live_ssz30iGOOevjT12DINqVUomB00ydtlmm5q';
var stripeTestKey = 'pk_test_ngbi1o6t13ZaBnCS6JMkgw5l00PvBaGMHm';
const options = {
  taskName: 'Example',
  taskTitle: 'n e w a u t h',
  taskDesc: 'Checking for new messages in the background',
  taskIcon: {
    name: 'flake3',
    type: 'drawable',
  },
  color: '#FFFFFF',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 5000,
  },
};
export default class ZoomOnClick extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appState: 'active',
      preventFurtherClick: false,
      disableIcons: false,
      showReactionsModal: false,
      messageForReactions: null,
      modalPosition: {x: 0, y: 0},
      flashColor: 'green',
      flashMessage: '',
      flashPosition: '50%',
      flashopacity: false,
      textcolor: 'black',
      PaymentDoneStatus: false,
      AmountToBePaid: 1,
      DisableCardButton: true,
      CardInput: {},
      ChooseDotsModal: false,
      PaymentItemDetailsModal: true,
      PaymentItemDetailsObject: {summary: null, desc: null, amount: null},
      displaycardview: 'none',
      paymentnotificationModal: false,
      showgrayblocks: 'flex',
      PaymentScreen: false,
      CanAddContacts: 20,
      AlreadyAddedContacts: 0,
      NewauthMiniApps: [
        {
          name: 'Notes',
          ischecked: false,
          desc: 'Your tasks, reminders, forget-me-nots, anniversaries. Displayed as dots.',
        },
        {
          name: 'Food mood',
          ischecked: false,
          desc: 'Find out which foods work best for you. Beta release',
        },
        {
          name: 'Stack',
          desc: 'Coming soon. All your unread messages from every contact, at your finger tips.',
        },
      ],
      miniAppsModal: false,
      ExpireNotesValue: '7',
      ExpireNotesText: 'a week',
      ExpireNotesModal: false,
      NoteDetailModal: false,
      NoteDetails: '',
      NoteExpiringIn: '',
      NotesAppData: [],
      DisplayAddNoteDialog: 'none',
      NotesAppScreen: false,
      UserNotes: '',
      NoteDotTop: 50,
      NoteDotLeft: 50,
      NotesDotsLocations: [],
      NoteAppCount: 0,
      FoodAppCount: 0,
      FoodDotTop: 50,
      FoodDotLeft: 50,
      FoodsDotsLocations: [],
      FoodDetailModal: false,
      DisplayFeedbackEmojis: 'flex',
      FoodDetails: '',
      FoodDetailsImage: null,
      FoodDetailsAvgScore: 0,
      FoodsAppData: [],
      DisplayAddFoodDialog: 'none',
      FoodsAppScreen: false,
      UserFoods: '',
      UserFoodImage: null,
      AddFeelingIndex: null,
      noteappwidth: new Animated.Value((screenheight * 7) / 100),
      noteappheight: new Animated.Value(55),
      noteapptop: new Animated.Value((screenheight * 67) / 100),
      noteappleft: new Animated.Value((screenwidth * 93) / 100),
      noteapptitle: 'N',
      displaynotesapp: 'none',
      displayfoodapp: 'none',
      foodappwidth: new Animated.Value((screenheight * 7) / 100),
      foodappheight: new Animated.Value(55),
      foodapptop: new Animated.Value((screenheight * 67) / 100 + 60),
      foodappleft: new Animated.Value((screenwidth * 93) / 100),
      foodapptitle: 'F',
      currentPosition: 0,
      enableLockProcessModal: false,
      lockWarningModal: false,
      isAppUnlocked: false,
      lockEnabledState: false,
      addAppsToggleSwitch: false,
      UnlockScreenUI: false,
      LockInstructionsModal: false,
      AppDisabledModal: false,
      LockValidationObject: {
        threeclicks: 0,
        twodots: 0,
        onelongpress: 0,
        show: 'none',
      },
      showcrosscheck: 'none',
      isValidatingLock: false,
      UnlockScreenData: [],
      blw: 'white',
      brw: 'white',
      bbw: 'white',
      btw: 'white',
      isPasswordWrong: false,
      notificationDialogModal: false,
      isFlakeActive: 'none',
      isPending: true,
      loadingsign: false,
      isCameraOpen: false,
      canOfferP2P: true,
      canReceiveP2P: true,
      pendingMsgIndicator: true,
      updateUIState: false,
      inputBoxToggleSwitch: false,
      viewFlakeToggleSwitch: false,
      viewFlakeTextDisplay: 'none',
      viewFlakeTextOpacity: new Animated.Value(0),
      viewFlakeTextValue: 'Display and copy',
      showSettingModal: false,
      checkboxState: false,
      changeSwitchColor: false,
      manageContactsModal1: false,
      addMoreContactsToggleSwitch: true,
      manageContactsModal2: false,
      loadingContactsText: 'flex',
      removingContactsView: 'none',
      dotColorLocation: [],
      onlineOfflineIndicator: [
        true,
        true,
        true,
        false,
        true,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
        true,
        true,
        true,
        true,
        false,
        true,
        false,
        false,
      ],
      incomingMessageIndicator: [
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
      ],
      gotConnection: true,
      showCreateAccountText: 'none',
      invalidKeyText: 'none',
      invalidKeyTextData: 'Invalid Vault key. Please try again',
      sitedialogpos: {width: 50, height: 50, top: 50, left: 50},
      siteUsername: [],
      sitePassword: '',
      siteUrll: '',
      siteDetailsModal: false,
      showpassword: new Animated.Value(0),
      friendsFlake: '',
      disablePhoneButton: true,
      disableAccountButton: false,
      phoneButtonColor: '#D0D0D0',
      accountButtonColor: '#4682B4',
      chatfontcolor: '#444444',
      lockfontcolor: '#444444',
      vaultfontcolor: '#444444',
      chatIconType: require('../Screens/chatcolored.jpg'),
      lockIconType: require('../Screens/lockblack.png'),
      vaultIconType: require('../Screens/vaultnew.png'),
      startChatHeight: 20,
      startChatWidth: 20,
      fullScreenImageUri: null,
      fullscreenimagemodal: false,
      fullScreenVideoUri: null,
      fullscreenvideomodal: false,
      confirmDocSend: false,
      confirmDocSendObject: null,
      sendingConfirmText: '',
      startChatColor: 'violet',
      startChatTop: parseInt(Math.random() * 200),
      startChatLeft: parseInt(Math.random() * 150),
      connectionOnlineFalse: 'flex',
      connectionOnlineTrue: 'none',
      connectionOnlineRings: 0,
      connectionOnlineTop: new Animated.Value(0),
      connectionOnlineLeft: new Animated.Value(0),
      connectionOnlineHeight: new Animated.Value(5),
      connectionOnlineWidth: new Animated.Value(5),
      connectionOnlineOpacity: new Animated.Value(0.6),
      connectionOnlineScale: new Animated.Value(1),
      connectionOnlineColor: 'lightgray',
      chatmessages: [],
      selectedMessages: [],
      pendingMessages: [],
      tempMsgArr: [],
      loadedMsgArr: [],
      sendChannel: null,
      showchatUI: false,
      showView: true,
      displayFlake: false,
      showPic: false,
      chatPhoneNumber: '',
      chatName: 'Chat',
      chatConvId: '',
      chatUserStatus: '',
      isUserTyping: false,
      isSenderTyping: false,
      setReplyEnabled: null,
      // selectedMessages: [],
      chatIndex: null,
      invitePhoneNumber: '',
      inviteName: '',
      inviteRelationId: '',
      showCnctn: [],
      showChatDots: [],
      acptDenyAlrt: false,
      startChatAlert: false,
      userChatConnectionData: [],
      userConnectionData: [],
      quad: [],
      vaultquad: [],
      dataDrag: [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      showDelete: 'none',
      showDraggable: [], //Step 10
      dropZoneValues: null,
      dataDragNote: [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      showDeleteNote: 'none',
      showDraggableNote: [], //Step 10
      dropZoneValuesNote: null,
      verificationProcessText: 'Automatic phone verification in progress...',
      otpVerificationCounter: 10,
      displayResend: 'none',
      displayOtpCounter: 'none',
      showProgressBar: 'none',
      showOtpInput: 'none',
      welcomescreenModal: false,
      inviteInternalUserModal: false,
      createAccountModal: false,
      dotContactColor: [
        'gray',
        'gray',
        'gray',
        'gray',
        'gray',
        'gray',
        'gray',
        'gray',
        'gray',
        'gray',
      ],
      senderPhone: '',
      showInvitePopup: false,
      contactToInvite: {name: '', phoneNumber: ''},
      alreadyInvited: false,
      systemInviteMessage1: 'Click this button to invite your friend.',
      systemInviteMessage2: 'Invite',
      randomFlakeOnDevice: '',
      addSiteFields: Array(5).fill({name: '', value: ''}),
      displayUserBox: 'flex',
      search: '',
      searchcontact: '',
      searchmanagecontact: '',
      searchnotes: '',
      filteredData: '',
      filteredContactData: [],
      showSearchBar: 'none',
      vaultSearchBar: 'none',
      showSearchNotesBar: 'flex',
      usrSrch: require('./user.png'),
      picDimensions: [],
      contactsPosition: [],
      dFViewPosition: [],
      allRecentContactsArray: [],
      allAndroidContactsArray: [],
      contactsArray: [],
      cntctlft: [],
      cntcttop: [],
      gapArray: [],
      usersitedata: [],
      usercontactdata: [],
      usermanagecontactdata: [],
      usernotesdata: [],
      showicons: false,
      vaultvalue: null,
      verifyNumber: null,
      // verifyCode: null,
      verifyKeyCode: '',
      verifyKeyInput: '',
      verifiedNum: null,
      countCalling: 1,
      addCredsModal: false,
      isModalVisible: false,
      isPhoneModalVisible: false,
      modalMsg: 'phone number',
      vaulticon: 'none',
      vaultcenter: 'flex',
      userLoggedin: 'none',
      vaultModal: false,
      vaultkey: '',
      flakepageheader: '',
      flkdata: 'flex',
      flkimg: './flakeimg.png',
      dottop: [],
      dotleft: [],
      dotwidth: [],
      dotheight: [],
      flakedottop: [],
      flakedotleft: [],
      flakedotwidth: [],
      flakedotheight: [],
      siteIconUrl: 'xyz',
      siteIconUrll: 'xyz',
      imgleft: 0,
      imgtop: 0,
      newImg:
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
      resourcePath: {uri: 'https://newauth.io/static/icons/dandelion.jpg'},
      unameBrdrClr: 'orange',
      TextValue: '',
      imgWidth: 0,
      imgHeight: 0,
      deviceflake: '',
      username: '',
      img: '',
      imgDisplayWidth: new Animated.Value(300),
      imgDisplayHeight: new Animated.Value(300),
      imgDisplayTop: new Animated.Value((screenheight - 300) / 2),
      imgDisplayLeft: new Animated.Value(0),
      imgDisplayScale: new Animated.Value(1),
      originalimagetop: new Animated.Value(0),
      originalimageleft: new Animated.Value(0),
      originalimagewidth: new Animated.Value(300),
      originalimageheight: new Animated.Value(300),
      displayLines: 'none',
      showLoader: 'none',
      Xlocation: '',
      visibleSCreen: 'none',
      visibleModal: 'none',
      alertMsg: 'none',
      imgLogo: 'https://newauth.io/static/icons/collage-5.png',
      displayIcons: 'flex',
      authScreen: 'none',
      homepage: 'flex',
      modalvisible: true,
      viewcan: 'flex',
      imagecan: 'none',
      imageUri: 'https://newauth.io/image/da75a774-4a9b-464a-a225-bbec2ecac4fc',
      croppedImageUri: null,
      showTimeoutModal: false,
      modalvisible: false,
      showProfileScreen: false,
      visibleMenu: false,
      userGiveOut: 'User name',
      userFlake: 'xyz',
      userCrtime: 'abc',
      displayImgIndex: 0,
      zoomCount: 0,
      authImages: [],
      sendData: [],
      postVisible: 'none',
      imgVisible: 'flex',
      postingText: 'heyy',
      imgSize: [],
      source: [],
      count: 1,
      initialX: 0,
      initialY: 0,
      fadeCircle: new Animated.Value(50),
      fadeOpacity: new Animated.Value(1),
      fadeInOpacity: new Animated.Value(0),
      fadeInUsernameBox: new Animated.Value(0),
    };
    //this.animatedValue = new Animated.Value(0)
    this.backCount = 0;
    this.backTimer = 0;
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.mindthegaps = this.mindthegaps.bind(this);
    this.pan = this.state.dataDrag.map(() => new Animated.ValueXY()); //step 1
    this.pannote = this.state.dataDragNote.map(() => new Animated.ValueXY()); //step 1 note
  }
  // ****** CONVERT BASE64 TO CHUNKS ******* // use this to create byte array
  async imageToChunks(baseStringSample, msgSample, msgid) {
    // let buffer = await file.arrayBuffer();
    // const chunkSize = 16 * 1024;
    // while (buffer.byteLength) {
    // const chunk = buffer.slice(0, chunkSize);
    // buffer = buffer.slice(chunkSize, buffer.byteLength);
    // Off goes the chunk!
    // peer.send(chunk);
    console.log('inside imgtochnks:', baseStringSample.length);
    let buffer = await global.Buffer(baseStringSample);
    console.log('bufferlength:', buffer.byteLength);
    const chunkSize = 16 * 1024;
    var i = 0;
    var bufferArr = [];
    while (buffer.byteLength) {
      const chunk = buffer.slice(0, chunkSize);
      let sendmsg = [
        {
          _id: Math.random(1000).toString(),
          image: chunk,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Test User',
            messageType: 'online',
            chatType: 'image',
            isReplyEnabled: false,
            deletemessage: false,
          },
        },
      ];
      if (msgSample[0].user.chatType === 'image') {
        msgSample[0]._id = Math.random(1000).toString();
        msgSample[0].image = chunk;
        console.log(msgSample);
        allConversationArr[convIndex].sendChannel.send(
          JSON.stringify(msgSample),
        );
      } else if (msgSample[0].user.chatType === 'video') {
        msgSample[0]._id = Math.random(1000).toString();
        msgSample[0].video = chunk;
        console.log(msgSample);
        allConversationArr[convIndex].sendChannel.send(
          JSON.stringify(msgSample),
        );
      } else if (msgSample[0].user.chatType === 'document') {
        msgSample[0]._id = Math.random(1000).toString();
        msgSample[0].text = chunk;
        console.log(msgSample);
        allConversationArr[convIndex].sendChannel.send(
          JSON.stringify(msgSample),
        );
      }
      // console.log(sendmsg)
      // console.log(allConversationArr[convIndex])
      i++;
      // console.log("chunk:",chunk.byteLength,i);
      // console.log("chunk:",chunk);
      buffer = buffer.slice(chunkSize, buffer.byteLength, i);
      bufferArr.push(chunk);
      //   console.log("bfr arlen:",bufferArray.length)
      // console.log("chunk:",chunk);
      // console.log("buffer:",buffer)
    }
    console.log('buffer:', buffer.byteLength);
    if (buffer.byteLength == 0) {
      console.log(bufferArr.length);
      // this.bytesToBase64(bufferArray);
      let sendmsg = [
        {
          _id: Math.random(1000).toString(),
          image: 'EOF',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Test User',
            messageType: 'online',
            chatType: 'image',
            isReplyEnabled: false,
            deletemessage: false,
          },
        },
      ];
      if (msgSample[0].user.chatType === 'image') {
        this.setState({isPending: false});
        msgSample[0]._id = Math.random(1000).toString();
        msgSample[0].image = 'EOF';
        console.log(msgSample);
        allConversationArr[convIndex].sendChannel.send(
          JSON.stringify(msgSample),
        );
        bufferArr = [];
        this.handlePendingMessages(msgid);
      } else if (msgSample[0].user.chatType === 'video') {
        this.setState({isPending: false});
        msgSample[0]._id = Math.random(1000).toString();
        msgSample[0].video = 'EOF';
        console.log(msgSample);
        allConversationArr[convIndex].sendChannel.send(
          JSON.stringify(msgSample),
        );
        bufferArr = [];
        this.handlePendingMessages(msgid);
      } else if (msgSample[0].user.chatType === 'document') {
        this.setState({isPending: false});
        msgSample[0]._id = Math.random(1000).toString();
        msgSample[0].text = 'EOF';
        console.log(msgSample);
        allConversationArr[convIndex].sendChannel.send(
          JSON.stringify(msgSample),
        );
        bufferArr = [];
      }
      //  allConversationArr[convIndex].sendChannel.send(JSON.stringify(sendmsg));
      console.log(sendmsg);
      let len = this.state.chatmessages.length - 1;
      if (
        this.state.chatmessages[len].user.chatType === 'image' ||
        this.state.chatmessages[len].user.chatType === 'video' ||
        this.state.chatmessages[len].user.chatType === 'document'
      ) {
        this.state.chatmessages[len].pending = false;
        // this.handlePendingMessages(msgid);
      }
    }
  }
  // ****** CONVERT CHUNKS TO BASE64******* // use this to create base64
  async bytesToBase64(bytes) {
    console.log('inside btob:', bytes.length);
    for (let z = 0; z < bytes.length; z++) {
      let result = '',
        i,
        l = bytes.length;
      for (i = 2; i < l; i += 3) {
        result += base64abc[bytes[i - 2] >> 2];
        result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
        result += base64abc[((bytes[i - 1] & 0x0f) << 2) | (bytes[i] >> 6)];
        result += base64abc[bytes[i] & 0x3f];
      }
      if (i === l + 1) {
        // 1 octet yet to write
        result += base64abc[bytes[i - 2] >> 2];
        result += base64abc[(bytes[i - 2] & 0x03) << 4];
        result += '==';
      }
      if (i === l) {
        // 2 octets yet to write
        result += base64abc[bytes[i - 2] >> 2];
        result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
        result += base64abc[(bytes[i - 1] & 0x0f) << 2];
        result += '=';
      }
      base64String += result;
    }
    await console.log('base64:', base64String.length);
    return base64String;
  }
  // ****** CONVERT CHUNKS TO STRING******* // use this to create base64
  bytesArrayToString = async byteArr => {
    console.log('xy:', byteArr.length);
    console.log('xy:', byteArr[0].length);
    for (let i = 0; i < byteArr.length; i++) {
      stringg += String.fromCharCode(...byteArr[i].data);
      console.log(stringg.length);
    }
    console.log('ab:', stringg.length);
    return stringg;
  };
  launchDeviceCamera = async convid => {
    try {
      var ispermission = false;
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          ispermission = true;
        } else {
          console.log('Camera permission denied');
          showMessage({
            message: 'Please go to settings and allow camera permission.',
            description: '',
            type: 'info',
            duration: 3000,
            style: {
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'lightgray',
              opacity: 0.8,
            },
            color: 'black',
            animated: true,
            animationDuration: 300,
          });
          // showMessage({
          //     style: ,
          //     message: ,
          //     // description:"could not authenticate. Please try again",
          //     color: 'black',
          //     type: "info",
          //     animated: true,
          //     animationDuration: 300,
          //     duration: 3000
          // });
        }
      } else if (Platform.OS === 'ios') {
        const granted = await request(PERMISSIONS.IOS.CAMERA).then(result => {
          console.log('result:', result);
          return result;
        });
        console.log('res:', granted, typeof granted);
        if (granted === 'granted') {
          ispermission = true;
        } else {
          this.setState({isCameraOpen: false});
          showMessage({
            message: 'Please go to settings and allow camera permission.',
            description: '',
            type: 'info',
            duration: 3000,
            style: {
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'lightgray',
              opacity: 0.8,
            },
            color: 'black',
            animated: true,
            animationDuration: 300,
          });
          // showMessage({
          //     style: ,
          //     message:
          //     // description:"could not authenticate. Please try again",
          //     type: "info",
          //     color: 'black',
          //     animated: true,
          //     animationDuration: 300,
          //     duration: 3000
          // });
        }
      }
      if (ispermission === true) {
        this.setState({isCameraOpen: true});
        let options = {
          title: 'Video Picker',
          mediaType: 'photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchCamera(options, async response => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = {uri: response.uri};
            console.log('response', JSON.stringify(response));
            try {
              var base64Img = response.assets[0].uri;
              // var b64 = await RNFS.readFile(Platform.OS === 'android' ? base64Img : base64Img, 'base64').then(res => { return res })
              // console.log("b64:",b64.substring(0, 7), convid)
              let newuri = await this.resizeImage(
                response.assets[0].uri,
                1920,
                1080,
              );
              console.log('newuri:', newuri);
              var base64Imgg = newuri;
              var b644 = await RNFS.readFile(
                Platform.OS === 'android' ? base64Imgg : base64Imgg,
                'base64',
              ).then(res => {
                return res;
              });
              console.log('b644:', b644.substring(0, 7), convid);
              this.sendImageFile(
                response.assets[0].fileName,
                newuri,
                response.assets[0].type,
                b644,
                convid.substring(0, 8),
                response.assets[0].fileSize,
                'clicked',
              );
              // this.sendImageFile(response.assets[0].fileName, response.assets[0].uri, response.assets[0].type, b64, convid.substring(0, 8), response.assets[0].fileSize, "clicked")
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  launchDeviceImageLibrary = async convid => {
    let options = {
      title: 'Video Picker',
      mediaType: 'video',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'video',
      },
    };
    launchImageLibrary(options, async response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        var videopath = await RNFetchBlob.fs
          .stat(response.assets[0].uri)
          .then(res => {
            console.log('orignal path:', res.path);
            return res.path;
            //"res.path" will give me original path of video.
          });
        console.log(response.assets[0].type, videopath);
        try {
          var base64Img = videopath;
          var b64 = await RNFS.readFile(base64Img, 'base64')
            .then(res => {
              console.log(res.length);
              return res;
            })
            .catch(err => {
              console.log(err.message, err.code);
            });
          if (
            response.assets[0].type == 'image/jpeg' ||
            response.assets[0].type == 'image/png' ||
            response.assets[0].type == 'image/jpg'
          ) {
            this.sendImageFile(b64, convid.substring(0, 8));
          } else if (response.assets[0].type == 'video/mp4') {
            this.sendVideoFile(
              b64,
              convid.substring(0, 8),
              response.assets[0].fileSize,
            );
          }
        } catch (e) {
          console.log(e);
        }
        let x = [];
      }
    });
  };
  docPicker = async convid => {
    this.setState({confirmDocSendObject: null});
    this.setState({isCameraOpen: true});
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('docpicker response:', res);
      console.log(res[0].uri);
      var size = await this.formatBytes(res[0].size);
      console.log('size:', size);
      try {
        var base64Img = res[0].uri;
        var b64 = await RNFS.readFile(base64Img, 'base64')
          .then(res => {
            return res;
          })
          .catch(err => {
            console.log(err.message, err.code);
          });
        if (
          res[0].type == 'image/jpeg' ||
          res[0].type == 'image/png' ||
          res[0].type == 'image/jpg'
        ) {
          let newuri = await this.resizeImage(res[0].uri, 1920, 1080);
          console.log('newuri:', newuri);
          var base64Imgg = newuri;
          var b644 = await RNFS.readFile(
            Platform.OS === 'android' ? base64Imgg : base64Imgg,
            'base64',
          ).then(res => {
            return res;
          });
          console.log('b644:', b644.substring(0, 7), convid);
          this.setState({
            confirmDocSend: true,
            confirmDocSendObject: {
              name: res[0].name,
              uri: newuri,
              type: res[0].type,
              b64: b644,
              convid: convid.substring(0, 8),
              size: res[0].size,
              objtype: 'image',
              selected: 'selected',
            },
          });
          this.setState({isCameraOpen: false});
          // this.sendImageFile(res[0].name, res[0].uri, res[0].type, b64, convid.substring(0, 8), res[0].size, "selected")
        } else if (res[0].type == 'video/mp4') {
          // let newuri = await this.resizeVideo(res[0].uri,1920,1080)
          // console.log("newuri:",newuri)
          // var base64Imgg = newuri
          var b644 = await RNFS.readFile(
            Platform.OS === 'android' ? base64Imgg : base64Imgg,
            'base64',
          ).then(res => {
            return res;
          });
          console.log('b644:', b644.substring(0, 7), convid);
          this.setState({
            confirmDocSend: true,
            confirmDocSendObject: {
              name: res[0].name,
              uri: res[0].uri,
              type: res[0].type,
              b64: b64,
              convid: convid.substring(0, 8),
              size: res[0].size,
              objtype: 'video',
            },
          });
          this.setState({isCameraOpen: false});
          // this.sendVideoFile(res[0].name, res[0].uri, res[0].type, b64, convid.substring(0, 8), res[0].size)
        } else {
          this.setState({
            confirmDocSend: true,
            confirmDocSendObject: {
              name: res[0].name,
              uri: res[0].uri,
              type: res[0].type,
              b64: b64,
              convid: convid.substring(0, 8),
              size: res[0].size,
              objtype: 'document',
            },
          });
          this.setState({isCameraOpen: false});
          // this.sendDocFile(res[0].name, res[0].uri, res[0].type, b64, convid.substring(0, 8), size)
        }
        console.log(b64.substring(0, 7));
      } catch (e) {
        console.log('docpicker error:', e);
      }
      // feel free to change main path according to your requirements
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('error -----', err);
      } else {
        throw err;
      }
    }
  };
  resizeImage = async (uri, maxWidth, maxHeight, quality = 100) => {
    try {
      // let b64 = await RNFS.readFile(uri,'base64');
      const resizedImageUri = await ImageCompress.compress(uri, {
        compressionMethod: 'manual',
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        // 'JPEG', // Image format
        quality: 0.8, // Image quality
        // 0, // rotation (optional)
        // undefined, // Output file path (optional)
        // undefined, // Do not scale down if image is smaller than dimensions (optional)
        // { mode: 'contain' } // Resize mode (optional)
      });
      console.log('resized img:', resizedImageUri);
      return resizedImageUri;
    } catch (error) {
      console.error('Error resizing image:', error);
      return uri; // Return original URI in case of error
    }
  };
  resizeVideo = async (uri, maxWidth, maxHeight, quality = 100) => {
    try {
      // let b64 = await RNFS.readFile(uri,'base64');
      const resizedImageUri = await VideoCompress.compress(uri, {
        compressionMethod: 'manual',
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        // 'JPEG', // Image format
        quality: 0.8, // Image quality
        // 0, // rotation (optional)
        // undefined, // Output file path (optional)
        // undefined, // Do not scale down if image is smaller than dimensions (optional)
        // { mode: 'contain' } // Resize mode (optional)
      });
      console.log('resized video:', resizedImageUri);
      return resizedImageUri;
    } catch (error) {
      console.error('Error resizing video:', error);
      return uri; // Return original URI in case of error
    }
  };
  confirmSendDocument = async data => {
    try {
      if (data != null) {
        if (data.objtype == 'image') {
          this.setState({confirmDocSend: false});
          this.sendImageFile(
            data.name,
            data.uri,
            data.type,
            data.b64,
            data.convid,
            data.size,
            data.selected,
          );
        } else if (data.objtype == 'video') {
          this.setState({confirmDocSend: false});
          this.sendVideoFile(
            data.name,
            data.uri,
            data.type,
            data.b64,
            data.convid,
            data.size,
          );
        } else if (data.objtype == 'document') {
          this.setState({confirmDocSend: false});
          this.sendDocFile(
            data.name,
            data.uri,
            data.type,
            data.b64,
            data.convid,
            data.size,
          );
        } else if (data.objtype == 'text') {
          this.setState({confirmDocSend: false});
          this.sendText([this.state.confirmDocSendObject]);
        } else {
          showMessage({
            message: 'some error occured.',
            type: 'danger',
            position: 'top',
          });
        }
      }
    } catch (e) {
      console.log('error sending media:', e);
    }
  };
  editSendDocument = text => {
    this.state.confirmDocSendObject.text = text;
    this.setState({sendingConfirmText: text});
  };
  handleSharedData = async () => {
    try {
      // const action = await ShareExtension.data();
      ReceiveSharingIntent.getReceivedFiles(
        async files => {
          // Handle the received data
          console.log('Received data:', files);
          if (files.length > 0) {
            // Handle the shared action
            console.log('action:', files);
            //   this.handleSharedDataOfType(action.type,action.value)
            //   Linking.openURL(action.value)
            // var size = await this.formatBytes(res[0].size)
            // console.log("size:", size)
            try {
              if (files[0].filePath != null) {
                if (Platform.OS == 'ios') {
                  var base64Img = files[0].filePath;
                } else {
                  var base64Img = 'file://' + files[0].filePath;
                }
                var b64 = await RNFS.readFile(base64Img, 'base64')
                  .then(res => {
                    console.log('res len:', res.length);
                    return res;
                  })
                  .catch(err => {
                    alert('Unable to read file.');
                    console.log(err.message, err.code);
                  });
                if (Platform.OS == 'ios') {
                  var b64size = await RNFS.stat(files[0].filePath);
                } else {
                  var b64size = await RNFS.stat('file://' + files[0].filePath);
                }
                console.log(b64size);
                var filesize = await this.formatBytes(b64size.size);
                //   let fileName = action.value.split('/');
                if (
                  files[0].mimeType == 'image/jpeg' ||
                  files[0].mimeType == 'image/png' ||
                  files[0].mimeType == '.png' ||
                  files[0].mimeType == '.jpg' ||
                  files[0].mimeType == '.jpeg' ||
                  files[0].mimeType == 'image/jpg' ||
                  files[0].mimeType == 'image/*'
                ) {
                  this.setState({
                    confirmDocSend: true,
                    confirmDocSendObject: {
                      name: files[0].fileName,
                      uri: 'file://' + files[0].filePath,
                      text: null,
                      type: files[0].mimeType,
                      b64: b64,
                      convid: this.state.chatConvId.substring(0, 8),
                      size: filesize,
                      objtype: 'image',
                      selected: 'selected',
                    },
                  });
                  // this.sendImageFile(res[0].name, res[0].uri, res[0].type, b64, convid.substring(0, 8), res[0].size, "selected")
                } else if (
                  files[0].mimeType == 'video/mp4' ||
                  files[0].mimeType == 'video/*' ||
                  files[0].mimeType == '.mp4'
                ) {
                  this.setState({
                    flashopacity: true,
                    flashMessage:
                      'Videos can only be sent during direct chats.',
                    flashColor: 'lightgray',
                    flashPosition: '50%',
                    textcolor: 'black',
                  });
                  setTimeout(() => {
                    this.setState({flashopacity: false});
                  }, 3500);
                } else if (
                  files[0].mimeType == 'application/pdf' ||
                  files[0].mimeType == '.pdf' ||
                  files[0].mimeType == 'text/plain' ||
                  files[0].mimeType == '.txt' ||
                  files[0].mimeType == 'application/msword' ||
                  files[0].mimeType == '.msword'
                ) {
                  this.setState({
                    confirmDocSend: true,
                    confirmDocSendObject: {
                      name: files[0].fileName,
                      uri: 'file://' + files[0].filePath,
                      text: null,
                      type: files[0].mimeType,
                      b64: b64,
                      convid: this.state.chatConvId.substring(0, 8),
                      size: filesize,
                      objtype: 'document',
                    },
                  });
                  //   this.sendDocFile(files[0].fileName, files[0].filePath, files[0].mimeType, b64, convid.substring(0, 8), size)
                } else {
                  if (
                    files[0].filePath == null &&
                    files[0].text.length != null
                  ) {
                    this.setState({
                      sendingConfirmText: files[0].text,
                      confirmDocSend: true,
                      confirmDocSendObject: {
                        name: files[0].text,
                        uri: null,
                        text: files[0].text,
                        type: null,
                        b64: null,
                        convid: this.state.chatConvId.substring(0, 8),
                        size: '',
                        objtype: 'text',
                      },
                    });
                    // this.sendText(files);
                  } else {
                    this.setState({
                      flashopacity: true,
                      flashMessage: 'Problem loading the file.',
                      flashColor: 'lightgray',
                      flashPosition: '50%',
                      textcolor: 'black',
                    });
                    setTimeout(() => {
                      this.setState({flashopacity: false});
                    }, 4500);
                  }
                }
                console.log(b64.substring(0, 7));
              } else {
                if (files[0].text.length != null) {
                  this.setState({
                    sendingConfirmText: files[0].text,
                    confirmDocSend: true,
                    confirmDocSendObject: {
                      name: files[0].text,
                      uri: null,
                      text: files[0].text,
                      type: null,
                      b64: null,
                      convid: this.state.chatConvId.substring(0, 8),
                      size: '',
                      objtype: 'text',
                    },
                  });
                  // this.sendText(files);
                } else {
                  this.setState({
                    flashopacity: true,
                    flashMessage: 'Problem loading the file.',
                    flashColor: 'lightgray',
                    flashPosition: '50%',
                    textcolor: 'black',
                  });
                  setTimeout(() => {
                    this.setState({flashopacity: false});
                  }, 4500);
                }
              }
            } catch (e) {
              console.log('docpicker error:', e);
            }
            // feel free to change main path according to your requirements
          }
          ReceiveSharingIntent.clearReceivedFiles();
        },
        error => {
          //   console.log('Error receiving data:', error);
        },
        'NewauthShareMedia',
      );
    } catch (error) {
      console.error('Error fetching shared action:', error);
    }
  };
  async formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = await Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  calculateBigCircleSize = async (wd, ht, lft, tp) => {
    console.log('big circle:', wd, ht, lft, tp);
    // let x = lft + (wd / 2);
    // let y = tp + (wd / 2);
    // let size = Number.parseInt(2 * Math.max(parseInt(x), parseInt(screenwidth - x))) //pass int value to max function
    // console.log("x,size,y:", x, size, y)
    // // let newleft = Number.parseInt(parseInt(x) - (Math.max(parseInt(screenwidth), parseInt(x))));
    // let newleft = Number.parseInt(size - screenwidth);
    // let newtop = Number.parseInt(parseInt(y) - (Math.max(parseInt(screenwidth), parseInt(y))));
    // if (newleft > 0) {
    //     newleft = 0;
    // }
    // if (newtop > 0) {
    //     newtop = 0;
    // }
    // console.log(typeof (size), typeof (newleft), typeof (newtop))
    // return { width: parseInt(size), left: new Animated.Value(parseInt(newleft)), top: new Animated.Value(parseInt(newtop)) }
    let centerX = lft + wd / 2;
    let centerY = tp + wd / 2;
    let size = Number.parseInt(
      2 * Math.max(parseInt(centerX), parseInt(screenwidth - centerX)),
    ); //pass int value to max function
    console.log('x,size,y:', size, centerX, centerY, screenwidth, screenheight);
    console.log(typeof screenwidth, typeof newleft, typeof newtop);
    return {
      width: parseInt(size),
      left: new Animated.Value(parseInt(-size / 2 + centerX)),
      top: new Animated.Value(parseInt(-size / 2 + centerY)),
    };
  };
  // renderActions(props) {
  //     // console.log(props.currentMessage)
  //     return (
  //         <Actions
  //             {...props}
  //             options={{
  //                 ['Browse Image']: async (props) => {
  //                     try {
  //                         this.launchDeviceImageLibrary()
  //                     }
  //                     catch (e) {
  //                         console.log('canceled')
  //                     }
  //                 },
  //                 ['Click Image']: async (props) => {
  //                     try {
  //                         this.launchDeviceCamera()
  //                     }
  //                     catch (e) {
  //                         console.log('canceled')
  //                     }
  //                 },
  //                 Cancel: (props) => { console.log("Cancel") }
  //             }}
  //         // icon={() => (
  //         //   <Icon name={'attachment'} size={28} color={AppTheme.colors.primary} />
  //         // )}
  //         // onSend={image => this.sendImage(image)}
  //         />
  //     )
  // }
  renderDisabledActions(props) {
    return (
      <View
        style={{
          width: '15%',
          alignSelf: 'center',
          height: 40,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Actions
          {...props}
          icon={() => (
            <Icon
              name={'camera'}
              size={20}
              color={'gray'}
              style={{marginLeft: 0, justifyContent: 'center'}}
            />
          )}
        />
        <Actions
          {...props}
          icon={() => (
            <Icon
              name={'paperclip'}
              size={20}
              color={'gray'}
              style={{marginLeft: 0}}
            />
          )}
        />
      </View>
    );
  }
  renderActions(props) {
    return (
      <View
        style={{
          width: '15%',
          alignSelf: 'center',
          height: 40,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Actions
          {...props}
          icon={() => (
            <Icon
              name={'camera'}
              size={20}
              color={'gray'}
              style={{marginLeft: 0, justifyContent: 'center'}}
            />
          )}
          onPressActionButton={() =>
            this.launchDeviceCamera(this.state.chatConvId)
          }
        />
        <Actions
          {...props}
          icon={() => (
            <Icon
              name={'paperclip'}
              size={20}
              color={'gray'}
              style={{marginLeft: 0}}
            />
          )}
          onPressActionButton={() => this.docPicker(this.state.chatConvId)}
        />
        {/* <Actions {...props} 
              icon={() => (<Icon name={'camera-outline'} size={24} color={'pink'} />)}  /> */}
      </View>
    );
  }
  renderVideo = props => {
    // console.log('video props:', props.currentMessage)
    // console.log(props)
    // const {currentMessage} = props
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.openFullScreenVideo(props.currentMessage.video)}
        style={{
          width: screenwidth / 2,
          height: screenwidth / 2,
          ...(props.currentMessage.user._id == 2
            ? props.currentMessage.user.messageType == 'offline'
              ? {borderColor: '#Ff9800'}
              : {borderColor: '#636363'}
            : props.currentMessage.user.messageType == 'offline'
            ? {borderColor: '#4caf50'}
            : {borderColor: '#8bc8db'}),
        }}>
        <Video
          controls={true}
          paused={true}
          //  muted={true}
          //  fullscreen={false}
          //  fullscreenOrientation={"all"}
          //  fullscreenAutorotate={true}
          focusable={true}
          source={{uri: props.currentMessage.video}}
          videoWidth={screenwidth / 2}
          videoHeight={screenwidth / 2}
          //    thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
          resizeMode="stretch"
          shouldPlay={true}
          //    useNativeControls
          // ref={(ref) => {                       //ref causing attempt to assign readonly prop error
          //   this.player = ref
          // }}                                      // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onEnd={this.onEnd} // Callback when playback finishes
          onError={this.videoError} // Callback when video cannot be loaded
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            width: '100%',
            height: '100%',
            borderRadius: 5,
            zIndex: 5,
          }}
        />
        {props.currentMessage.pending && (
          <ActivityIndicator
            size="large"
            color="green"
            style={{position: 'absolute', left: '40%', top: '40%'}}
          />
        )}
      </TouchableOpacity>
    );
  };
  renderImage = props => {
    // console.log(props.currentMessage)
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.openFullScreenImage(props.currentMessage.image)}
        style={{
          width: 150,
          maxHeight: 150,
          borderWidth: 1,
          ...(props.currentMessage.user._id == 2
            ? props.currentMessage.user.messageType == 'offline'
              ? {borderColor: '#Ff9800'}
              : {borderColor: '#636363'}
            : props.currentMessage.user.messageType == 'offline'
            ? {borderColor: '#4caf50'}
            : {borderColor: '#8bc8db'}),
          borderRadius: 5,
        }}>
        <Image
          source={{uri: `file:///${props.currentMessage.image}`}}
          resizeMode="cover"
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            width: '100%',
            height: '100%',
            borderRadius: 5,
            zIndex: 5,
          }}
        />
        {props.currentMessage.pending && (
          <ActivityIndicator
            size="large"
            color="green"
            style={{position: 'absolute', left: 60, top: 60, zIndex: 5}}
          />
        )}
      </TouchableOpacity>
    );
  };
  handlePendingMessages = msgid => {
    try {
      const {chatmessages, pendingMessages} = this.state;
      console.log('pending msgs4:', pendingMessages.length, msgid);
      chatmessages.forEach(message => {
        console.log('message:', message);
        if (msgid === message._id) {
          message.pending = false;
        }
      });
      this.forceUpdate();
      // let tmpMsgIndex = this.state.tempMsgArr.findIndex(object => object.key === this.state.chatConvId);
      // console.log(updatedMessages);
      // this.setState({ chatmessages: updatedMessages });
      // let newupdatedmsgs = JSON.parse(JSON.stringify(updatedMessages))
      // this.state.tempMsgArr[tmpMsgIndex].data = newupdatedmsgs.reverse();
    } catch (e) {
      console.log('pending message error:', e);
    }
  };
  handleSelectMessage = (messageId, msg) => {
    const {selectedMessages} = this.state;
    console.log('slctd msgs1:', selectedMessages.length, messageId, msg);
    const isSelected = selectedMessages.includes(messageId);
    // this.forceUpdate();
    if (isSelected) {
      this.setState({
        selectedMessages: selectedMessages.filter(id => id !== messageId),
      });
      // this.setState({disableIcons:true})
      console.log('slctd msgs2:', selectedMessages.length, msg);
    } else {
      this.setState({selectedMessages: [...selectedMessages, messageId]});
      console.log('slctd msgs3:', selectedMessages.length, msg);
    }
    // if(msg == true){
    //     console.log("slctd msgs4:", selectedMessages.length, msg)
    //     this.toggleReactionsModal({}, null, { x:0,y:screenheight-50},true)
    //     this.forceUpdate();
    // }
    // else if(selectedMessages.length == 1 && msg == false){
    //     console.log("slctd msgs5:", selectedMessages.length, msg)
    //     this.setState({ showReactionsModal: false, modalPosition: { x: 0, y: 0 } })
    //     this.forceUpdate();
    // }
  };
  handleDeleteSelected = () => {
    const {chatmessages, selectedMessages} = this.state;
    console.log('slctd msgs6:', selectedMessages.length);
    const updatedMessages = chatmessages.filter(
      message => !selectedMessages.includes(message._id),
    );
    let tmpMsgIndex = this.state.tempMsgArr.findIndex(
      object => object.key === this.state.chatConvId,
    );
    console.log(updatedMessages);
    this.setState({chatmessages: updatedMessages});
    let newupdatedmsgs = JSON.parse(JSON.stringify(updatedMessages));
    this.state.tempMsgArr[tmpMsgIndex].data = newupdatedmsgs.reverse();
    this.setState({selectedMessages: []});
    this.setState({showReactionsModal: false, modalPosition: {x: 0, y: 0}});
  };
  onDelete = messageIdToDelete => {
    console.log('id:', messageIdToDelete);
    let tmpMsgIndex = this.state.tempMsgArr.findIndex(
      object => object.key === this.state.chatConvId,
    );
    this.state.tempMsgArr[tmpMsgIndex].data = this.state.tempMsgArr[
      tmpMsgIndex
    ].data.filter(message => message._id !== messageIdToDelete);
    this.setState(previousState => ({
      chatmessages: previousState.chatmessages.filter(
        message => message._id !== messageIdToDelete,
      ),
    }));
    this.setState({showReactionsModal: false, modalPosition: {x: 0, y: 0}});
    // this.setState(previousState =>
    //     ({ tempMsgArr: previousState.tempMsgArr.filter(message => message._id !== messageIdToDelete) }))
  };
  onLongPress = (context, message) => {
    // console.log(context, message);
    dismissKeyboard();
    const options = ['copy', 'Delete Message', 'Reply', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            if (message.user.chatType == 'text') {
              Clipboard.setString(message.text);
            } else {
              alert('Please copy text messages only.');
            }
            break;
          case 1:
            this.onDelete(message._id); //pass the function here
            break;
          case 2:
            // console.log(message)
            this.setState({setReplyEnabled: message});
            // this.renderChatFooter(message);
            break;
        }
      },
    );
  };
  onLongPressPopUp = (message, buttonIndex) => {
    if (message != null) {
      dismissKeyboard();
      switch (buttonIndex) {
        case 0:
          if (message.user.chatType == 'text') {
            Clipboard.setString(message.text);
            this.setState({
              showReactionsModal: false,
              modalPosition: {x: 0, y: 0},
            });
          } else {
            alert('Please copy text messages only.');
          }
          break;
        case 1:
          this.onDelete(message._id); //pass the function here
          break;
        case 2:
          // console.log(message)
          this.setState({
            setReplyEnabled: message,
            showReactionsModal: false,
            modalPosition: {x: 0, y: 0},
          });
          // this.renderChatFooter(message);
          break;
        case 3:
          this.setState({
            showReactionsModal: false,
            modalPosition: {x: 0, y: 0},
          });
      }
    } else {
      if (buttonIndex == 1) {
        this.handleDeleteSelected();
      } else if (buttonIndex == 3) {
        this.setState({
          showReactionsModal: false,
          modalPosition: {x: 0, y: 0},
          selectedMessages: [],
        });
      }
    }
  };
  onPress = (context, message) => {
    console.log(message);
    const isSelected = this.state.selectedMessages.includes(message._id);
    console.log(this.state.selectedMessages, isSelected);
    const containerStyle = isSelected
      ? {backgroundColor: 'yellow'}
      : {backgroundColor: 'yellow'};
    return (
      <View
        //   message={message}
        containerStyle={containerStyle}
      />
    );
  };
  openFullScreenImage = imageUri => {
    this.setState({fullScreenImageUri: imageUri, fullscreenimagemodal: true});
  };
  closeFullScreenImage = () => {
    this.setState({fullScreenImageUri: null, fullscreenimagemodal: false});
  };
  openFullScreenVideo = videoUri => {
    this.setState({fullScreenVideoUri: videoUri, fullscreenvideomodal: true});
  };
  closeFullScreenVideo = () => {
    this.setState({fullScreenVideoUri: null, fullscreenvideomodal: false});
  };
  toggleReactionsModal = (context, message, position, disable) => {
    this.setState({disableIcons: disable});
    console.log(this.context, message, position, screenheight);
    this.setState(prevState => ({
      showReactionsModal: true, //!prevState.showReactionsModal,
      messageForReactions: message,
      modalPosition: {x: position.x, y: position.y},
    }));
  };
  renderBubble = props => {
    const {setReplyEnabled, selectedMessages} = this.state;
    let replyTo = JSON.parse(JSON.stringify(setReplyEnabled));
    const isSelected = selectedMessages.includes(props.currentMessage._id);
    const containerStyle = isSelected ? {backgroundColor: '#E5E4E2'} : {};
    // console.log("replyto:",replyTo)
    var sameUserInPrevMessage = false;
    var messageBelongsToCurrentUserRight,
      messageBelongsToCurrentUserLeft,
      opacityLeft,
      opacityRight,
      textColor;
    if (props.currentMessage.user.messageType == 'online') {
      // your online bubble
      messageBelongsToCurrentUserRight = '#8bc8db';
      messageBelongsToCurrentUserLeft = '#636363';
      textColor = 'white';
      opacityRight = 1;
      opacityLeft = 1;
    } else if (props.currentMessage.user.messageType == 'offline') {
      // your offline bubble
      messageBelongsToCurrentUserRight = '#4caf50'; //'rgba(139,200,219,0.7)';
      messageBelongsToCurrentUserLeft = '#Ff9800'; //'rgba(178,178,178,0.5)';
      textColor = 'white';
      opacityRight = 1;
      opacityLeft = 1;
    } else {
      messageBelongsToCurrentUserRight = '#8bc8db';
      messageBelongsToCurrentUserLeft = '#636363';
      textColor = 'white';
      opacityRight = 1;
      opacityLeft = 1;
    }
    return props.currentMessage.user.isReplyEnabled == true ? (
      <View
        style={{
          width: screenwidth,
          marginTop: 3,
          marginBottom: 10,
          ...(isSelected ? {backgroundColor: 'lightgray'} : {}),
        }}>
        <TouchableOpacity
          //  onPress={() => { props.currentMessage.user.deletemessage = !props.currentMessage.user.deletemessage, this.handleSelectMessage(props.currentMessage._id, props.currentMessage.user.deletemessage) }}
          onLongPress={event =>
            this.toggleReactionsModal(
              {},
              props.currentMessage,
              {
                x: event.nativeEvent.pageX - event.nativeEvent.locationX,
                y: event.nativeEvent.pageY - event.nativeEvent.locationY,
              },
              false,
            )
          }
          style={{
            marginBottom: 0,
            borderRadius: 5,
            width: screenwidth / 2,
            ...(isSelected
              ? {
                  ...(props.currentMessage.user._id == 1
                    ? {marginLeft: screenwidth / 2 - 5, marginRight: 5}
                    : {marginLeft: 5}),
                }
              : {
                  ...(props.currentMessage.user._id == 2
                    ? {
                        backgroundColor: messageBelongsToCurrentUserLeft,
                        marginLeft: 5,
                      }
                    : {
                        backgroundColor: messageBelongsToCurrentUserRight,
                        marginLeft: screenwidth / 2 - 5,
                        marginRight: 5,
                      }),
                }),
          }}>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: 'gray',
              borderLeftColor: '#00468A',
              borderLeftWidth: 5,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 0,
                paddingTop: 5,
                paddingLeft: 3,
                fontWeight: '700',
              }}>
              {props.currentMessage.user.replyTo.id == 2
                ? props.currentMessage.user.replyTo.name
                : 'You'}
            </Text>
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 0,
                paddingTop: 5,
                paddingLeft: 3,
                fontSize: 10,
              }}>
              {props.currentMessage.user.replyTo.text}
            </Text>
          </View>
          <Bubble
            // onPress={()=>this.toggleReactionsModal({}, props.currentMessage, { x: 0, y: screenheight-100 },true)}
            onPress={() => {
              (props.currentMessage.user.deletemessage =
                !props.currentMessage.user.deletemessage),
                this.handleSelectMessage(
                  props.currentMessage._id,
                  props.currentMessage.user.deletemessage,
                );
            }}
            //    onLongPress={(event) => this.toggleReactionsModal({}, props.currentMessage, { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY })}
            textStyle={{
              right: {color: 'white'},
              left: {color: textColor},
            }}
            wrapperStyle={{
              right: {
                width: '100%',
                height: '100%',
                shadowOffset: {width: 0, height: 8},
                ...(isSelected
                  ? {
                      borderBottomRightRadius: 5,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }
                  : {borderBottomRightRadius: 5}),
                shadowOpacity: 0.5,
                shadowRadius: 20,
                shadowColor: '#236c7a',
                elevation: 0,
                marginBottom: 0,
                backgroundColor: messageBelongsToCurrentUserRight,
                opacity: opacityRight,
              },
              left: {
                width: '100%',
                height: '100%',
                elevation: 0,
                shadowColor: '#343434',
                marginTop: 0,
                ...(isSelected
                  ? {
                      borderBottomLeftRadius: 5,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                    }
                  : {borderBottomLeftRadius: 5}),
                backgroundColor: messageBelongsToCurrentUserLeft,
                opacity: opacityLeft,
              },
            }}
            {...props}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={event =>
          this.toggleReactionsModal(
            {},
            props.currentMessage,
            {
              x: event.nativeEvent.pageX - event.nativeEvent.locationX,
              y: event.nativeEvent.pageY - event.nativeEvent.locationY,
            },
            false,
          )
        }
        style={{
          width: screenwidth,
          marginTop: 3,
          zIndex: 5,
          marginBottom: 10,
          ...(isSelected ? {backgroundColor: 'lightgray'} : {}),
        }}>
        <Bubble
          // onPress={()=>this.toggleReactionsModal({}, props.currentMessage, { x: 0, y: screenheight-100 },true)}
          onPress={() => {
            (props.currentMessage.user.deletemessage =
              !props.currentMessage.user.deletemessage),
              this.handleSelectMessage(
                props.currentMessage._id,
                props.currentMessage.user.deletemessage,
              );
          }}
          textStyle={{right: {color: 'white'}, left: {color: textColor}}}
          //  onPress={(event) => this.toggleReactionsModal({}, props.currentMessage,{ x: (event.nativeEvent.pageX-event.nativeEvent.locationX), y: event.nativeEvent.pageY-event.nativeEvent.locationY } )}
          // onLongPress={()=>alert('jjnjb')}
          wrapperStyle={{
            right: {
              shadowOffset: {width: 0, height: 8},
              zIndex: 4,
              borderRadius: 5,
              marginRight: 5,
              shadowOpacity: 0.5,
              shadowRadius: 20,
              shadowColor: '#236c7a',
              elevation: 0,
              marginBottom: 0,
              ...(isSelected
                ? {backgroundColor: messageBelongsToCurrentUserRight}
                : {backgroundColor: messageBelongsToCurrentUserRight}),
              opacity: opacityRight,
            },
            left: {
              elevation: 0,
              shadowColor: '#343434',
              zIndex: 4,
              borderRadius: 5,
              marginLeft: 5,
              marginBottom: 0,
              opacity: opacityLeft,
              ...(isSelected
                ? {backgroundColor: messageBelongsToCurrentUserLeft}
                : {backgroundColor: messageBelongsToCurrentUserLeft}),
            },
          }}
          {...props}
        />
      </TouchableOpacity>
    );
  };
  getItemLayout = (data, index) => {
    // Calculate the height of a message item (adjust as per your design)
    var messageHeight = 50; /* calculate message height */
    // Return the item height and offset
    return {
      length: messageHeight,
      offset: messageHeight * index,
      index,
    };
  };
  getMessageAge(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + (interval === 1 ? ' y' : ' y');
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + (interval === 1 ? ' mo' : ' mo');
    }
    interval = Math.floor(seconds / 604800);
    if (interval >= 1) {
      return interval + (interval === 1 ? ' w' : ' w');
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + (interval === 1 ? ' d' : ' d');
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + (interval === 1 ? ' h' : ' h');
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + (interval === 1 ? ' m' : ' m');
    }
    return Math.floor(seconds) + ' s';
  }
  renderComposer(props) {
    // console.log("composer:",props)
    try {
      return (
        <View style={{width: '70%'}}>
          <Composer {...props} />
        </View>
      );
    } catch (e) {
      console.log('gc1 error:', e);
    }
  }
  renderChatFooter = message => {
    const {setReplyEnabled} = this.state;
    let replyTo = JSON.parse(JSON.stringify(setReplyEnabled));
    // console.log("replyto",replyTo)
    let rplytxt = '';
    if (setReplyEnabled) {
      return (
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            marginBottom: 3,
            backgroundColor: 'white',
          }}>
          <View
            style={{height: 50, width: 5, backgroundColor: '#E34234'}}></View>
          <View style={{flexDirection: 'column'}}>
            <Text style={{color: 'red', paddingLeft: 10, paddingTop: 5}}>
              {replyTo.user._id == 1 ? 'You' : replyTo.user.name}
            </Text>
            <Text
              style={{
                color: 'gray',
                paddingLeft: 10,
                paddingTop: 5,
                fontSize: 10,
              }}>
              {replyTo.text}
            </Text>
          </View>
          <View
            onStartShouldSetResponder={() =>
              this.setState({setReplyEnabled: null})
            }
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 10,
              position: 'absolute',
              left: '90%',
              width: '10%',
              aspectRatio: 1 / 1,
            }}>
            <TouchableOpacity>
              <Text style={{color: 'black', fontSize: 18}}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };
  renderFooter = () => {
    const {isUserTyping} = this.state;
    if (isUserTyping) {
      return (
        <View
          style={{
            backgroundColor: 'rgba(256,256,256,0.6',
            borderWidth: 0,
            borderColor: 'lightgray',
            padding: 10,
            marginTop: 10,
            width: 60,
            height: 'auto',
            borderRadius: 5,
            marginLeft: 5,
            marginBottom: 10,
          }}>
          <Loader size={5} />
        </View>
      );
    } else {
      return <Text></Text>;
    }
  };
  renderSend = props => {
    const {text} = props;
    if (text.trim().length > 0) {
      return (
        <Send {...props}>
          <View style={{height: '100%', marginRight: 0}}>
            <Icon
              style={{padding: 10, justifyContent: 'center'}}
              name={'send'}
              color={'#4684B2'}
              size={20}
            />
          </View>
        </Send>
      );
    }
    return null;
  };
  renderMessage = props => {
    const {setReplyEnabled, selectedMessages} = this.state;
    let replyTo = JSON.parse(JSON.stringify(setReplyEnabled));
    const isSelected = selectedMessages.includes(props.currentMessage._id);
    const containerStyle = isSelected ? {backgroundColor: 'yellow'} : {};
    // console.log("replyto:",replyTo)
    var sameUserInPrevMessage = false;
    var messageBelongsToCurrentUserRight,
      messageBelongsToCurrentUserLeft,
      opacityLeft,
      opacityRight,
      textColor;
    if (props.currentMessage.user.messageType == 'online') {
      // your online bubble
      messageBelongsToCurrentUserRight = '#8bc8db';
      messageBelongsToCurrentUserLeft = '#636363';
      textColor = 'white';
      opacityRight = 1;
      opacityLeft = 1;
    } else if (props.currentMessage.user.messageType == 'offline') {
      // your offline bubble
      messageBelongsToCurrentUserRight = 'rgba(139,200,219,0.7)';
      messageBelongsToCurrentUserLeft = 'rgba(178,178,178,0.5)';
      textColor = 'white';
      opacityRight = 1;
      opacityLeft = 1;
    } else {
      messageBelongsToCurrentUserRight = '#8bc8db';
      messageBelongsToCurrentUserLeft = '#636363';
      textColor = 'white';
      opacityRight = 1;
      opacityLeft = 1;
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={[
          props.wrapperStyle,
          props.position === 'left' ? 'red' : 'pink',
          containerStyle,
        ]}
      />
    );
  };
  renderAccessory() {
    return this.renderChatFooter();
  }
  renderInputToolbar(props) {
    // console.log("inputtoolbar:",props)
    try {
      return (
        <InputToolbar
          {...props}
          renderComposer={this.renderComposer}
          renderAccessory={this.renderAccessory}
          renderActions={this.renderActions}
          accessoryStyle={{height: 30}}
          textInputStyle={{color: 'black'}}
          containerStyle={{borderTopColor: '#E8E8E8', borderTopWidth: 0}}
        />
      );
    } catch (e) {
      console.log('gc2 error:', e);
    }
  }
  inputBoxSwitch = () => {
    let x = this.state.inputBoxToggleSwitch;
    console.log(this.state.inputBoxToggleSwitch);
    if (this.state.inputBoxToggleSwitch == false) {
      this.setState({inputBoxToggleSwitch: !x});
      AsyncStorage.setItem('disableuserbox', 'flex');
      setTimeout(() => {
        this.setState({displayUserBox: 'flex'});
      }, 500);
    } else {
      this.setState({inputBoxToggleSwitch: !x, displayUserBox: 'none'});
      AsyncStorage.setItem('disableuserbox', 'none');
    }
  };
  viewFlakeSwitch = () => {
    let x = this.state.viewFlakeToggleSwitch;
    console.log(this.state.viewFlakeToggleSwitch, confusername);
    if (this.state.viewFlakeToggleSwitch == false) {
      this.setState({
        viewFlakeToggleSwitch: !x,
        viewFlakeTextDisplay: 'flex',
        viewFlakeTextValue: 'Hide',
      });
    } else {
      this.setState({
        viewFlakeToggleSwitch: !x,
        viewFlakeTextDisplay: 'none',
        viewFlakeTextValue: 'Display and copy',
      });
    }
  };
  lockToggleSwitch = async () => {
    if (this.state.lockEnabledState == false) {
      if (loggedInuserType == 'flake') {
        this.setState({
          enableLockProcessModal: true,
          showSettingModal: false,
        });
        if (this.state.UnlockScreenData.length == 0) {
          await this.ManageUnlockScreenData();
        }
      } else {
        if (temp_password == '') {
          this.setState({lockWarningModal: true, showSettingModal: false});
        } else {
          this.setState({
            enableLockProcessModal: true,
            showSettingModal: false,
          });
        }
        if (this.state.UnlockScreenData.length == 0) {
          await this.ManageUnlockScreenData();
        }
      }
    } else {
      Alert.alert('Disable Lock', 'Are you sure you want to disable lock?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            this.setState({lockEnabledState: false});
            AsyncStorage.removeItem('newauthapplock');
            AsyncStorage.removeItem('isapplockenabled');
            AsyncStorage.removeItem('LockScreenData');
          },
        },
      ]);
    }
  };
  addNewAppsToggleSwitch = () => {
    this.setState({addAppsToggleSwitch: true});
    let x = this.state.addAppsToggleSwitch;
    // if (this.state.addAppsToggleSwitch == false) {
    this.setState({miniAppsModal: true, showSettingModal: false});
    AsyncStorage.setItem('isminiappsenabled', JSON.stringify(true));
    // if(this.state.NewauthMiniApps[0].ischecked==false && this.state.NewauthMiniApps[1].ischecked==false){
    // }
    if (this.state.NewauthMiniApps[0].ischecked == true) {
      this.setState({displaynotesapp: 'flex'});
    }
    if (this.state.NewauthMiniApps[1].ischecked == true) {
      this.setState({displayfoodapp: 'flex'});
    }
    // }
    // else {
    //     this.setState({ addAppsToggleSwitch: !x })
    //     AsyncStorage.setItem('isminiappsenabled', JSON.stringify(false))
    //     this.setState({ displaynotesapp: 'none', displayfoodapp: 'none' })
    // }
  };
  addMoreContactsToRecents = () => {
    let x = this.state.addMoreContactsToggleSwitch;
    console.log(this.state.addMoreContactsToggleSwitch);
    // if (this.state.addMoreContactsToggleSwitch == false) {
    if (loggedInuserType == 'phone') {
      if (this.state.PaymentDoneStatus == true) {
        // this.setState({ addMoreContactsToggleSwitch: !x})
        // switchcolorcounter++;
        if (this.state.CanAddContacts == this.state.AlreadyAddedContacts) {
          this.setState({
            manageContactsModal1: false,
            paymentnotificationModal: true,
          });
        } else {
          this.state.filteredContactData.forEach(element => {
            element.checked = true;
          });
          this.removeContactsModal1(this.state.filteredContactData);
        }
      } else {
        this.setState({
          manageContactsModal1: false,
          paymentnotificationModal: true,
        });
      }
    }
    // alert("pay");
    //     this.setState({ addMoreContactsToggleSwitch: !x})
    //   switchcolorcounter++;
    //   this.state.filteredContactData.forEach(element=>{
    //      element.checked = true
    //   })
    else if (loggedInuserType == 'flake') {
      // this.setState({ addMoreContactsToggleSwitch: !x })
      // switchcolorcounter++;
      this.state.filteredContactData.forEach(element => {
        element.checked = true;
      });
      this.removeContactsModal1(this.state.filteredContactData);
    } else {
      // alert("please login")
      Animated.timing(this.state.viewFlakeTextOpacity, {
        toValue: 0.8,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        Animated.timing(this.state.viewFlakeTextOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      }, 2000);
    }
    // }
    // else {
    //     if (loggedInuserType == "phone") {
    //         // alert("pay");
    //         if(this.state.PaymentDoneStatus==true){
    //                 // this.setState({ addMoreContactsToggleSwitch: !x})
    //                 // switchcolorcounter--;
    //             }
    //             else{
    //             }
    //     }
    //     else if (loggedInuserType == "flake") {
    //         // this.setState({ addMoreContactsToggleSwitch: !x })
    //         // switchcolorcounter--;
    //     }
    //     else {
    //         alert("please login")
    //     }
    // }
    if (switchcolorcounter > 0) {
      this.setState({changeSwitchColor: true});
    } else {
      this.setState({changeSwitchColor: false});
    }
  };
  //to get color and location based on data
  getcolorandlocationbasedondata(data1, data2, i, arrlen) {
    var pastelcodes = [
      ' F7F6CF ',
      ' B6D8F2 ',
      ' F4CFDF ',
      ' 5784BA ',
      ' 9AC8EB ',
      ' CCD4BF ',
      ' E7CBA9 ',
      ' EEBAB2 ',
      ' F5F3E7 ',
      ' F5E2E4 ',
      ' F5BFD2 ',
      ' E5DB9C ',
      ' D0BCAC ',
      ' BEB4C5 ',
      ' E6A57E ',
      ' 218B82 ',
      ' 9AD9DB ',
      ' E5DBD9 ',
      ' 98D4BB ',
      ' EB96AA ',
      ' C6C9D0 ',
      ' C54B6C ',
      ' E5B3BB ',
      ' C47482 ',
      ' D5E4C3 ',
      ' F9968B ',
      ' F27348 ',
      ' 26474E ',
      ' 76CDCD ',
      ' 2CCED2 ',
      ' B8E0F6 ',
      ' A4CCE3 ',
      ' 37667E ',
      ' DEC4D6 ',
      ' 7B92AA ',
      ' DDF2F4 ',
      ' 84A6D6 ',
      ' 4382BB ',
      ' E4CEE0 ',
      ' A15D98 ',
      ' DC828F ',
      ' F7CE76 ',
      ' E8D6CF ',
      ' 8C7386 ',
      ' 9C9359 ',
      ' F4C815 ',
      ' F9CAD7 ',
      ' A57283 ',
      ' C1D5DE ',
      ' DEEDE6 ',
      ' E9BBB5 ',
      ' E7CBA9 ',
      ' AAD9CD ',
      ' E8D595 ',
      ' 8DA47E ',
      ' CAE7E3 ',
      ' B2B2B2 ',
      ' EEB8C5 ',
      ' DCDBD9 ',
      ' FEC7BC ',
      ' FBECDB ',
      ' F3CBBD ',
      ' 90CDC3 ',
      ' AF8C72 ',
      ' 938F43 ',
      ' B8A390 ',
      ' E6D1D2 ',
      ' DAD5D6 ',
      ' B2B5B9 ',
      ' 8FA2A6 ',
      ' 8EA4C8 ',
      ' C3B8AA ',
      ' DEDCE4 ',
      ' DB93A5 ',
      ' C7CDC5 ',
      ' 698396 ',
      ' A9C8C0 ',
      ' DBBC8E ',
      ' AE8A8C ',
      ' 7C98AB ',
      ' C2D9E1 ',
      ' D29F8C ',
      ' D9D3D2 ',
      ' 81B1CC ',
      ' FFD9CF ',
      ' C6AC85 ',
      ' ',
      ' D9C2BD ',
      ' A2C4C6 ',
      ' 82B2B8 ',
      ' 874741 ',
      ' CA9C95 ',
      ' 40393E ',
      ' E5E4E5 ',
      ' 897C87 ',
      ' 46302B ',
      ' 76504E ',
      ' D3CCCA ',
      ' A37E7E ',
      ' 86736C ',
      ' ',
      ' AD192A ',
      ' E4B78F ',
      ' F1E8EA ',
      ' D88D96 ',
      ' EAB1B9 ',
      ' F38C10 ',
      ' A7763B ',
      ' CCD7D8 ',
      ' 4C482E ',
      ' D2B6BA ',
      ' BE3F12 ',
      ' 7DB0CD ',
      ' C0B5AB ',
      ' 79553F ',
      ' 91BA96 ',
      ' A65111 ',
      ' DDAA00 ',
      ' 7C5D3D ',
      ' 85AAAA ',
      ' 173F4E ',
      ' D82315 ',
      ' 2F1710 ',
      ' 425164 ',
      ' DABB96 ',
      ' 899FB6 ',
      ' DBB657 ',
      ' 86553F ',
      ' C8C2D0 ',
      ' E45C54 ',
      ' 90A375 ',
      ' F9BB9D ',
      ' FFDA43 ',
      ' 756382 ',
      ' E2C274 ',
      ' 9CA8B5 ',
      ' FFE75D ',
      ' D24970 ',
      ' 32657C ',
      ' 669BB7 ',
      ' CF8145 ',
      ' 753516 ',
      ' AF6F33 ',
      ' 9DB4BA ',
      ' 210E0D ',
      ' E2D2C1 ',
      ' CA8459 ',
      ' DDB396 ',
      ' DDDFE3 ',
      ' 422523 ',
      ' 954D34 ',
      ' 843619 ',
      ' B87730 ',
      ' 1B2625 ',
      ' DAD0CE ',
      ' 748991 ',
      ' 64A532 ',
      ' B09647 ',
      ' 450309 ',
      ' DEE2E3 ',
      ' 7B5536 ',
      ' 446C04 ',
      ' F8DF96 ',
      ' 977D77 ',
      ' 301F1A ',
      ' 5E301F ',
      ' 8E3229 ',
      ' AEBB35 ',
      ' 2F1D16 ',
      ' D0BDAA ',
      ' A37537 ',
      ' FF415B ',
      ' BC7F37 ',
      ' 352C20 ',
      ' EAE8E8 ',
      ' 64AA71 ',
      ' F64900 ',
      ' CB8A2D ',
      ' 262416 ',
      ' DDDDDE ',
      ' 90B274 ',
      ' B08D7E ',
      ' 6C74A4 ',
      ' BBB9BC ',
      ' 5E2424 ',
      ' 95BB9A ',
      ' 652F20 ',
      ' 74C85D ',
      ' 2D3538 ',
      ' 57818A ',
      ' D54C2E ',
      ' D09150 ',
      ' DEBD9B ',
      ' 3C2320 ',
      ' 955132 ',
      ' EBEBEF ',
      ' B08138 ',
      ' 784928 ',
      ' 382918 ',
      ' DDD4D3 ',
      ' AE8A75 ',
      ' F08E88 ',
      ' 422D09 ',
      ' 468F5E ',
      ' AC7C36 ',
      ' E3E2DF ',
      ' E1A624 ',
      ' 317AC1 ',
      ' 384454 ',
      ' D4D3DC ',
      ' AD956B ',
      ' F38C10 ',
      ' A7763B ',
      ' CCD7D8 ',
      ' 4C482E ',
      ' D2B6BA ',
      ' C5853D ',
      ' 99372E ',
      ' DAD4D9 ',
      ' 391C19 ',
      ' B27E83 ',
      ' 4F3B2B ',
      ' 7C6619 ',
      ' B8B5AD ',
      ' BE0309 ',
      ' 93C1D5 ',
    ];
    var top20 = (arrlen * 20) / 100;
    var top50 = (arrlen * 50) / 100;
    var rgbmap;
    function getpastelcolor(col) {
      console.log('col:', col);
      if (rgbmap == null) {
        creatergbmapofpastels();
      }
      var pastel = findclosestrgbfrommap(col);
      //console.log('Pastel found ' + pastel );
      return pastel;
    }
    function creatergbmapofpastels() {
      rgbmap = {};
      for (var c = 0; c < pastelcodes.length; c++) {
        var rgbobj = hexToRgb1(pastelcodes[c].trim());
        if (rgbobj != null) {
          rgbmap[pastelcodes[c].trim()] = rgbobj;
        }
      }
      //console.log('RGBMAP created'  );
    }
    function findclosestrgbfrommap(col) {
      //document.getElementById('b64').style.backgroundColor = col; /// Remove this LINE
      col = col.replace('#', '');
      var rgbobjforcol = hexToRgb1(col);
      console.log(
        'Looking for the closest color for ' +
          col +
          ' ' +
          JSON.stringify(rgbobjforcol),
      );
      var distance = -1;
      var closestcolor;
      const rgbkeys = Object.keys(rgbmap);
      rgbkeys.forEach((key, index) => {
        //console.log(`${key}: ${rgbmap[key]}`);
        var thisdist = calculatedistance(rgbobjforcol, rgbmap[key]);
        if (distance < 0 || thisdist < distance) {
          if (distance > 0) {
            //document.getElementById('json').style.backgroundColor = '#'+key; /// Remove this LINE
            closestcolor = '#' + key;
            //console.log('Idx ' + index + 'Closest  ' + closestcolor + ' distance ' + thisdist);
          }
          distance = thisdist;
        }
      });
      return closestcolor;
    }
    function calculatedistance(obj1, obj2) {
      // console.log(obj1,obj2)
      return (
        Math.pow(obj1.r - obj2.r, 2) +
        Math.pow(obj1.g - obj2.g, 2) +
        Math.pow(obj1.b - obj2.b, 2)
      );
    }
    function hexToRgb1(hex) {
      // better version
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }
    var bitArray;
    var cross;
    var digest_sha256;
    if (data1.length > 1000) {
      bitArray = sjcl.hash.sha256.hash(data1.substring(0, 1000));
      //console.log(indata[i].name  + ' length more than 1000');
    } else {
      bitArray = sjcl.hash.sha256.hash(data1);
      //console.log(indata[i].name   );
    }
    digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
    var hashasnum1 = '000000000000000000000000000000000000000000000';
    var hashasnum2 = '1';
    if (digest_sha256 != null) console.log('0x' + digest_sha256);
    // console.log(BigInt(500))
    hashasnum1 = '0x' + digest_sha256;
    //console.log(indata[i].name + ' ' + digest_sha256 + ' ' + hashasnum);
    if (typeof data2 != 'undefined' && data2.length > 0) {
      if (data2.length > 1000) {
        bitArray = sjcl.hash.sha256.hash(data2.substring(0, 1000));
        //console.log(indata[i].name  + ' length more than 1000');
      } else {
        bitArray = sjcl.hash.sha256.hash(data2);
        //console.log(indata[i].name   );
      }
      digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
      if (digest_sha256 != null) hashasnum2 = '0x' + digest_sha256;
      //console.log ('hash1 ' + hashasnum1);
      //console.log ('hash2 ' + hashasnum2);
      cross = hashasnum1 * hashasnum2;
      //	console.log ('cross of the two hashes ' + cross);
    } else {
      cross = hashasnum1;
    }
    var xpercent = parseFloat(
      cross.toString(10).substring(0, 2) +
        '.' +
        cross.toString(10).substring(2, 5),
    );
    var ypercent = parseFloat(
      cross.toString(10).substring(5, 7) +
        '.' +
        cross.toString(10).substring(7, 10),
    );
    var zpercent = '';
    if (cross.toString(10).length > 10)
      zpercent = parseFloat(
        cross.toString(10).substring(10, 12) +
          '.' +
          cross.toString(10).substring(12, 15),
      );
    var col = '#' + cross.toString(16).substring(0, 6); //b3b3b3';
    var pstl = getpastelcolor(col);
    var shadow = '0px 0px 2px ' + pstl;
    if (zpercent > 30 && zpercent < 70) {
      if (zpercent < 50) {
        zpercent = 25;
      } else if (zpercent > 50) {
        zpercent = 70;
      }
    }
    var randtop = parseInt((((screenheight * 90) / 100) * zpercent) / 100);
    var randleft = parseInt((screenwidth * ypercent) / 100);
    var suggesteddotsize = Math.sqrt(
      parseInt(screenwidth * ((screenheight * 90) / 100)) / Math.max(20, 5),
    );
    var startsize = parseInt(suggesteddotsize) / 9; //parseInt(suggesteddotsize)/9;
    //   var maxdotsize = parseInt(suggesteddotsize) / 4;
    var maxdotsize = 15;
    if (i < top20) {
      maxdotsize = 30;
    } else if (i > top20 && i < top50) {
      maxdotsize = 20;
    } else {
      // if(this.state.filteredContactData[i].tag=="conversation"){
      //      maxdotsize = 30;
      // }
      // else{
      //      maxdotsize = 15;
      // } made changes here during lock
      maxdotsize = 20;
    }
    console.log('start max:', startsize, maxdotsize);
    var maxshifts = 0;
    var quad = '';
    if (randtop < (screenheight * 90) / 100 / 2) quad += 'N';
    else quad += 'S';
    if (randleft < screenwidth / 2) quad += 'W';
    else quad += 'E';
    this.state.quad[i] = quad;
    // console.log('randtop, randleft, maxdotsize:' + randtop, randleft, maxdotsize)
    while (this.mindthegaps(randtop, randleft, maxdotsize)) {
      if (maxshifts > 5) {
        // alert('Done shifting this dot:' + i + ':' + randtop + ':' + randleft);
        break;
      }
      if (randtop < (screenheight * 90) / 100 / 2 && randtop > 50 + startsize)
        randtop -= startsize;
      else randtop += startsize;
      if (randleft < screenwidth / 2 && randleft > 0) randleft -= startsize;
      else randleft += startsize;
      maxshifts++;
    }
    if (randleft < 10) randleft += 10;
    if (randleft > screenwidth - maxdotsize - 10) randleft -= 3 * maxdotsize;
    if (randtop < 60) randtop += 60;
    if (randtop > (screenheight * 90) / 100 - maxdotsize - 10)
      randtop -= maxdotsize + 10;
    if (i <= 2) console.log('randleft ' + randleft + ' randtop ' + randtop);
    this.state.dotheight[i] = this.state.dotwidth[i];
    this.state.dottop[i] = parseInt(randtop);
    this.state.dotleft[i] = parseInt(randleft);
    checkPosArray.push({
      top: this.state.dottop[i],
      left: this.state.dotleft[i],
      bottom: parseInt(this.state.dottop[i] + maxdotsize),
      right: parseInt(this.state.dotleft[i] + maxdotsize),
      quad: this.state.quad[i],
    });
    // if(zpercent>30 && zpercent<70){
    //     if(zpercent<50){
    //         zpercent = 25
    //     }
    //     else  if(zpercent>50){
    //         zpercent = 60
    //     }
    // }
    console.log('lt bfr:', randleft, randtop);
    if (randleft + maxdotsize > screenwidth) {
      let diff = randleft + maxdotsize - screenwidth;
      randleft = randleft - diff;
    }
    if (randtop + maxdotsize > (screenheight * 85) / 100) {
      let diff = randtop + maxdotsize - (screenheight * 85) / 100;
      randtop = randtop - diff;
    }
    console.log('lt aftr:', randleft, randtop);
    return {
      xpc: (screenwidth * xpercent) / 100,
      ypc: new Animated.Value(parseInt(randleft)),
      zpc: new Animated.Value(parseInt(randtop)),
      origcol: col, //color by hash
      col: pstl, //pastel color
      boxShadow: shadow,
      width: new Animated.Value(maxdotsize * 1.5),
      height: new Animated.Value(maxdotsize * 1.5),
    };
  }
  getlocation = async (indata, startIndex) => {
    console.log(
      'indata length,allrcnt:',
      indata.length,
      this.state.allRecentContactsArray.length,
    );
    for (let i = startIndex; i < indata.length; i++) {
      let data1 = this.state.filteredContactData[i].phoneNumber;
      multipleContacts += ',' + data1;
      let data2 = this.state.filteredContactData[i].name;
      this.state.dotColorLocation[i] = this.getcolorandlocationbasedondata(
        data1,
        data2,
        i,
        this.state.filteredContactData.length,
      );
      this.state.filteredContactData[i].color = JSON.parse(
        JSON.stringify(this.state.dotColorLocation[i].col),
      );
      dotColors[i] = JSON.parse(
        JSON.stringify(this.state.dotColorLocation[i].col),
      );
      try {
        if (i == indata.length - 1) {
          // console.log("multicontacts:",multipleContacts)
          global.btoa = require('base-64').encode;
          encodedContacts = await global.btoa(multipleContacts);
          // console.log("fixed locations:",this.state.dotColorLocation);
          // console.log("dot colors:",dotColors)
          console.log(this.state.dotColorLocation[i].zpc);
          setTimeout(() => {
            var clrArr;
            // try {
            //     AsyncStorage.getItem('allContactDotColors').then(asyncStorage => {
            //         clrArr = JSON.parse(asyncStorage);
            //         console.log("clrd arr:",clrArr)
            //         if (asyncStorage !== null) {
            //             // for (let i = 0; i < this.state.filteredContactData.length; i++) {
            //             //     for (let j = 0; j < clrArr.length; j++) {
            //             //         if (this.state.filteredContactData[i].phoneNumber == clrArr[j].phoneNumber) {
            //             //             this.state.filteredContactData[i].color = clrArr[j].color;
            //             //             // console.log(this.state.contactsArray[i]);
            //             //         }
            //             //     }
            //             // }
            //             this.state.filteredContactData.forEach((element) => {
            //                 clrArr.forEach((elmnt) => {
            //                     if (element.phoneNumber == elmnt.phoneNumber) {
            //                         element.color = elmnt.color;
            //                         }
            //                         else{
            //                         element.color = "gray"
            //                         }
            //                 });
            //             });
            //         }
            //         else {
            //             console.log('no colored dots in array')
            //             // this.state.filteredContactData.forEach((element) => {
            //             //     element.color = "gray"
            //             // });
            //         }
            //     })
            // } catch (error) {
            //     console.log('Error retrieving dotcolors')
            // }
            this.setState({updateUIState: true});
          }, 2000);
          setTimeout(() => {
            this.state.filteredContactData.forEach(element => {
              Animated.timing(element.opacity, {
                toValue: 0.3,
                duration: 1000,
                useNativeDriver: false,
              }).start();
              // element.color = "gray"
            });
          }, 1000);
          setTimeout(() => {
            this.state.filteredContactData.forEach(element => {
              Animated.timing(element.opacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false,
              }).start();
            });
          }, 2000);
          // setTimeout(() => {
          //     try {
          //         AsyncStorage.getItem('allContactDotColors').then(asyncStorage => {
          //             console.log('arrclrs:' + asyncStorage);
          //             let clrArr = JSON.parse(asyncStorage);
          //             if (asyncStorage !== null) {
          //                 for (let i = 0; i < this.state.filteredContactData.length; i++) {
          //                     for (let j = 0; j < clrArr.length; j++) {
          //                         if (this.state.filteredContactData[i].phoneNumber == clrArr[j].phoneNumber) {
          //                             console.log("color matched")
          //                             this.state.filteredContactData[i].color = clrArr[j].color;
          //                             console.log("color matched:",this.state.filteredContactData[i].color)
          //                             }
          //                         }
          //                         if(i==this.state.filteredContactData.length-1){
          //                             this.setState({updateUIState:true})
          //                         }
          //                     }
          //                 }
          //             else {
          //                 console.log('no colored dots in array')
          //             }
          //         })
          //     } catch (error) {
          //         console.log('Error retrieving dotcolors')
          //     }
          // }, 3000);
          if (startIndex > 0) {
            for (
              let j = startIndex;
              j < this.state.filteredContactData.length;
              j++
            ) {
              // this.state.dotheight[j] = new Animated.Value(25)
              // this.state.dotwidth[j] = new Animated.Value(25)
              setTimeout(() => {
                try {
                  Animated.timing(this.state.filteredContactData[j].opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                  }).start();
                  console.log(this.state.filteredContactData[j]);
                  setTimeout(() => {
                    Animated.timing(this.state.filteredContactData[j].scale, {
                      toValue: 2,
                      duration: 1000,
                      useNativeDriver: false,
                    }).start();
                    // Animated.timing(this.state.dotColorLocation[j].height, {
                    //     toValue: 50,
                    //     duration: 1000,
                    //     useNativeDriver: false,
                    // }).start();
                    // Animated.timing(this.state.dotColorLocation[j].width, {
                    //     toValue: 50,
                    //     duration: 1000,
                    //     useNativeDriver: false,
                    // }).start();
                  }, 1000);
                  setTimeout(() => {
                    Animated.timing(this.state.filteredContactData[j].scale, {
                      toValue: 1,
                      duration: 1000,
                      useNativeDriver: false,
                    }).start();
                    // Animated.timing(this.state.dotColorLocation[j].height, {
                    //     toValue: 25,
                    //     duration: 1000,
                    //     useNativeDriver: false,
                    // }).start();
                    // Animated.timing(this.state.dotColorLocation[j].width, {
                    //     toValue: 25,
                    //     duration: 1000,
                    //     useNativeDriver: false,
                    // }).start();
                  }, 2000);
                  setTimeout(() => {
                    try {
                      if (this.state.filteredContactData[j].status == false) {
                        // this.state.filteredContactData[j].status = true
                        // this.state.filteredContactData[j].color = "gray"
                      }
                    } catch (e) {
                      console.log('error status');
                    }
                  }, 2000);
                } catch (e) {
                  console.log('error opacity');
                }
              }, 3000);
            }
          }
        }
      } catch (e) {
        console.log('animating error inside get location:', e);
      }
    }
  };
  //to create pastel colors from here
  async displayRadialText(textList, arraytype, centerdotsize, draw, centerdot) {
    let maxdots = textList.length;
    if (maxdots > 100) centerdot = 'small';
    if (centerdot == 'large')
      if (centerdot == 'small')
        // centerdotsize = parseInt(Math.min(screenheight, screenwidth) * (1.6 / 3.6));
        // centerdotsize = parseInt(Math.min(screenheight, screenwidth) * (1 / 4.2));  //medium center
        //if (centerdot == 'small')
        //	centerdotsize = parseInt(Math.min(window.innerHeight, window.innerWidth) * (1/6.2));  //small center
        console.log('center dot size ' + centerdotsize);
    // Minimum radius
    var minRadius = centerdotsize / 2 + centerdotsize * 0.1;
    if (centerdot == 'small')
      minRadius = centerdotsize / 2 + centerdotsize * 0.3;
    // Get the center point of the screen
    console.log('textlist:', textList);
    var centerX = screenwidth / 2;
    var centerY = screenheight / 2;
    var outputobj = [];
    var highestz = textList.length * 2;
    // Keep track of the positionsdeg of the text elements
    var positionsdeg = new Set();
    var positionsrad = new Map();
    // new from here
    var dotsperrad = {};
    var beginsafeloc = 0;
    var usedidx = new Set();
    var totalcountofdots = 0;
    if (textList.length < 20) totalcountofdots = 20;
    if (textList.length >= 20 && textList.length < 50) totalcountofdots = 50;
    if (textList.length >= 50)
      totalcountofdots = parseInt(textList.length * 1.3);
    // to here
    var safelocationsmap = [];
    var dotsperrad = {};
    var beginsafeloc = 0;
    var usedidx = new Set();
    var areaperdot =
      (screenwidth * screenheight - Math.pow(minRadius * 2, 2)) /
      totalcountofdots;
    var dotmaxsize = parseInt(Math.sqrt(areaperdot) / 2.617);
    console.log('max dot size [theoretical] ' + dotmaxsize, areaperdot);
    if (dotmaxsize > Math.min(screenheight, screenwidth) / 13)
      dotmaxsize = Math.min(screenheight, screenwidth) / 13; //changed
    console.log('new  dot size [theoretical] ' + dotmaxsize);
    var maxdiagdeg = parseInt(
      (Math.atan((centerY - dotmaxsize * 2) / (centerX - dotmaxsize * 2)) *
        180) /
        Math.PI,
    );
    console.log('max diagonal at degree ' + maxdiagdeg);
    var maxDiagonal = parseInt(
      (centerX - dotmaxsize * 2) /
        Math.cos(
          Math.atan((centerY - dotmaxsize * 2) / (centerX - dotmaxsize * 2)),
        ),
    );
    console.log('max diagonal ' + maxDiagonal);
    // Iterate through the list of text
    for (var i = 0; i < textList.length; i++) {
      // Get the first 3 letters of the text
      //   var text = textList[i].substring(0, 3);//commented
      // Create a div element to hold the text
      // Use the hash value of the text to determine the placement of the text
      if (arraytype == 'foods') {
        if (textList[i].food.length == 0) {
          var hashobj = this.hashCodeSHA(
            Math.floor(Math.random() * 1e16) + textList[i].savingdate,
          );
        } else {
          var hashobj = this.hashCodeSHA(
            textList[i].food + textList[i].savingdate,
          );
        }
      } else if (arraytype == 'notes') {
        var hashobj = this.hashCodeSHA(
          textList[i].note + textList[i].expiretime,
        );
      } else if (arraytype == 'vault') {
        var hashobj = this.hashCodeSHA(
          textList[i][1].siteUrl +
            textList[i][1].siteuser +
            textList[i][1].sitepwd,
        );
      } else {
        var hashobj = this.hashCodeSHA(
          textList[i].name + textList[i].phoneNumber,
        );
      }
      var hashval = hashobj.num;
      //   console.log("hashobj,hashval:",hashobj,hashval)
      var angledeg = hashval % 360;
      var angle = angledeg * (Math.PI / 180);
      var halfdotmaxsize = dotmaxsize / 2;
      var maxRadius = Math.sqrt(
        Math.pow(centerX - halfdotmaxsize, 2) +
          Math.pow(centerY - halfdotmaxsize, 2),
      );
      var locations = [];
      maxRadius = getMaxRadiusByAngle(angledeg);
      //if (i == 2) {
      if (Object.keys(safelocationsmap).length == 0) {
        populatesafelocationsmap(0);
        console.log('safelocations  ' + JSON.stringify(safelocationsmap));
        console.log(
          'safelocations size ' +
            Object.keys(safelocationsmap).length +
            ' dots per radius ' +
            JSON.stringify(dotsperrad),
        );
      }
      beginsafeloc = parseInt(Object.keys(safelocationsmap).length);
      //	alert(beginsafeloc);
      if (beginsafeloc % 2 > 0) beginsafeloc++;
      //var maxRadius = Math.min(Math.abs(centerX - window.innerWidth), Math.abs(centerY - window.innerHeight));
      var locidx = hashval % parseInt(Object.keys(safelocationsmap).length / 3);
      var loopcount = 0;
      var inconflict = false;
      // var dotstofling = textList.length * 0.4; //dotsperrad[Object.keys(dotsperrad)[0]] + dotsperrad[Object.keys(dotsperrad)[1]];
      // dotsperrad[Object.keys(dotsperrad)[0]] + dotsperrad[Object.keys(dotsperrad)[1]];
      // if (i < dotstofling && i % 2 > 0) locidx += parseInt(beginsafeloc / 2);
      var flingthreshold = 6; // hashval more than this flung outwards
      if (centerdot == 'large') flingthreshold = 5;
      if (centerdot == 'small') flingthreshold = 6;
      if (hashval % 10 > flingthreshold) locidx += parseInt(beginsafeloc / 2); // 30% dots fling
      if (locidx >= Object.keys(safelocationsmap).length)
        locidx = Object.keys(safelocationsmap).length - 2;
      // console.log('locifdx for ' + i + ' ' + locidx + ' safelocations remaining ' + Object.keys(safelocationsmap).length);
      while (usedidx.has(locidx)) {
        inconflict = true;
        console.log(i + ' conflict with locidx ');
        if (loopcount > 5) break;
        locidx = safelocationsmap.length - loopcount;
        loopcount++;
      }
      // if (i < textList.length /2) locidx = hashval % (textList.length);
      if (locidx < 0) locidx = safelocationsmap.length - 1;
      if (typeof safelocationsmap[locidx] != 'undefined') {
        //console.log(' a location ' + locidx + ' ' + safelocationsmap[locidx]);
        var angledegs = safelocationsmap[locidx].split('::')[0];
        var rads = safelocationsmap[locidx].split('::')[1];
        var endang = parseInt(angledegs.split(':')[1]);
        if (
          parseInt(angledegs.split(':')[1]) < parseInt(angledegs.split(':')[0])
        ) {
          endang += 360;
        }
        angledeg = (parseInt(angledegs.split(':')[0]) + endang) / 2;
        if (angledeg > 360) angledeg -= 360;
        var raddiff =
          parseInt(rads.split(':')[1]) - parseInt(rads.split(':')[0]);
        var radius =
          (parseInt(rads.split(':')[1]) + parseInt(rads.split(':')[0])) / 2;
        var jitter = Math.pow(10, locidx / safelocationsmap.length);
        // console.log(' location ' + locidx + ' jitter ' + jitter);
        if (locidx < dotsperrad[Object.keys(dotsperrad)[0]]) {
          angledeg -= jitter;
          radius -= jitter;
        } else {
          if (radius + jitter < getMaxRadiusByAngle(angledeg + jitter)) {
            angledeg += jitter;
            radius += jitter;
          } else if (
            radius + jitter / 2 <
            getMaxRadiusByAngle(angledeg + jitter)
          ) {
            angledeg += jitter / 2;
            radius += jitter / 2;
          }
        }
      } else {
        console.log(
          'locidx ' +
            locidx +
            ' is  undefined .. safelocations size ' +
            Object.keys(safelocationsmap).length,
        );
        var randangledeg = hashval % 360;
        if (randangledeg > 0 && randangledeg <= 90) angledeg = maxdiagdeg;
        if (randangledeg > 90 && randangledeg <= 180)
          angledeg = 180 - maxdiagdeg;
        if (randangledeg > 180 && randangledeg <= 270)
          angledeg = 180 + maxdiagdeg;
        if (randangledeg > 270 && randangledeg <= 360)
          angledeg = 360 - maxdiagdeg;
        maxRadius = getMaxRadiusByAngle(angledeg);
        radius = parseInt(Math.max(minRadius, hashval % maxRadius));
        if (radius < minRadius * 1.3) {
          if (radius + (hashval % (dotmaxsize * 3)) < maxRadius)
            radius += hashval % (dotmaxsize * 3);
          else if (radius + (hashval % (dotmaxsize * 2)) < maxRadius)
            radius += hashval % (dotmaxsize * 2);
          else if (radius + (hashval % dotmaxsize) < maxRadius)
            radius += hashval % dotmaxsize;
        }
        console.log(
          i + ' hardcoded location angle ' + angledeg + ' rad ' + radius,
        );
        inconflict = true;
      }
      angle = angledeg * (Math.PI / 180);
      const halfBeforeTheUnwantedElement = safelocationsmap.slice(0, locidx);
      const halfAfterTheUnwantedElement = safelocationsmap.slice(locidx + 1);
      safelocationsmap = halfBeforeTheUnwantedElement.concat(
        halfAfterTheUnwantedElement,
      );
      //console.log(i + ' removed ' + locidx + ' remaining safe positions ' + safelocationsmap.length);
      var x = parseInt(centerX + radius * Math.cos(angle));
      var y = parseInt(centerY - radius * Math.sin(angle));
      //console.log(i + ' hash ' + hashval + ' angle ' + angledeg + ' maxradius ' + maxRadius + ' radius ' + radius + ' x:y ' + x + ':' + y);
      //	usedidx.add(locidx);
      //	if (locidx < safelocationsmap.length -1) usedidx.add(locidx+1);
      // Set the position of the div element
      //	console.log( ' x:y ' + parseInt(x) + ':' + parseInt(y));
      if (i > 100) {
        var thisdot = 4;
        if (dotmaxsize > 8) thisdot = parseInt(dotmaxsize / 1.6);
      }
      if (i > 500) {
        var thisdot = 2;
        if (dotmaxsize > 4) thisdot = parseInt(dotmaxsize / 2);
      }
      locations.push(
        'locidx angle radius -- ' +
          locidx +
          ' ::' +
          parseInt(angledeg) +
          ':' +
          parseInt(radius),
      );
      // Add the div element to the body of the document
      var pastel = this.getpastelcolor('#' + hashobj.hex.substring(0, 6));
      if (i < 100) {
        setpastelcolor(i, pastel);
      } else if (i > 100) {
        setpastelcolor(i, '#a3a3a3');
      } else if (i > 500) {
        setpastelcolor(i, '#c3c3c3');
      }
      //	if (inconflict) setpastelcolor(i, '#565656');
      if (pastel == undefined) {
        pastel = hashobj.hex.substring(0, 6);
      }
      outputobj.push({
        ypc: new Animated.Value(parseInt(x - dotmaxsize / 2)),
        zpc: new Animated.Value(parseInt(y - dotmaxsize / 2)),
        width: new Animated.Value(parseInt(dotmaxsize)),
        height: new Animated.Value(parseInt(dotmaxsize)),
        col: pastel,
        color: '#' + hashobj.hex.substring(0, 6),
      });
    }
    console.log(
      'remaining safe positions ' + safelocationsmap.length,
      outputobj,
    );
    return outputobj;
    function getMaxRadiusByAngle(deg) {
      if (deg > 360) deg = deg - 360;
      var maxRadius;
      var angle = deg * (Math.PI / 180);
      if (deg <= maxdiagdeg) {
        maxRadius = (centerX - dotmaxsize) / Math.cos(angle);
      }
      if (deg > maxdiagdeg && deg <= 180 - maxdiagdeg) {
        //console.log('degree ' + angledeg + ' ' + (centerY - 50 )/Math.sin(angle) + ' ' + centerX + ' ' + Math.cos(angle) );
        maxRadius = Math.abs((centerY - 50) / Math.sin(angle));
      }
      if (deg > 180 - maxdiagdeg && deg <= 180 + maxdiagdeg) {
        maxRadius = Math.abs((centerX - dotmaxsize) / Math.cos(angle));
      }
      if (deg > 180 + maxdiagdeg && deg <= 360 - maxdiagdeg) {
        maxRadius = Math.abs((centerY - dotmaxsize) / Math.sin(angle));
      }
      if (deg > 360 - maxdiagdeg && deg <= 360) {
        maxRadius = Math.abs((centerX - dotmaxsize) / Math.cos(angle));
      }
      return maxRadius;
    }
    function populatesafelocationsmap(deg) {
      var realdotsize = dotmaxsize;
      // if (realdotsize > 30) realdotsize = 30; //changed here
      //	console.log('realdotsz '+ realdotsize);
      var cellcount = 0;
      var skpd = 0;
      for (var rad = minRadius; rad <= maxDiagonal; rad += realdotsize * 2) {
        // going outwards
        var loggedmsg = [];
        loggedmsg.push('processing radius ' + rad);
        var safedistang = Math.atan((realdotsize * 2) / rad);
        var degdiff = Math.ceil(safedistang * (180 / Math.PI)) + 1;
        for (
          var startdeg = deg;
          startdeg < deg + 360;
          startdeg += degdiff * 1.1
        ) {
          var enddeg = startdeg + degdiff * 1.1;
          var endrad = rad + realdotsize * 2;
          var stdeg = startdeg;
          var endeg = enddeg;
          if (stdeg > 360) stdeg -= 360;
          if (endeg > 360) break; //endeg -= 360;
          //console.log('processing startdeg enddeg ' + startdeg + ' ' + enddeg + ' converted ' + stdeg + ' ' + endeg);
          var maxradforrange = Math.min(
            getMaxRadiusByAngle(stdeg),
            getMaxRadiusByAngle(endeg),
          );
          //	maxradforrange = Math.min(maxradforrange, maxDiagonal);
          maxradforrange = getMaxRadiusByAngle((stdeg + endeg) / 2);
          if ((rad + endrad) / 2 < maxradforrange) {
            safelocationsmap.push(
              parseInt(stdeg) +
                ':' +
                parseInt(endeg) +
                '::' +
                parseInt(rad) +
                ':' +
                parseInt(endrad),
            );
            //	console.log('ADDED startdeg ' + startdeg + ' ENDDEG ' + enddeg + ' maxradforrange ' +  maxradforrange + ' endrad ' + endrad );
            //	drawindicator(stdeg,endeg,rad,endrad);
            addradiusentry(parseInt(rad));
            cellcount++;
          } else {
            skpd++;
            //	drawindicator(stdeg,endeg,rad,endrad, true);
            //	if (startdeg == 189 ) console.log('radii ' + getMaxRadiusByAngle(stdeg) + ' ' + getMaxRadiusByAngle(endeg) + ' --- ' + stdeg + ' ' + endeg);
            //	console.log('SKIPPED startdeg ' + startdeg + ' ENDDEG ' + enddeg + ' maxradforrange ' +  maxradforrange + ' endrad ' + endrad );
          }
        }
        loggedmsg.push('processed ');
        //console.log(...loggedmsg);
      }
      console.log('no of cells ' + cellcount + ' skipped ' + skpd);
    }
    function addradiusentry(radius) {
      if (typeof dotsperrad[radius] != 'undefined') {
        dotsperrad[radius] += 1;
      } else {
        dotsperrad[radius] = 1;
      }
    }
    function getsafeangleforradius(rad) {
      var realdotsize = dotmaxsize;
      var safedistang = Math.atan((realdotsize * 2) / rad);
      return Math.ceil(safedistang * (180 / Math.PI));
    }
    function drawindicator(stdeg, endeg, rad, endrad, skipped) {
      if (stdeg > endeg) endeg += 360;
      var radius = (parseInt(rad) + parseInt(endrad)) / 2;
      var angledeg = (parseInt(stdeg) + parseInt(endeg)) / 2;
      if (angledeg > 360) angledeg -= 360;
      var angle = angledeg * (Math.PI / 180);
      var x = parseInt(centerX + radius * Math.cos(angle));
      var y = parseInt(centerY - radius * Math.sin(angle));
      //console.log(i + ' hash ' + hashval + ' angle ' + angledeg + ' maxradius ' + maxRadius + ' radius ' + radius + ' x:y ' + x + ':' + y);
      //	console.log( ' x:y ' + parseInt(x) + ':' + parseInt(y));
      // Add the div element to the body of the document
    }
    function setpastelcolor(x, pastel) {
      // var dots = document.getElementsByClassName('dot');
      // setTimeout(function(){if (!dots[x].classList.contains('centerdot')) dots[x].style.backgroundColor = pastel;}, 500);
    }
    function removeshake(x) {
      // var dots = document.getElementsByClassName('dot');
      // setTimeout(function(){if (!dots[x].classList.contains('centerdot')) dots[x].classList.remove('shake');}, 1000);
    }
    function addangletoradius(rad, ang) {
      if (positionsrad.has(rad)) {
        var angles = positionsrad.get(rad);
        angles.add(ang);
        positionsrad.set(rad, angles);
      } else {
        var angles = new Set();
        angles.add(ang);
        positionsrad.set(rad, angles);
      }
    }
    function getanglereservecount(angledeg) {
      var count = 10;
      if (angledeg <= maxdiagdeg / 2) {
        count = 15;
      }
      if (angledeg > 180 - maxdiagdeg / 2 && angledeg <= 180 + maxdiagdeg / 2) {
        count = 15;
      }
      if (angledeg > 360 - maxdiagdeg / 2 && angledeg <= 360) {
        count = 15;
      }
      return count;
    }
    function rotateinspace(deg, safeangle, pos) {
      //console.log('in rotateinspace deg ' + deg + ' safe ' + safeangle + ' pos ' + pos);
      var stretch = false;
      var shrink = false;
      if (deg <= maxdiagdeg / 2) {
        deg += safeangle * 2;
      }
      if (deg > maxdiagdeg / 2 && deg <= 180 - maxdiagdeg / 2) {
        if (pos <= 0.5) stretch = true;
        else {
          shrink = true;
        }
        if (deg < 90) deg += safeangle;
        else deg -= safeangle;
      }
      if (deg > 180 - maxdiagdeg / 2 && deg <= 180 + maxdiagdeg / 2) {
        deg += safeangle * 2;
      }
      if (deg > 180 + maxdiagdeg / 2 && deg <= 360 - maxdiagdeg / 2) {
        if (pos <= 0.5) stretch = true;
        else {
          shrink = true;
        }
        deg += safeangle;
      }
      if (deg > 360 - maxdiagdeg / 2 && deg <= 360) {
        deg += safeangle * 2;
        if (pos <= 0.5) stretch = true;
        else {
          shrink = true;
        }
      }
      return {newangledeg: deg, stretch: stretch};
    }
  } // displayRadialText end
  // Hash function
  hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash = hash & hash;
    }
    return hash;
  }
  hashCodeSHA(str) {
    var hashasnum;
    var bitArray;
    if (str.length > 1000) {
      bitArray = sjcl.hash.sha256.hash(str.substring(0, 1000));
    } else {
      bitArray = sjcl.hash.sha256.hash(str);
    }
    var digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
    if (digest_sha256 != null)
      hashasnum = parseInt(
        digest_sha256.substring(
          digest_sha256.length - 10,
          digest_sha256.length,
        ),
        16,
      );
    return {hex: digest_sha256, num: hashasnum};
  }
  getpastelcolor(col) {
    if (rgbmap == null) {
      this.creatergbmapofpastels();
    }
    var pastel = this.findclosestrgbfrommap(col);
    //console.log('Pastel found ' + pastel );
    return pastel;
  }
  async increasedotsize(size, index, length, array) {
    console.log(
      'bfr:',
      array[index].width,
      array[index].height,
      index,
      this.state.filteredContactData[index].scale,
      this.state.filteredContactData[index].name,
    );
    // console.log(parseInt(length*20/100),parseInt(length*30/100),parseInt(length*50/100))
    let prcnt = (length * 10) / 100;
    if (index < parseInt(prcnt * 2)) {
      //   console.log("top 20:",index)
      Animated.timing(this.state.filteredContactData[index].scale, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      this.forceUpdate();
    } else if (parseInt(prcnt * 2) <= index && index < parseInt(prcnt * 5)) {
      //   console.log("top 50:",index,prcnt*5)
      Animated.timing(this.state.filteredContactData[index].scale, {
        toValue: 1.618,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      this.forceUpdate();
    } else {
      console.log('bottom 50:', index);
    }
    // console.log("arraylocs:",this.state.filteredContactData[index],index)
    // this.setState({ updateUIState: false })
    // console.log("aftr:",this.state.FoodsDotsLocations[index].width,this.state.FoodsDotsLocations[index].height)
  }
  async increasefooddotsize(size, index, length, array) {
    console.log('bfr:', array[index].width, array[index].height);
    // console.log(parseInt(length*20/100),parseInt(length*30/100),parseInt(length*50/100))
    let prcnt = (length * 10) / 100;
    if (index < parseInt(prcnt * 2)) {
      //   console.log("top 20:",index)
      array[index].width = new Animated.Value(size * 2);
      array[index].height = new Animated.Value(size * 2);
      this.forceUpdate();
    } else if (parseInt(prcnt * 2) <= index && index < parseInt(prcnt * 5)) {
      //   console.log("top 50:",index,prcnt*5)
      array[index].width = new Animated.Value(size * 1.618);
      array[index].height = new Animated.Value(size * 1.618);
      this.forceUpdate();
    } else {
      console.log('bottom 50:', index);
    }
    // console.log("arraylocs:",this.state.filteredContactData[index],index)
    this.setState({updateUIState: false});
    // console.log("aftr:",this.state.FoodsDotsLocations[index].width,this.state.FoodsDotsLocations[index].height)
  }
  async increaselockdotsize(size, index, length, array) {
    // console.log("bfr:",this.state.FoodsDotsLocations[index].width,this.state.FoodsDotsLocations[index].height)
    // console.log(parseInt(length*20/100),parseInt(length*30/100),parseInt(length*50/100))
    let prcnt = (length * 10) / 100;
    if (index < prcnt * 2) {
      //   console.log("top 20:",index)
      array[index].locations.width = new Animated.Value(size * 2);
      array[index].locations.height = new Animated.Value(size * 2);
    } else if (prcnt * 2 <= index && index < prcnt * 5) {
      //   console.log("top 50:",index,prcnt*5)
      array[index].locations.width = new Animated.Value(size * 1.618);
      array[index].locations.height = new Animated.Value(size * 1.618);
    } else {
      //   console.log("bottom 50:",index)
      array[index].locations.width = new Animated.Value(size * 1.618);
      array[index].locations.height = new Animated.Value(size * 1.618);
    }
    // console.log("arraylocs:",this.state.filteredContactData[index],index)
    this.setState({updateUIState: false});
    // console.log("aftr:",this.state.FoodsDotsLocations[index].width,this.state.FoodsDotsLocations[index].height)
  }
  creatergbmapofpastels() {
    rgbmap = {};
    var pastelcodes = [
      ' F7F6CF ',
      ' B6D8F2 ',
      ' F4CFDF ',
      ' 5784BA ',
      ' 9AC8EB ',
      ' CCD4BF ',
      ' E7CBA9 ',
      ' EEBAB2 ',
      ' F5F3E7 ',
      ' F5E2E4 ',
      ' F5BFD2 ',
      ' E5DB9C ',
      ' D0BCAC ',
      ' BEB4C5 ',
      ' E6A57E ',
      ' 218B82 ',
      ' 9AD9DB ',
      ' E5DBD9 ',
      ' 98D4BB ',
      ' EB96AA ',
      ' C6C9D0 ',
      ' C54B6C ',
      ' E5B3BB ',
      ' C47482 ',
      ' D5E4C3 ',
      ' F9968B ',
      ' F27348 ',
      ' 26474E ',
      ' 76CDCD ',
      ' 2CCED2 ',
      ' B8E0F6 ',
      ' A4CCE3 ',
      ' 37667E ',
      ' DEC4D6 ',
      ' 7B92AA ',
      ' DDF2F4 ',
      ' 84A6D6 ',
      ' 4382BB ',
      ' E4CEE0 ',
      ' A15D98 ',
      ' DC828F ',
      ' F7CE76 ',
      ' E8D6CF ',
      ' 8C7386 ',
      ' 9C9359 ',
      ' F4C815 ',
      ' F9CAD7 ',
      ' A57283 ',
      ' C1D5DE ',
      ' DEEDE6 ',
      ' E9BBB5 ',
      ' E7CBA9 ',
      ' AAD9CD ',
      ' E8D595 ',
      ' 8DA47E ',
      ' CAE7E3 ',
      ' B2B2B2 ',
      ' EEB8C5 ',
      ' DCDBD9 ',
      ' FEC7BC ',
      ' FBECDB ',
      ' F3CBBD ',
      ' 90CDC3 ',
      ' AF8C72 ',
      ' 938F43 ',
      ' B8A390 ',
      ' E6D1D2 ',
      ' DAD5D6 ',
      ' B2B5B9 ',
      ' 8FA2A6 ',
      ' 8EA4C8 ',
      ' C3B8AA ',
      ' DEDCE4 ',
      ' DB93A5 ',
      ' C7CDC5 ',
      ' 698396 ',
      ' A9C8C0 ',
      ' DBBC8E ',
      ' AE8A8C ',
      ' 7C98AB ',
      ' C2D9E1 ',
      ' D29F8C ',
      ' D9D3D2 ',
      ' 81B1CC ',
      ' FFD9CF ',
      ' C6AC85 ',
      ' D9C2BD ',
      ' A2C4C6 ',
      ' 82B2B8 ',
      ' 874741 ',
      ' CA9C95 ',
      ' 40393E ',
      ' E5E4E5 ',
      ' 897C87 ',
      ' 46302B ',
      ' 76504E ',
      ' D3CCCA ',
      ' A37E7E ',
      ' 86736C ',
      ' AD192A ',
      ' E4B78F ',
      ' F1E8EA ',
      ' D88D96 ',
      ' EAB1B9 ',
      ' F38C10 ',
      ' A7763B ',
      ' CCD7D8 ',
      ' 4C482E ',
      ' D2B6BA ',
      ' BE3F12 ',
      ' 7DB0CD ',
      ' C0B5AB ',
      ' 79553F ',
      ' 91BA96 ',
      ' A65111 ',
      ' DDAA00 ',
      ' 7C5D3D ',
      ' 85AAAA ',
      ' 173F4E ',
      ' D82315 ',
      ' 2F1710 ',
      ' 425164 ',
      ' DABB96 ',
      ' 899FB6 ',
      ' DBB657 ',
      ' 86553F ',
      ' C8C2D0 ',
      ' E45C54 ',
      ' 90A375 ',
      ' F9BB9D ',
      ' FFDA43 ',
      ' 756382 ',
      ' E2C274 ',
      ' 9CA8B5 ',
      ' FFE75D ',
      ' D24970 ',
      ' 32657C ',
      ' 669BB7 ',
      ' CF8145 ',
      ' 753516 ',
      ' AF6F33 ',
      ' 9DB4BA ',
      ' 210E0D ',
      ' E2D2C1 ',
      ' CA8459 ',
      ' DDB396 ',
      ' DDDFE3 ',
      ' 422523 ',
      ' 954D34 ',
      ' 843619 ',
      ' B87730 ',
      ' 1B2625 ',
      ' DAD0CE ',
      ' 748991 ',
      ' 64A532 ',
      ' B09647 ',
      ' 450309 ',
      ' DEE2E3 ',
      ' 7B5536 ',
      ' 446C04 ',
      ' F8DF96 ',
      ' 977D77 ',
      ' 301F1A ',
      ' 5E301F ',
      ' 8E3229 ',
      ' AEBB35 ',
      ' 2F1D16 ',
      ' D0BDAA ',
      ' A37537 ',
      ' FF415B ',
      ' BC7F37 ',
      ' 352C20 ',
      ' EAE8E8 ',
      ' 64AA71 ',
      ' F64900 ',
      ' CB8A2D ',
      ' 262416 ',
      ' DDDDDE ',
      ' 90B274 ',
      ' B08D7E ',
      ' 6C74A4 ',
      ' BBB9BC ',
      ' 5E2424 ',
      ' 95BB9A ',
      ' 652F20 ',
      ' 74C85D ',
      ' 2D3538 ',
      ' 57818A ',
      ' D54C2E ',
      ' D09150 ',
      ' DEBD9B ',
      ' 3C2320 ',
      ' 955132 ',
      ' EBEBEF ',
      ' B08138 ',
      ' 784928 ',
      ' 382918 ',
      ' DDD4D3 ',
      ' AE8A75 ',
      ' F08E88 ',
      ' 422D09 ',
      ' 468F5E ',
      ' AC7C36 ',
      ' E3E2DF ',
      ' E1A624 ',
      ' 317AC1 ',
      ' 384454 ',
      ' D4D3DC ',
      ' AD956B ',
      ' F38C10 ',
      ' A7763B ',
      ' CCD7D8 ',
      ' 4C482E ',
      ' D2B6BA ',
      ' C5853D ',
      ' 99372E ',
      ' DAD4D9 ',
      ' 391C19 ',
      ' B27E83 ',
      ' 4F3B2B ',
      ' 7C6619 ',
      ' B8B5AD ',
      ' BE0309 ',
      ' 93C1D5 ',
    ];
    for (var c = 0; c < pastelcodes.length; c++) {
      var rgbobj = this.hexToRgb1(pastelcodes[c].trim());
      if (rgbobj != null) {
        rgbmap[pastelcodes[c].trim()] = rgbobj;
      }
    }
    //console.log('RGBMAP created'  );
  }
  findclosestrgbfrommap(col) {
    //document.getElementById('b64').style.backgroundColor = col; /// Remove this LINE
    col = col.replace('#', '');
    var rgbobjforcol = this.hexToRgb1(col);
    //console.log('Looking for the closest color for ' + col + ' ' + JSON.stringify(rgbobjforcol));
    var distance = -1;
    var closestcolor;
    const rgbkeys = Object.keys(rgbmap);
    rgbkeys.forEach((key, index) => {
      //console.log(`${key}: ${rgbmap[key]}`);
      var thisdist = this.calculatedistance(rgbobjforcol, rgbmap[key]);
      if (distance < 0 || thisdist < distance) {
        if (distance > 0) {
          //document.getElementById('json').style.backgroundColor = '#'+key; /// Remove this LINE
          closestcolor = '#' + key;
          //console.log('Idx ' + index + 'Closest  ' + closestcolor + ' distance ' + thisdist);
        }
        distance = thisdist;
      }
    });
    return closestcolor;
  }
  calculatedistance(obj1, obj2) {
    return (
      Math.pow(obj1.r - obj2.r, 2) +
      Math.pow(obj1.g - obj2.g, 2) +
      Math.pow(obj1.b - obj2.b, 2)
    );
  }
  hexToRgb1(hex) {
    // better version
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
  //to here
  handleBackButtonClick = async () => {
    console.error('back pressed');
    if (this.state.UnlockScreenUI == true) {
      if (isApplLocked == true) {
      } else {
        if (this.state.isValidatingLock == true) {
          this.setState({
            UnlockScreenUI: false,
            showView: true,
            enableLockProcessModal: false,
          });
        } else {
          temp_password = '';
          this.setState({
            UnlockScreenUI: false,
            showView: true,
            enableLockProcessModal: false,
          });
          this.forceUpdate();
        }
      }
    } else if (this.state.showView == true) {
      if (this.state.welcomescreenModal == true) {
        BackHandler.exitApp();
      } else {
        BackHandler.exitApp();
      }
    } else if (this.state.showPic == true) {
      BackHandler.exitApp();
      // this.setState({ showPic: false, showView: true })
      // return true;
    } else if (this.state.displayFlake == true) {
      if (this.state.siteDetailsModal == true) {
        this.setState({siteDetailsModal: false});
      } else {
        this.setState({
          displayFlake: false,
          showView: true,
          homepage: 'flex',
          showLoader: 'none',
          showPic: false,
        });
      }
      return true;
      //  BackHandler.exitApp();
    } else if (this.state.showchatUI == true) {
      this.setState({preventFurtherClick: false});
      if (
        this.state.showReactionsModal == true ||
        this.state.selectedMessages.length > 0
      ) {
        this.setState({
          selectedMessages: [],
          showReactionsModal: false,
          modalPosition: {x: 0, y: 0},
        });
        // return false;
      } else {
        this.setOnlineStatus(confusername, 'ON');
        console.log(this.state.tempMsgArr);
        this.setState({
          showchatUI: false,
          showView: true,
          chatmessages: [],
          selectedMessages: [],
          showReactionsModal: false,
        });
        this.setState({canOfferP2P: true, canReceiveP2P: true});
        // this.setState({ showchatUI: false, showView: true})
        let convIndex = this.state.tempMsgArr.findIndex(
          object => object.key === this.state.chatConvId,
        );
        if (convIndex != -1) {
          this.saveChatInFile(
            this.state.chatConvId.substring(0, 8),
            this.state.tempMsgArr[convIndex],
            convIndex,
          );
          // this.state.tempMsgArr[convIndex].data = [];
        }
        this.setState({
          connectionOnlineLeft: new Animated.Value(0),
          connectionOnlineTop: new Animated.Value(0),
          connectionOnlineWidth: new Animated.Value(5),
          connectionOnlineHeight: new Animated.Value(5),
        });
        this.setState({chatUserStatus: ''});
        this.setState({connectionOnlineOpacity: new Animated.Value(0.3)});
        this.sendUserStatus('Left');
        let conversationIndex = allConversationArr.findIndex(
          p => p.convid == this.state.chatConvId,
        );
        this.handleP2PClose(conversationIndex);
        this.setState({
          chatPhoneNumber: '',
          chatConvId: 'hb',
          chatName: 'Chat',
          chatIndex: null,
        });
        // this.removeuserfromconversation();
        // return true;
      }
      return true;
    } else if (this.state.NotesAppScreen == true) {
      if (this.state.NoteDetailModal == true) {
        this.setState({NoteDetailModal: false});
      } else {
        this.setState({
          NotesAppScreen: false,
          DisplayAddNoteDialog: 'none',
          showView: true,
          searchnotes: '',
        });
      }
      return true;
    } else if (this.state.FoodsAppScreen == true) {
      if (this.state.FoodDetailModal == true) {
        this.setState({FoodDetailModal: false});
      } else {
        this.setState({
          FoodsAppScreen: false,
          DisplayAddFoodDialog: 'none',
          showView: true,
        });
      }
      return true;
    }
    if (this.state.authImages.length > 0) {
      for (let i = 0; i < this.state.authImages.length; i++) {
        const extension = Platform.OS === 'android' ? 'file://' : '';
        console.log(`${extension}${RNFS.CachesDirectoryPath}/${i}.jpg`);
        await RNFS.unlink(this.state.authImages[i])
          .then(() => {
            console.log('FILE DELETED:', this.state.authImages[i]);
            RNFS.scanFile(`${extension}${RNFS.CachesDirectoryPath}/${i}.jpg`)
              .then(() => {
                console.log('scanned');
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err.message);
          });
      }
      this.state.authImages = await [];
    }
  };
  goToPreviousPage = async () => {
    console.error('go back');
    if (this.state.showView == true) {
      if (this.state.welcomescreenModal == true) {
        BackHandler.exitApp();
      } else if (this.state.showInvitePopup == true) {
        this.setState({showInvitePopup: false});
      } else {
        BackHandler.exitApp();
      }
    } else if (this.state.showPic == true) {
      BackHandler.exitApp();
      // this.setState({ showPic: false, showView: true })
      // return true;
    } else if (this.state.displayFlake == true) {
      this.setState({
        showPic: false,
        showView: true,
        homepage: 'flex',
        showLoader: 'none',
        displayFlake: false,
      });
      return true;
      //  BackHandler.exitApp();
    } else if (this.state.showchatUI == true) {
      this.setState({preventFurtherClick: false});
      if (
        this.state.showReactionsModal == true ||
        this.state.selectedMessages.length > 0
      ) {
        this.setState({
          selectedMessages: [],
          showReactionsModal: false,
          modalPosition: {x: 0, y: 0},
        });
        // return false
      } else {
        this.setOnlineStatus(confusername, 'ON');
        console.log(this.state.tempMsgArr);
        // this.setState({ showchatUI: false, showView: true})
        let convIndex = this.state.tempMsgArr.findIndex(
          object => object.key === this.state.chatConvId,
        );
        if (convIndex != -1) {
          this.saveChatInFile(
            this.state.chatConvId.substring(0, 8),
            this.state.tempMsgArr[convIndex],
            convIndex,
          );
          // this.state.tempMsgArr[convIndex].data = [];
        }
        this.setState({
          showchatUI: false,
          showView: true,
          chatmessages: [],
          selectedMessages: [],
          showReactionsModal: false,
        });
        this.setState({canOfferP2P: true, canReceiveP2P: true});
        this.setState({
          connectionOnlineLeft: new Animated.Value(0),
          connectionOnlineTop: new Animated.Value(0),
          connectionOnlineWidth: new Animated.Value(5),
          connectionOnlineHeight: new Animated.Value(5),
        });
        this.setState({chatUserStatus: ''});
        this.setState({connectionOnlineOpacity: new Animated.Value(0.3)});
        this.sendUserStatus('Left');
        let conversationIndex = allConversationArr.findIndex(
          p => p.convid == this.state.chatConvId,
        );
        this.handleP2PClose(conversationIndex);
        this.setState({
          chatPhoneNumber: '',
          chatConvId: 'pp',
          chatName: 'Chat',
          chatIndex: null,
        });
        // this.removeuserfromconversation();
        // return true;
      }
      return true;
    } else if (this.state.NotesAppScreen == true) {
      this.setState({
        showView: true,
        DisplayAddNoteDialog: 'none',
        NotesAppScreen: false,
        NoteDetailModal: false,
        searchnotes: '',
      });
      return true;
    } else if (this.state.FoodsAppScreen == true) {
      this.setState({
        showView: true,
        DisplayAddFoodDialog: 'none',
        FoodsAppScreen: false,
        FoodDetailModal: false,
      });
      return true;
    }
    if (this.state.authImages.length > 0) {
      // for (let i = 0; i < this.state.authImages.length; i++) {
      //     const extension = (Platform.OS === 'android') ? 'file://' : ''
      //     console.log(`${extension}${RNFS.CachesDirectoryPath}/${i}.jpg`)
      //     await RNFS.unlink(this.state.authImages[i]).then(() => {
      //         console.log('FILE DELETED:', this.state.authImages[i]);
      //         RNFS.scanFile(`${extension}${RNFS.CachesDirectoryPath}/${i}.jpg`)
      //             .then(() => {
      //                 console.log('scanned');
      //             })
      //             .catch(err => {
      //                 console.log(err);
      //             });
      //     })
      //         .catch((err) => {
      //             console.log(err.message);
      //         });
      // }
      this.state.authImages = [];
    }
  };
  showSiteDetailsModal = (data, i) => {
    this.state.sitedialogpos.width = parseInt(
      JSON.stringify(vaultPosArray[i].width),
    );
    this.state.sitedialogpos.height = parseInt(
      JSON.stringify(vaultPosArray[i].height),
    );
    this.state.sitedialogpos.top = parseInt(
      JSON.stringify(vaultPosArray[i].zpc),
    );
    this.state.sitedialogpos.left = parseInt(
      JSON.stringify(vaultPosArray[i].ypc),
    );
    this.forceUpdate();
    console.log(this.state.sitedialogpos);
    console.log(data);
    this.state.siteUsername = data[1]; //data.siteuser;
    this.state.siteUsername.forEach(elm => {
      elm.showpassword = new Animated.Value(0);
    });
    console.log(this.state.siteUsername);
    // this.state.sitePassword = data.sitepwd;
    this.state.siteUrll = data[0];
    this.setState({siteDetailsModal: true});
  };
  showPasswordDialog = i => {
    try {
      if (i < this.state.siteUsername.length) {
        Animated.timing(this.state.siteUsername[i].showpassword, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: false,
        }).start();
        setTimeout(() => {
          Animated.timing(this.state.siteUsername[i].showpassword, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }).start();
        }, 1000);
      }
    } catch (e) {
      console.log('show password dialog:', e);
    }
  };
  handlePhoneClick = () => {
    this.setState({
      disableAccountButton: true,
      disablePhoneButton: false,
      accountButtonColor: '#D0D0D0',
      phoneButtonColor: '#4682B4',
      lockfontcolor: '#989898',
      vaultfontcolor: '#989898',
      lockIconType: require('../Screens/lockgray.png'),
      vaultIconType: require('../Screens/vault.png'),
    });
    // setTimeout(() => {
    //     this.setState({ welcomescreenModal: false, isPhoneModalVisible: true })
    // }, 2000);
  };
  handleAccountClick = () => {
    this.setState({
      disablePhoneButton: true,
      disableAccountButton: false,
      phoneButtonColor: '#D0D0D0',
      accountButtonColor: '#4682B4',
      lockfontcolor: '#444444',
      vaultfontcolor: '#444444',
      lockIconType: require('../Screens/lockblack.png'),
      vaultIconType: require('../Screens/vaultnew.png'),
    });
    // setTimeout(() => {
    //     // this.setState({ welcomescreenModal: false, showView: true })
    //     this.setState({ welcomescreenModal: false, createAccountModal: true })
    // }, 1000);
  };
  handleOKClick = () => {
    if (this.state.disableAccountButton == true) {
      this.setState({welcomescreenModal: false, isPhoneModalVisible: true});
    } else if (this.state.disablePhoneButton == true) {
      this.setState({welcomescreenModal: false, createAccountModal: true});
    } else {
      alert('Please choose any one option.');
    }
  };
  saveConversationBigData = async (resizedimg, conid, datatype, msgid) => {
    // console.log("resizeimg:",resizedimg)
    let xhr;
    xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', 'https://newauth.io/newauth/api/saveconvbigdata');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      console.log('savebigdataresp:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        console.log('savebigdataresp:', res);
        if (datatype == 'image') {
          resizedimg[0].image = res;
          this.sendMessageOffline(resizedimg, conid, msgid);
        } else if (datatype == 'doc') {
          resizedimg[0].text = res;
          this.sendMessageOffline(resizedimg, conid, msgid);
        }
        //.... YOU GET THE ID FOR THIS CONTENT.... SAVE IT
      } else if (
        xhr.readyState == 4 &&
        (xhr.status == 500 || xhr.status == 400 || xhr.status == 404)
      ) {
        this.setState({isPending: true});
        showMessage({
          message: 'Unable to send media right now. Please try again later.',
          type: 'danger',
          duration: 3000,
          position: 'center',
        });
      } else if (xhr.readyState == 4 && xhr.status == 413) {
        this.setState({isPending: true});
        showMessage({
          message: 'Unable to send image with size more than 10 mb.',
          type: 'danger',
          duration: 3000,
          position: 'center',
        });
      }
    };
    if (datatype == 'image') {
      var reqpacket = JSON.stringify({
        section: 'conv-big-data',
        data: resizedimg[0].image,
      });
      xhr.send(reqpacket);
      console.log(reqpacket);
    } else if (datatype == 'doc') {
      var reqpacket = JSON.stringify({
        section: 'conv-big-data',
        data: resizedimg[0].text,
      });
      xhr.send(reqpacket);
      // console.log(reqpacket)
    }
    //alert('sending save packet ' + reqpacket);
  };
  getConversationBigData = async (
    pendingmsg,
    convid,
    nameconvid,
    sameuser,
    idtype,
    fcdindex,
  ) => {
    let xhr;
    xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    if (idtype == 'image') {
      xhr.open(
        'GET',
        'https://newauth.io/newauth/api/getconvbigdata/' + pendingmsg[0].image,
      );
    } else if (idtype == 'doc') {
      xhr.open(
        'GET',
        'https://newauth.io/newauth/api/getconvbigdata/' + pendingmsg[0].text,
      );
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      console.log('getbigdataresp:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        console.log('getbigdataresp:', res.length);
        if (idtype == 'image') {
          this.deleteConversationBigData(pendingmsg[0].image);
          pendingmsg[0].image = res;
          this.receiveImageFile(
            pendingmsg,
            convid,
            nameconvid,
            sameuser,
            fcdindex,
          );
        } else if (idtype == 'doc') {
          this.deleteConversationBigData(pendingmsg[0].text);
          pendingmsg[0].text = res;
          this.receiveDocFile(
            pendingmsg,
            convid,
            nameconvid,
            sameuser,
            fcdindex,
          );
        }
        // this.deleteConversationBigData(imageid);
        //.... YOU GOT DATA BACK
      } else if (
        xhr.readyState == 4 &&
        (xhr.status == 500 || xhr.status == 400 || xhr.status == 404)
      ) {
        showMessage({
          message:
            'Unable to download media right now. Please try again later.',
          type: 'danger',
          duration: 3000,
          position: 'center',
        });
        return 'ERROR';
      }
    };
    //console.log('Calling gettopics..' + topicpart );
    xhr.send(null);
  };
  deleteConversationBigData = async imageid => {
    let xhr;
    xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open(
      'DELETE',
      'https://newauth.io/newauth/api/deleteconvbigdata/' + imageid,
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      console.log('deletebigdataresp:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        console.log('deletebigdataresp:', res);
        /// SHOULD GET DELETE CONFIRMATION
      }
    };
    //console.log('Calling gettopics..' + topicpart );
    xhr.send(null);
  };
  getConversation = async (cId, authorname, shownotification) => {
    let xhr;
    xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', 'https://newauth.io/newauth/api/getconversations/' + cId);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    //    let reqpacket = JSON.stringify({
    //    conversationID: cId,
    //      });
    xhr.onreadystatechange = async () => {
      console.log('getconv:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        let res = JSON.parse(xhr.responseText);
        // console.log(res)
        pendingmsgsarr = res;
        console.log('pending msgs:', Object.keys(pendingmsgsarr));
        console.log('pending array:', Object.keys(pendingmsgsarr).length);
        if (Object.keys(pendingmsgsarr).length > 0) {
          try {
            for (var key in pendingmsgsarr) {
              // need to add these pending msgs in tempmsgarr.
              if (shownotification == false) {
                if (key == this.state.chatConvId) {
                  console.log(
                    'id matched',
                    key,
                    this.state.chatConvId,
                    flakeTousernameAuthor,
                  );
                  for (let i = 0; i < pendingmsgsarr[key].length; ) {
                    // console.log("i:", i, pendingmsgsarr[key][i].user.chatType)
                    if (pendingmsgsarr[key][i].author == authorname) {
                      console.log(
                        'right num:',
                        authorname,
                        pendingmsgsarr[key].length,
                      );
                      try {
                        const pendingmsg = JSON.parse(
                          pendingmsgsarr[key][i].message,
                        );
                        console.log(
                          'msg number:' + i,
                          pendingmsg[0].user.chatType,
                          pendingmsgsarr[key].length,
                        );
                        pendingmsg[0]._id = Math.random(1000).toString();
                        pendingmsg[0].user._id = 2;
                        const sameuser =
                          pendingmsg[0].user.name === this.state.chatConvId;
                        let nameconvid = pendingmsg[0].user.name;
                        pendingmsg[0].user.name = this.state.chatName;
                        let falseuserindex;
                        this.state.filteredContactData.forEach(
                          (elmnt, index) => {
                            if (elmnt.convid == nameconvid) {
                              falseuserindex = index;
                            }
                          },
                        );
                        if (pendingmsg[0].user.chatType == 'image') {
                          this.getConversationBigData(
                            pendingmsg,
                            this.state.chatConvId.substring(0, 8),
                            nameconvid,
                            sameuser,
                            'image',
                            falseuserindex,
                          );
                          // if(getdata == "ERROR"){
                          // }else{
                          //     pendingmsg[0].image = getdata;
                          //     console.log("getdata,text:",getdata,pendingmsg[0].image)
                          //   this.receiveImageFile(pendingmsg, this.state.chatConvId.substring(0, 8), nameconvid, sameuser)
                          // }
                        } else if (pendingmsg[0].user.chatType == 'video') {
                          this.receiveVideoFile(
                            pendingmsg,
                            this.state.chatConvId.substring(0, 8),
                            nameconvid,
                            sameuser,
                            falseuserindex,
                          );
                        } else if (pendingmsg[0].user.chatType == 'document') {
                          this.getConversationBigData(
                            pendingmsg,
                            this.state.chatConvId.substring(0, 8),
                            nameconvid,
                            sameuser,
                            'doc',
                            falseuserindex,
                          );
                          // if(getdata == "ERROR"){
                          // }else{
                          //     pendingmsg[0].text = getdata;
                          //     console.log("getdata,text:",getdata,pendingmsg[0].text)
                          //     this.receiveDocFile(pendingmsg, this.state.chatConvId.substring(0, 8), nameconvid, sameuser)
                          // }
                        } else {
                          // this.setState({ chatmessages: GiftedChat.append(pendingmsg, this.state.chatmessages) });
                          this.setState({
                            chatmessages: GiftedChat.append(
                              this.state.chatmessages,
                              pendingmsg,
                            ),
                          });
                          // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
                          // this.state.tempMsgArr.push(pendingmsg[0]);
                          await this.saveTempMessages(pendingmsg, nameconvid);
                        }
                      } catch (e) {
                        console.log('pending msg parse error:', e);
                      }
                      i++;
                    } else {
                      console.log(
                        'wrong num',
                        convIndex,
                        authorname,
                        pendingmsgsarr[key].length,
                      );
                      i++;
                    }
                    if (i == pendingmsgsarr[key].length) {
                      this.deleteConversation(
                        this.state.chatConvId,
                        authorname,
                      );
                      console.log('error here 1:', i);
                      pendingmsgsarr = [];
                      console.log('error here 2:', i);
                    }
                  }
                } else {
                  console.log('id not matched', key, this.state.chatConvId);
                }
              } else {
                this.state.filteredContactData.forEach(async (elem, index) => {
                  if (elem.tag == 'conversation') {
                    if (key == elem.convid) {
                      if (pendingmsgsarr[key].length > 0) {
                        for (let i = 0; i < pendingmsgsarr[key].length; i++) {
                          if (pendingmsgsarr[key][i].author == 'SYSTEM') {
                          } else if (
                            pendingmsgsarr[key][i].author != authorname
                          ) {
                            console.log(
                              'pendingauthormsg:',
                              pendingmsgsarr[key][i],
                            );
                            if (
                              pendingmsgsarr[key][i].message != 'sdp message'
                            ) {
                              let parsemsg = JSON.parse(
                                pendingmsgsarr[key][i].message,
                              );
                              let date = new Date(parsemsg[0].createdAt);
                              let timee = await this.changeTimeFormat(date);
                              console.log('msg time:', timee, typeof parsemsg);
                              // let timee = this.getMessageAge(timeee)
                              if (parsemsg[0].user.chatType == 'image') {
                                parsemsg[0].text = 'image';
                              } else if (parsemsg[0].user.chatType == 'video') {
                                parsemsg[0].text = 'video';
                              } else if (parsemsg[0].user.chatType == 'doc') {
                                parsemsg[0].text = 'document';
                              }
                              let pendingindex =
                                pendingmessagesnotificationarray
                                  .map(e => e.index)
                                  .indexOf(index);
                              if (pendingindex == -1) {
                                elem.color =
                                  this.state.dotColorLocation[index].col;
                                // console.log("4",elem.color,elem.name)
                                // this.forceUpdate();
                                pendingmessagesnotificationarray.push({
                                  index: index,
                                  time: timee,
                                  count: 1,
                                  text: parsemsg[0].text,
                                });
                              } else {
                                let countt =
                                  pendingmessagesnotificationarray[pendingindex]
                                    .count + 1;
                                pendingmessagesnotificationarray[pendingindex] =
                                  {
                                    index: index,
                                    time: timee,
                                    count: countt,
                                    text: parsemsg[0].text,
                                  };
                              }
                              console.log('debugtimer1:', debugtimer);
                            }
                          } else {
                            elem.color = 'gray';
                            this.forceUpdate();
                          }
                        }
                      } else {
                        // console.log("1",elem.color,elem.name)
                        elem.color = 'gray';
                        this.forceUpdate();
                      }
                    } else {
                      // console.log("2",elem.color,elem.name)
                      if (
                        pendingmessagesnotificationarray
                          .map(e => e.index)
                          .indexOf(index) == -1
                      ) {
                        elem.color = 'gray';
                        this.forceUpdate();
                      }
                    }
                  } else if (elem.tag == 'invitation') {
                  } else {
                    // console.log("3",elem.color,elem.name)
                    elem.color = 'gray';
                    this.forceUpdate();
                  }
                });
              }
            }
            if (pendingmessagesnotificationarray.length > 0) {
              console.log(
                'notisarray:',
                pendingmessagesnotificationarray,
                pendingmessagesnotificationarray[0].count,
              );
              if (pendingmessagesnotificationarray.length == 1) {
                if (pendingmessagesnotificationarray[0].count > 1) {
                  await this.displayNotifications(
                    `${
                      this.state.filteredContactData[
                        pendingmessagesnotificationarray[0].index
                      ].name
                    }.   ${pendingmessagesnotificationarray[0].text.substring(
                      0,
                      20,
                    )} and ${
                      pendingmessagesnotificationarray[0].count - 1
                    } other messages.   ${
                      pendingmessagesnotificationarray[0].time
                    }`,
                    '',
                  );
                } else {
                  await this.displayNotifications(
                    `${
                      this.state.filteredContactData[
                        pendingmessagesnotificationarray[0].index
                      ].name
                    }.   ${pendingmessagesnotificationarray[0].text.substring(
                      0,
                      20,
                    )}.   ${pendingmessagesnotificationarray[0].time}`,
                    '',
                  );
                }
              } else {
                var countmsgs = 0;
                pendingmessagesnotificationarray.forEach(elm => {
                  countmsgs = countmsgs + elm.count;
                });
                await this.displayNotifications(
                  `${
                    this.state.filteredContactData[
                      pendingmessagesnotificationarray[0].index
                    ].name
                  } and others sent you ${countmsgs} messages. ${
                    pendingmessagesnotificationarray[
                      pendingmessagesnotificationarray.length - 1
                    ].time
                  } ago`,
                  '',
                );
              }
            }
          } catch (e) {
            console.log('get conversation pending msg error:', e);
          }
        }
      }
    };
    xhr.send(null);
    console.log('calling getconv api');
  };
  deleteConversation = (conid, authorname) => {
    let xhr;
    xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open(
      'POST',
      'https://newauth.io/newauth/api/deleteconversationmessages',
    );
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    let reqpacket = JSON.stringify({
      conversationID: conid,
      author: authorname,
    });
    console.log('req pckt:', reqpacket);
    xhr.onreadystatechange = () => {
      console.log('dlt msg', xhr.readyState, xhr.status);
      console.log('dlt msg resp:', xhr.responseText);
    };
    xhr.send(reqpacket);
  };
  localDescCreated = (desc, index) => {
    console.log('setting local desc  ' + desc, this.state.username, index);
    console.log('state:', allConversationArr[index].clientPeer.signalingState);
    allConversationArr[index].clientPeer.setLocalDescription(desc).then(() => {
      console.log('local desc set on client.');
      // this.sendMessage(allConversationArr[index].clientPeer.localDescription, allConversationArr[index].convid);
      console.log(allConversationArr[index]);
    }, this.onError);
  };
  remoteDescCreated = (desc, index) => {
    console.log('setting local desc  ' + desc, this.state.username, index);
    console.log('state:', allConversationArr[index].remotePeer.signalingState);
    if (
      allConversationArr[index].remotePeer.signalingState ===
      'have-remote-offer'
    ) {
      allConversationArr[index].remotePeer
        .setLocalDescription(desc)
        .then(() => {
          console.log('local desc set on remote.');
          // this.sendMessage(allConversationArr[index].remotePeer.localDescription, allConversationArr[index].convid);
          console.log(allConversationArr[index]);
        }, this.onError);
    }
  };
  sendMessage = (mess, cId) => {
    let confpostmsgconnection = null;
    // if(confpostmsgconnection==null){
    confpostmsgconnection = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    confpostmsgconnection.open(
      'POST',
      'https://newauth.io/newauth/api/addmessagetoconversation',
    );
    confpostmsgconnection.withCredentials = true;
    confpostmsgconnection.setRequestHeader('Content-Type', 'application/json');
    // }
    // AsyncStorage.getItem('verifiedphone').then(asyncStorage => {
    // console.log("verified num:" + asyncStorage)
    // num = asyncStorage;
    if (loggedInuserType == 'flake') {
      var reqpacket = JSON.stringify({
        sender: {flake: confusername}, // { phones: [num] }
        message: 'sdp message',
        sdp: JSON.stringify(mess),
        // type:mess.type,
        conversationID: cId,
        messagecreatetime: new Date().toUTCString(),
        permanent: 'false',
      });
    } else if (loggedInuserType == 'phone') {
      var reqpacket = JSON.stringify({
        sender: {phones: [confusername]},
        message: 'sdp message',
        sdp: JSON.stringify(mess),
        // type:mess.type,
        conversationID: cId,
        messagecreatetime: new Date().toUTCString(),
        permanent: 'false',
      });
    }
    // reqpacket=reqpacket.replace(/"(\w+)"\s*:/g, '$1:');
    console.log(reqpacket);
    //   if(this.state.showchatUI==false){
    confpostmsgconnection.send(reqpacket);
    let file_path = RNFetchBlob.fs.dirs.DownloadDir + '/sendsdp' + '.txt';
    // RNFetchBlob.fs.writeFile(file_path, JSON.stringify(reqpacket), 'utf8').catch((e) => console.log("save file error:", e))
    //   }
    // });
    confpostmsgconnection.onreadystatechange = () => {
      console.log(
        'sdp response:',
        confpostmsgconnection.responseText,
        confpostmsgconnection.readyState,
        confpostmsgconnection.status,
      );
      //  this.sendMessage(message)
      if (
        confpostmsgconnection.readyState == 4 &&
        confpostmsgconnection.status == 200
      ) {
        this.setState({
          connectionOnlineRings: this.state.connectionOnlineRings + 1,
          chatUserStatus: 'Joining',
        });
        Animated.timing(this.state.connectionOnlineScale, {
          toValue: this.state.connectionOnlineRings + 2,
          duration: 2000,
          useNativeDriver: false,
        }).start();
      } else if (
        confpostmsgconnection.readyState == 4 &&
        confpostmsgconnection.status == 500
      ) {
        console.log(reqpacket);
        confpostmsgconnection.send(reqpacket);
      }
      this.setState({roomID: '98'});
    };
  };
  sendMessageOffline = (mess, cId, msgid) => {
    let confpostmsgconnection = null;
    // if(confpostmsgconnection==null){
    confpostmsgconnection = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    confpostmsgconnection.open(
      'POST',
      'https://newauth.io/newauth/api/addmessagetoconversation',
    );
    confpostmsgconnection.withCredentials = true;
    confpostmsgconnection.setRequestHeader('Content-Type', 'application/json');
    // }
    confpostmsgconnection.onreadystatechange = () => {
      console.log(
        'offline msg resp:',
        confpostmsgconnection.readyState,
        confpostmsgconnection.status,
      );
      if (
        confpostmsgconnection.readyState == 4 &&
        confpostmsgconnection.status == 200
      ) {
        console.log(confpostmsgconnection.responseText);
        if (mess[0].user.chatType != 'text') {
          this.handlePendingMessages(msgid);
        }
      } else if (
        confpostmsgconnection.readyState == 4 &&
        confpostmsgconnection.status == 0
      ) {
        AsyncStorage.getItem('pendingmessages').then(asyncSt => {
          if (asyncSt != null) {
            let msgarr = [];
            msgarr = JSON.parse(asyncSt);
            msgarr.push({id: cId, msg: mess});
            AsyncStorage.setItem('pendingmessages', JSON.stringify(msgarr));
          } else {
            AsyncStorage.setItem(
              'pendingmessages',
              JSON.stringify([{id: cId, msg: mess, msgid: mess[0]._id}]),
            );
          }
        });
      } else if (
        confpostmsgconnection.readyState == 4 &&
        confpostmsgconnection.status == 500
      ) {
        AsyncStorage.getItem('pendingmessages').then(asyncSt => {
          if (asyncSt != null) {
            let msgarr = [];
            msgarr = JSON.parse(asyncSt);
            msgarr.push({id: cId, msg: mess});
            AsyncStorage.setItem('pendingmessages', JSON.stringify(msgarr));
          } else {
            AsyncStorage.setItem(
              'pendingmessages',
              JSON.stringify([{id: cId, msg: mess, msgid: mess[0]._id}]),
            );
          }
        });
      } else if (
        confpostmsgconnection.readyState == 4 &&
        confpostmsgconnection.status == 400
      ) {
        AsyncStorage.getItem('pendingmessages').then(asyncSt => {
          if (asyncSt != null) {
            let msgarr = [];
            msgarr = JSON.parse(asyncSt);
            msgarr.push({id: cId, msg: mess});
            AsyncStorage.setItem('pendingmessages', JSON.stringify(msgarr));
          } else {
            AsyncStorage.setItem(
              'pendingmessages',
              JSON.stringify([{id: cId, msg: mess, msgid: mess[0]._id}]),
            );
          }
        });
      }
    };
    // AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
    //     if (asyncStorageRes == null) {
    //         AsyncStorage.getItem('verifiedphone').then(asyncStorage => {
    //             console.log("verified num:" + asyncStorage)
    //             let num = asyncStorage;
    //             var reqpacket = JSON.stringify({
    //                 sender: { phones: [num] },
    //                 author: num,
    //                 message: JSON.stringify(mess),
    //                 conversationID: cId,
    //                 messagecreatetime: new Date().toUTCString(),
    //                 permanent: 'false'
    //             });
    //             confpostmsgconnection.send(reqpacket);
    //             // console.log(reqpacket);
    //         });
    //     }
    //     else {
    //         let num = asyncStorageRes;
    //         var reqpacket = JSON.stringify({
    //             sender: { flake: num },
    //             author: num,
    //             message: JSON.stringify(mess),
    //             conversationID: cId,
    //             messagecreatetime: new Date().toUTCString(),
    //             permanent: 'false'
    //         });
    //         confpostmsgconnection.send(reqpacket);
    //         // console.log(reqpacket);
    //     }
    // });
    if (loggedInuserType == 'phone') {
      var reqpacket = JSON.stringify({
        sender: {phones: [confusername]},
        author: confusername,
        message: JSON.stringify(mess),
        conversationID: cId,
        messagecreatetime: new Date().toUTCString(),
        permanent: 'false',
      });
      confpostmsgconnection.send(reqpacket);
    } else {
      var reqpacket = JSON.stringify({
        sender: {flake: confusername},
        author: confusername,
        message: JSON.stringify(mess),
        conversationID: cId,
        messagecreatetime: new Date().toUTCString(),
        permanent: 'false',
      });
      confpostmsgconnection.send(reqpacket);
    }
    // confpostmsgconnection.onreadystatechange = () => {
    //     console.log("offline message response:", confpostmsgconnection.responseText, confpostmsgconnection.readyState, confpostmsgconnection.status);
    // }
  };
  onError = error => {
    console.error('onerror:', error);
  };
  removeuserfromconversation = async () => {
    if (confsseeventsource) {
      confsseeventsource.onclose = null; // Remove the onclose handler
      confsseeventsource.onerror = null; // Remove the onerror handler
      confsseeventsource.removeAllEventListeners();
      confsseeventsource.close();
      confsseeventsource = null; // Set to null to prevent further use
    }
    var existingusersconnection = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    existingusersconnection.open(
      'GET',
      'https://newauth.io/newauth/api/removeuserfromconversation/' +
        this.state.chatConvId +
        '/' +
        confusername,
    );
    existingusersconnection.withCredentials = true;
    existingusersconnection.setRequestHeader(
      'Content-Type',
      'application/json',
    );
    existingusersconnection.onreadystatechange = () => {
      console.log(
        'remove user:',
        existingusersconnection.readyState,
        existingusersconnection.status,
      );
      if (
        existingusersconnection.readyState == 4 &&
        existingusersconnection.status == 200
      ) {
        console.log(
          'user removed succefully!!',
          existingusersconnection.responseText,
        );
        this.setState({
          flashopacity: true,
          flashMessage: `User removed successfully.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      } else if (
        existingusersconnection.readyState == 4 &&
        existingusersconnection.status == 500
      ) {
        console.log('error removing user 500');
        this.setState({
          flashopacity: true,
          flashMessage: `Server error. Please try again.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
        // existingusersconnection.send(null);
      } else if (
        existingusersconnection.readyState == 4 &&
        existingusersconnection.status == 400
      ) {
        console.log('error removing user 500');
        this.setState({
          flashopacity: true,
          flashMessage: `Something went wrong. Please try again.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
        // existingusersconnection.send(null);
      } else if (
        existingusersconnection.readyState == 4 &&
        existingusersconnection.status == 0
      ) {
        console.log('error removing user 500');
        this.setState({
          flashopacity: true,
          flashMessage: `Please check your internet connection.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
        // existingusersconnection.send(null);
      }
    };
    existingusersconnection.send(null);
    console.log('Remove user call sent: ');
  };
  findconfusers = chatindex => {
    global.atob = require('base-64').decode;
    var existingusersconnection = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    existingusersconnection.open(
      'POST',
      'https://newauth.io/newauth/api/getflakeconfusers/' +
        encodedConvid +
        '/' +
        confusername,
    );
    existingusersconnection.withCredentials = true;
    existingusersconnection.setRequestHeader(
      'Content-Type',
      'application/json',
    );
    existingusersconnection.onreadystatechange = () => {
      console.log(
        'find conf users:',
        existingusersconnection.readyState,
        existingusersconnection.status,
      );
      if (
        existingusersconnection.readyState == 4 &&
        existingusersconnection.status == 200
      ) {
        var res = existingusersconnection.responseText;
        // alert("getflakeconfusers response")
        // this.state.connectionOnlineWidth = new Animated.Value(screenwidth/3);
        // this.state.connectionOnlineHeight = new Animated.Value(screenwidth/3);
        // this.state.connectionOnlineLeft = new Animated.subtract(this.state.connectionOnlineLeft,screenwidth/3);
        Animated.timing(this.state.connectionOnlineScale, {
          toValue: 4,
          duration: 2000,
          useNativeDriver: false,
        }).start();
        this.setState({connectionOnlineRings: 2});
        console.log('ress:' + chatindex, res, encodedConvid, confusername);
        if (res != null && res.length > 0) {
          var otherstreamname = 'na';
          var confusers = JSON.parse(res);
          for (var key in confusers) {
            var value = confusers[key];
            console.log(value);
            var usercount = value.length;
            // alert(`no. of users joined:usercount ${usercount}`)
            const isOfferer = usercount === 2;
            let allconvindex = allConversationArr.findIndex(
              p => p.convid == key,
            );
            if (isOfferer == false) {
              this.setState({chatUserStatus: ''});
              allConversationArr[allconvindex].canOfferP2P = false;
              this.setState({canOfferP2P: false});
              console.log('false', this.state.canOfferP2P, allconvindex);
            } else {
              allConversationArr[allconvindex].canReceiveP2P = true;
              this.setState({canReceiveP2P: true, chatUserStatus: 'Joining'});
              console.log(
                'start webrtc',
                this.state.canReceiveP2P,
                allconvindex,
                allConversationArr[allconvindex].clientPeer,
                allConversationArr[allconvindex].remotePeer,
              );
              // conversationIndex = allConversationArr.findIndex(p=>p.convid==key);
              if (
                allConversationArr[allconvindex].clientPeer == null &&
                allConversationArr[allconvindex].remotePeer == null
              ) {
                this.startWebRTC(isOfferer, allconvindex, chatindex);
              }
            }
          }
          //   this.startWebRTC(isOfferer);
        } else {
          alert('no user found in conversation.');
        }
      } else if (
        existingusersconnection.readyState == 4 &&
        existingusersconnection.status == 500
      ) {
        existingusersconnection.send(null);
      } else if (existingusersconnection.status == 405) {
        existingusersconnection.send(null);
      }
    };
    existingusersconnection.send(null);
  };
  establishnewSSEConnection = async (callback, flake, phn, chatindex) => {
    // if (isConnecting) {
    //     console.warn('isconnecting it true. returning without making new eventsource');
    //     return;
    // }
    isConnecting = true;
    console.log('flake,phn', flake, phn);
    global.btoa = require('base-64').encode;
    confflake = global.btoa(flake);
    console.log(typeof EventSource);
    if (confusername != null) {
      localUser = confusername;
    } else {
      // confusername = Math.floor(Math.random() * Math.floor(1000));
      // console.log('passing a random username '+ confusername);
      localUser = confusername;
    }
    if (confpostmsgconnection == null) {
      // confpostmsgconnection = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      // confpostmsgconnection.open('POST', 'https://newauth.io/newauth/api/addmessagetoconversation');
      // confpostmsgconnection.withCredentials = true;
      // confpostmsgconnection.setRequestHeader('Content-Type', 'application/json');
    }
    if (typeof EventSource !== 'undefined') {
      if (confsseeventsource) {
        confsseeventsource.removeAllEventListeners();
        confsseeventsource.close();
      }
      if (!confsseeventsource) {
        // this.ev = new EventSource("https://newauth.io/newauth/api/joinConversation/" + encodedConvid + "/" + phn, { withCredentials: true });
        if (
          encodedConvid != null ||
          encodedConvid != 'bnVsbA==' ||
          encodedConvid.length > 0
        ) {
          console.log('calling new joiconv');
          confsseeventsource = new EventSource(
            'https://newauth.io/newauth/api/joinConversation/' +
              encodedConvid +
              '/' +
              phn,
            {withCredentials: true, debug: true},
          );
          console.log(confsseeventsource);
        }
      }
      confsseeventsource.addEventListener('open', async event => {
        console.log('Connected to conf SSE event source');
        isConnecting = false;
        attempt = 0;
        // this.state.connectionOnlineWidth = new Animated.Value(screenwidth/4);
        // this.state.connectionOnlineHeight = new Animated.Value(screenwidth/4);
        // this.state.connectionOnlineLeft = new Animated.subtract(this.state.connectionOnlineLeft,screenwidth/4);
        if (this.state.showchatUI == true) {
          if (allConversationArr[convIndex].canOfferP2P == true) {
            // isConnecting = false;
            console.log('Onopen called');
            // attempt = 0;
            callback(this.state.chatIndex);
          }
        }
        Animated.timing(this.state.connectionOnlineScale, {
          toValue: 3,
          duration: 2000,
          useNativeDriver: false,
        }).start();
        this.setState({connectionOnlineRings: 1});
        // alert('Connected to conf SSE event source');
        // this.ev.close();
        console.log(event, this.state.username);
        // if(pc==null){
        // }
      });
      confsseeventsource.addEventListener('error', async event => {
        console.log(event);
        isConnecting = false;
        if (event.readyState === EventSource.CLOSED) {
          console.log('SSE closed (' + event.readyState + ')');
        } else if (event.readyState === EventSource.CONNECTING) {
          console.log('SSE reconnecting (' + event.readyState + ')');
        }
        if (event.type === 'error') {
          console.log('calling error joiconv');
          console.error(
            'Connection errorr:',
            this.state.username,
            event.message,
          );
          if (confsseeventsource) {
            confsseeventsource.removeAllEventListeners();
            confsseeventsource.close();
          }
          confsseeventsource = null;
          this.reconnect(callback, flake, phn, chatindex);
          // confsseeventsource = new EventSource("https://newauth.io/newauth/api/joinConversation/" + encodedConvid + "/" + phn, { withCredentials: true });
          // console.log(confsseeventsource)
        } else if (event.type === 'exception') {
          console.log('calling exc joiconv');
          console.error(
            'Errorr:',
            this.state.username,
            event.message,
            event.error,
          );
          if (encodedConvid != null || encodedConvid.length > 0) {
            if (confsseeventsource) {
              confsseeventsource.removeAllEventListeners();
              confsseeventsource.close();
            }
            confsseeventsource = null;
            this.reconnect(callback, flake, phn, chatindex);
            // confsseeventsource = new EventSource("https://newauth.io/newauth/api/joinConversation/" + encodedConvid + "/" + phn, { withCredentials: true });
          }
        }
      });
      confsseeventsource.addEventListener('message', async event => {
        // Message was sent by us
        console.log(
          'event msgg received: ' + this.state.chatConvId,
          this.state.showchatUI,
          event,
        );
        console.log(event);
        // console.log(event);
        if (event.data.length == 0) return;
        var message = JSON.parse(event.data);
        if (
          typeof message.message !== 'undefined' &&
          typeof message.message.type !== 'undefined' &&
          message.message.type === 'user_left'
        ) {
          // alert(message.type);
        }
        if (message.sdp) {
          if (this.state.showchatUI == true) {
            let conversationIndex = allConversationArr.findIndex(
              p => p.convid == message.conversationID,
            );
            console.log(
              'sdp event data received on',
              this.state.username,
              new Date().toUTCString(),
            );
            global.atob = require('base-64').decode;
            if (message.sender.flake != confusername) {
              var newsdp = JSON.parse(global.atob(message.sdp));
              let file_path =
                RNFetchBlob.fs.dirs.DownloadDir + '/rcvsdp' + '.txt';
              // RNFetchBlob.fs.writeFile(file_path, JSON.stringify(newsdp), 'utf8').catch((e) => console.log("save file error:", e))
              if (newsdp.type == 'offer') {
                this.setState({
                  connectionOnlineRings: this.state.connectionOnlineRings + 1,
                  chatUserStatus: 'Joining',
                });
                Animated.timing(this.state.connectionOnlineScale, {
                  toValue: this.state.connectionOnlineRings + 2,
                  duration: 2000,
                  useNativeDriver: false,
                }).start();
                // alert("sdp offer received")
                // allConversationArr[conversationIndex].clientPeer = null;
                // allConversationArr[conversationIndex].datachannel = null;
                // allConversationArr[conversationIndex].remotePeer = null;
                // countt = 0;
                if (allConversationArr[conversationIndex].remotePeer == null) {
                  allConversationArr[conversationIndex].remotePeer =
                    new RTCPeerConnection(configuration);
                }
                console.log('crt rmt desc');
                allConversationArr[
                  conversationIndex
                ].remotePeer.onicecandidate = event => {
                  if (event.candidate) {
                    console.log(
                      'new ice candidate! representing remote SDP' +
                        JSON.stringify(
                          allConversationArr[conversationIndex].remotePeer
                            .localDescription.type,
                        ),
                      allConversationArr[conversationIndex].remotePeer
                        .signalingState,
                    );
                    console.log('ice candidate:', event.candidate);
                    console.log(
                      allConversationArr[conversationIndex].remotePeer
                        .localDescription,
                    );
                    // console.log("countt:",countt);
                    // if(countt==0){
                    // console.log(allConversationArr)
                    // this.sendMessage({'candidate': event.candidate}, allConversationArr[conversationIndex].convid);
                    // this.sendMessage(allConversationArr[conversationIndex].remotePeer.localDescription, allConversationArr[conversationIndex].convid);
                    // countt++;
                    // }
                  }
                };
                allConversationArr[conversationIndex].remotePeer.ondatachannel =
                  async e => {
                    //get the data channel we received from peer
                    // alert("got data channel", e);
                    console.log(
                      allConversationArr[conversationIndex].remotePeer.dc,
                      e.channel,
                    );
                    allConversationArr[conversationIndex].remotePeer.dc =
                      e.channel;
                    // allConversationArr[conversationIndex].remotePeer.dc.addEventListener("open", async (event) => {
                    console.log('connection opened!!');
                    this.setState({
                      connectionOnlineRings: 0,
                      connectionOnlineOpacity: new Animated.Value(0.6),
                    });
                    allConversationArr[conversationIndex].status = 'Joined';
                    this.state.filteredContactData[
                      this.state.chatIndex
                    ].status = 'inchat';
                    this.setState({chatUserStatus: 'Joined the chat'});
                    // alert("connection opened!!")
                    console.log(
                      this.state.connectionOnlineLeft,
                      this.state.connectionOnlineWidth,
                      this.state.connectionOnlineTop,
                      this.state.connectionOnlineHeight,
                    );
                    // let l = Animated.subtract(Animated.add(this.state.connectionOnlineLeft, this.state.connectionOnlineWidth), new Animated.Value(screenwidth / 2));
                    // let t = Animated.subtract(Animated.add(this.state.connectionOnlineTop, this.state.connectionOnlineHeight), new Animated.Value(screenwidth / 2));
                    let newsize = await this.calculateBigCircleSize(
                      Number.parseInt(
                        JSON.stringify(this.state.connectionOnlineWidth),
                      ),
                      Number.parseInt(
                        JSON.stringify(this.state.connectionOnlineHeight),
                      ),
                      Number.parseInt(
                        JSON.stringify(this.state.connectionOnlineLeft),
                      ),
                      Number.parseInt(
                        JSON.stringify(this.state.connectionOnlineTop),
                      ),
                    );
                    console.log('newsize:', newsize);
                    // console.log(l,t);
                    this.setState({
                      connectionOnlineFalse: 'none',
                      connectionOnlineTrue: 'flex',
                      connectionOnlineColor: 'lightgray',
                    });
                    Animated.timing(this.state.connectionOnlineHeight, {
                      toValue: newsize.width,
                      duration: 2000,
                      useNativeDriver: false,
                    }).start();
                    Animated.timing(this.state.connectionOnlineWidth, {
                      toValue: newsize.width,
                      duration: 2000,
                      useNativeDriver: false,
                    }).start();
                    Animated.timing(this.state.connectionOnlineLeft, {
                      toValue: newsize.left,
                      duration: 2000,
                      useNativeDriver: false,
                    }).start();
                    Animated.timing(this.state.connectionOnlineTop, {
                      toValue: newsize.top,
                      duration: 2000,
                      useNativeDriver: false,
                    }).start();
                    setTimeout(() => {
                      let pertop =
                        ((Number.parseInt(JSON.stringify(newsize.top)) +
                          newsize.width / 2) /
                          screenheight) *
                        100;
                      this.setState({
                        flashopacity: true,
                        flashMessage: `Now you are connected to ${this.state.chatName} directly. \n Your messages are not passing through our servers.`,
                        flashColor: 'rgba(256,256,256,0.6',
                        flashPosition: `${pertop}%`,
                        textcolor: 'green',
                      });
                      setTimeout(() => {
                        this.setState({flashopacity: false});
                      }, 3500);
                    }, 2000);
                    //  connectionOnlineWidth: newsize.width, connectionOnlineHeight: newsize.width, connectionOnlineLeft: newsize.left,connectionOnlineTop:newsize.top});
                    allConversationArr[conversationIndex].sendChannel =
                      allConversationArr[conversationIndex].remotePeer.dc;
                    // this.setState({ sendChannel: allConversationArr[conversationIndex].remotePeer.dc });
                    if (confsseeventsource != null) {
                      // confsseeventsource.close(); cmntd
                      // this.ev.close();
                      // confsseeventsource = null;  cmntd
                      //   alert('SSE connection stopped.');
                    }
                    // });
                    allConversationArr[
                      conversationIndex
                    ].remotePeer.dc.addEventListener('message', async event => {
                      console.log('new channel msg at remote');
                      this.handleReceiveMessage(
                        event.data,
                        this.state.chatIndex,
                      );
                      if (this.state.showchatUI == false) {
                        // this.state.filteredContactData[this.state.chatIndex].color = dotColors[this.state.chatIndex];
                        this.setState({updateUIState: true});
                      }
                      // alert(event.data);
                    });
                    allConversationArr[
                      conversationIndex
                    ].remotePeer.dc.addEventListener('close', async event => {
                      console.log('p2p over at remote', event);
                      await this.handleP2PClose(conversationIndex);
                      // this.setState({ canOfferP2P: true, canReceiveP2P: true })
                      // allConversationArr[conversationIndex].clientPeer = null,
                      // allConversationArr[conversationIndex].remotePeer = null,
                      // allConversationArr[conversationIndex].datachannel = null,
                      // allConversationArr[conversationIndex].sendChannel = null,
                      // allConversationArr[conversationIndex].canOfferP2P = true,
                      // allConversationArr[conversationIndex].canReceiveP2P = true,
                      // allConversationArr[conversationIndex].status = ""
                      this.joinConversation(confusername, this.state.chatIndex); //9 july
                      // alert(event.data);
                    });
                  };
                allConversationArr[
                  conversationIndex
                ].remotePeer.addEventListener(
                  'connectionstatechange',
                  async event => {
                    // new, connecting, connected, disconnected, failed, or closed.
                    if (
                      allConversationArr[conversationIndex].remotePeer != null
                    ) {
                      if (
                        allConversationArr[conversationIndex].remotePeer
                          .connectionState != null
                      ) {
                        console.log(
                          'connection state remote:',
                          allConversationArr[conversationIndex].remotePeer
                            .connectionState,
                        );
                        switch (
                          allConversationArr[conversationIndex].remotePeer
                            .connectionState
                        ) {
                          case 'new':
                          case 'checking':
                            console.log('Connecting…', event);
                            break;
                          case 'connected':
                            console.log('Online:', event);
                            break;
                          case 'disconnected':
                            console.log('Disconnecting…', event);
                            this.setState({
                              flashopacity: true,
                              flashMessage: `P2P disconnected. Restarting...`,
                              flashColor: 'lightgray',
                              flashPosition: '50%',
                              textcolor: '#D21F3C',
                            });
                            setTimeout(() => {
                              this.setState({flashopacity: false});
                            }, 3500);
                            await this.handleP2PDisconnect(
                              conversationIndex,
                              this.state.chatIndex,
                            );
                            // this.setState({ connectionOnlineOpacity: new Animated.Value(0.3) })
                            //     allConversationArr[conversationIndex].clientPeer = null,
                            //     allConversationArr[conversationIndex].remotePeer = null,
                            //     allConversationArr[conversationIndex].datachannel = null,
                            //     allConversationArr[conversationIndex].sendChannel = null,
                            //     allConversationArr[conversationIndex].canOfferP2P = true,
                            //     allConversationArr[conversationIndex].canReceiveP2P = true,
                            //     allConversationArr[conversationIndex].status = "Joining"
                            // this.setState({ connectionOnlineRings: 0 })
                            // Animated.timing(this.state.connectionOnlineScale, {
                            //     toValue: 1,
                            //     duration: 2000,
                            //     useNativeDriver: false,
                            // }).start();
                            // this.state.connectionOnlineLeft = new Animated.Value(Number.parseInt(JSON.stringify(this.state.dotColorLocation[chatindex].ypc)));
                            // this.state.connectionOnlineTop = new Animated.Value(Number.parseInt(JSON.stringify(this.state.dotColorLocation[chatindex].zpc)));
                            // this.setState({ connectionOnlineFalse: 'flex', connectionOnlineTrue: 'none', connectionOnlineHeight: new Animated.Value(30), connectionOnlineWidth: new Animated.Value(30) })
                            this.setState({chatUserStatus: 'Joining'});
                            this.joinConversation(
                              confusername,
                              this.state.chatIndex,
                            ); //9 july
                            break;
                          case 'closed':
                            console.log('Offline:', event);
                            break;
                          case 'failed':
                            console.log('Error:', event);
                            this.setState({
                              flashopacity: true,
                              flashMessage: `P2P connection failed. Trying again.`,
                              flashColor: 'lightgray',
                              flashPosition: '50%',
                              textcolor: '#D21F3C',
                            });
                            setTimeout(() => {
                              this.setState({flashopacity: false});
                            }, 3500);
                            await this.handleP2PFail(
                              conversationIndex,
                              this.state.chatIndex,
                            );
                            //     allConversationArr[conversationIndex].clientPeer = null,
                            //     allConversationArr[conversationIndex].remotePeer = null,
                            //     allConversationArr[conversationIndex].datachannel = null,
                            //     allConversationArr[conversationIndex].sendChannel = null,
                            //     allConversationArr[conversationIndex].canOfferP2P = true,
                            //     allConversationArr[conversationIndex].canReceiveP2P = true
                            // allConversationArr[conversationIndex].status = ""
                            // this.setState({ connectionOnlineRings: 0 })
                            // Animated.timing(this.state.connectionOnlineScale, {
                            //     toValue: 1,
                            //     duration: 2000,
                            //     useNativeDriver: false,
                            // }).start();
                            // this.state.connectionOnlineLeft = new Animated.Value(Number.parseInt(JSON.stringify(this.state.dotColorLocation[chatindex].ypc)));
                            // this.state.connectionOnlineTop = new Animated.Value(Number.parseInt(JSON.stringify(this.state.dotColorLocation[chatindex].zpc)));
                            // this.setState({ connectionOnlineFalse: 'flex', connectionOnlineTrue: 'none', connectionOnlineHeight: new Animated.Value(30), connectionOnlineWidth: new Animated.Value(30) })
                            // this.setState({ chatUserStatus: "" })
                            this.joinConversation(
                              confusername,
                              this.state.chatIndex,
                            ); //9 july
                            break;
                          default:
                            console.log('Unknown:', event);
                            break;
                        }
                      }
                    }
                  },
                );
                allConversationArr[
                  conversationIndex
                ].remotePeer.addEventListener('icegatheringstatechange', ev => {
                  let connection = ev.target;
                  console.log('ice state:', connection.iceGatheringState);
                  switch (connection.iceGatheringState) {
                    case 'gathering':
                      /* collection of candidates has begun */
                      console.log('begun');
                      // this.sendMessage(allConversationArr[conversationIndex].remotePeer.localDescription, allConversationArr[conversationIndex].convid);
                      break;
                    case 'complete':
                      /* collection of candidates is finished */
                      console.log('completed');
                      this.sendMessage(
                        allConversationArr[conversationIndex].remotePeer
                          .localDescription,
                        allConversationArr[conversationIndex].convid,
                      );
                      break;
                  }
                });
                if (
                  allConversationArr[conversationIndex].remotePeer
                    .signalingState === 'stable'
                ) {
                  allConversationArr[conversationIndex].remotePeer
                    .setRemoteDescription(newsdp)
                    .then(a =>
                      console.log(
                        'remote answer set! 1',
                        allConversationArr[conversationIndex].remotePeer
                          .signalingState,
                      ),
                    );
                  allConversationArr[conversationIndex].remotePeer
                    .createAnswer()
                    .then(a => this.remoteDescCreated(a, conversationIndex))
                    .catch(this.onError);
                } else if (
                  allConversationArr[conversationIndex].remotePeer
                    .signalingState === 'have-local-offer'
                ) {
                  allConversationArr[conversationIndex].remotePeer = null;
                  allConversationArr[conversationIndex].remotePeer =
                    new RTCPeerConnection(configuration);
                  allConversationArr[conversationIndex].remotePeer
                    .setRemoteDescription(newsdp)
                    .then(a =>
                      console.log(
                        'remote answer set! 2',
                        allConversationArr[conversationIndex].remotePeer
                          .signalingState,
                      ),
                    );
                  if (
                    allConversationArr[conversationIndex].remotePeer
                      .signalingState === 'have-remote-offer'
                  ) {
                    allConversationArr[conversationIndex].remotePeer
                      .createAnswer()
                      .then(a => this.remoteDescCreated(a, conversationIndex))
                      .catch(this.onError);
                  }
                }
                // if (rc.signalingState === 'have-remote-offer') {
                //     rc.createAnswer().then(a => this.remoteDescCreated(a)).catch(this.onError);
                // }
                // }
                // };
              } else if (newsdp.type == 'answer') {
                console.log('newsdp:', newsdp);
                this.setState({
                  connectionOnlineRings: this.state.connectionOnlineRings + 1,
                  chatUserStatus: 'Joining',
                });
                Animated.timing(this.state.connectionOnlineScale, {
                  toValue: this.state.connectionOnlineRings + 2,
                  duration: 2000,
                  useNativeDriver: false,
                }).start();
                // alert("sdp answer received")
                // allConversationArr[conversationIndex].remotePeer = null;
                console.log(
                  'inside sdp answer',
                  allConversationArr[conversationIndex].clientPeer
                    .signalingState,
                );
                if (
                  allConversationArr[conversationIndex].clientPeer
                    .signalingState == 'have-local-offer'
                ) {
                  allConversationArr[conversationIndex].clientPeer
                    .setRemoteDescription(newsdp)
                    .then(a =>
                      console.log('remote answer set successfully! client'),
                    );
                  console.log(allConversationArr[conversationIndex]);
                }
              } else if (newsdp.candidate) {
                // Add the new ICE candidate to our connections remote description
                console.log('inside msg candidatee');
                if (allConversationArr[conversationIndex].clientPeer != null) {
                  allConversationArr[
                    conversationIndex
                  ].clientPeer.addIceCandidate(
                    new RTCIceCandidate(newsdp.candidate.candidate),
                    this.onSuccess(),
                    this.onError(),
                  );
                }
                if (allConversationArr[conversationIndex].remotePeer != null) {
                  allConversationArr[
                    conversationIndex
                  ].remotePeer.addIceCandidate(
                    new RTCIceCandidate(newsdp.candidate.candidate),
                    this.onSuccess(),
                    this.onError(),
                  );
                }
              }
            }
          }
        } else if (message.author) {
          console.log(
            'offline msg rcvd:',
            this.state.chatConvId,
            this.state.showchatUI,
          );
          console.log(message.message);
          global.atob = require('base-64').decode;
          let decodedmessage = global.atob(message.message);
          console.log('decoded msg:', decodedmessage);
          if (this.state.showchatUI == false) {
            let fcdIndex = this.state.filteredContactData.findIndex(
              p => p.convid == JSON.parse(decodedmessage)[0].user.name,
            );
            await this.handleReceiveMessage(decodedmessage, fcdIndex);
            this.deleteConversation(
              JSON.parse(decodedmessage)[0].user.name,
              flakeTousernameAuthor,
            );
          } else {
            await this.handleReceiveMessage(
              decodedmessage,
              this.state.chatIndex,
            );
            this.deleteConversation(
              this.state.chatConvId,
              flakeTousernameAuthor,
            );
          }
        } else {
          console.log('user joined:', message);
          console.log('no sdp found:', message.sender.flake);
          // if(this.state.showchatUI == true){
          //    if(message.sender.flake != confusername){
          //       this.state.filteredContactData[this.state.chatIndex].status = 'inchat'
          //       this.forceUpdate()
          //     }
          // }
        }
      });
      confsseeventsource.addEventListener('close', async event => {
        console.log(
          'SSE connection closed on server. Closing it on the client',
        );
        // confsseeventsource.close();
      });
    }
  };
  joinConversation = async (phn, chatindex) => {
    console.log(confusername, confflake, phn, chatindex);
    if (!confsseeventsource) {
      if (
        (encodedConvid != null ||
          encodedConvid != 'bnVsbA==' ||
          encodedConvid.length > 0) &&
        AppState.currentState == 'active'
      ) {
        console.log('calling joinconversation');
        // if (!confsseeventsource) {
        console.log('creating new SSE connection');
        // this.stopSSEPolling();
        // await this.removeuserfromconversation();
        // if (encodedConvid != null) {
        var aftersseconn = () => {
          console.log('SSE established ');
          if (
            this.state.showchatUI == true &&
            AppState.currentState == 'active'
          ) {
            if (allConversationArr[convIndex].canOfferP2P == true) {
              // isConnecting = false;
              console.log('running callback');
              // attempt = 0;
              this.findconfusers(this.state.chatIndex);
            }
          }
        };
        this.establishnewSSEConnection(
          aftersseconn,
          this.state.chatConvId,
          phn,
          chatindex,
        );
        // allConversationArr[conversationIndex].status = 'Joined'
        // }
        this.setState({chatUserStatus: ''});
        // } else {
        //     if (confsseeventsource.url.endsWith(phn)) {
        //         console.log('SSE connection for the conversation exists. readystate: ' + confsseeventsource.readyState + ' url: ' + confsseeventsource.url);
        //         this.findconfusers(chatindex);
        //     } else {
        //         console.log('SSE connection exists for a different URL ' + confsseeventsource.url + ' .. Will close the old connection and create new.');
        //         this.stopSSEPolling();
        //         // await this.removeuserfromconversation();
        //         if (encodedConvid != null) {
        //             // this.establishnewSSEConnection(this.findconfusers, confflake, phn, chatindex);
        //             // allConversationArr[conversationIndex].status = 'Joined'
        //         }
        //         this.setState({ chatUserStatus: "" })
        //     }
        // }
      }
    } else {
      if (this.state.showchatUI == true && AppState.currentState == 'active') {
        if (allConversationArr[convIndex].canOfferP2P == true) {
          // isConnecting = false;
          console.log('running callback');
          // attempt = 0;
          this.findconfusers(this.state.chatIndex);
        }
      }
    }
  };
  reconnect = (callback, flake, phn, chatindex) => {
    // if (attempt >= maxAttempts) {
    //     console.log('Max reconnection attempts reached');
    //     return;
    // }
    // const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
    // setTimeout(() => {
    //     console.log(`Attempting to reconnect (attempt ${attempt + 1})`);
    if (encodedConvid != 'bnVsbA==' || encodedConvid != null) {
      this.establishnewSSEConnection(callback, flake, phn, chatindex);
    }
    // }, delay);
    attempt++;
  };
  stopSSEPolling = async () => {
    if (confsseeventsource) {
      confsseeventsource.removeAllEventListeners();
      confsseeventsource.close();
      // this.ev.close();
      confsseeventsource = null;
      // alert('SSE connection stopped.');
    }
  };
  async componentWillUnmount() {
    console.error('app unmounted');
    if (confusername != null || confusername != '') {
      // await this.setOnlineStatus(confusername, 'OFF');
    }
    // arr = [];
    // encodedConvid = null;
    // multiconvids = null;
    clearInterval();
    this.state.allAndroidContactsArray = [];
    isMounted = false;
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    // AppState.removeEventListener("change", this._handleAppStateChange);
    this.backHandler.remove();
    subscription.remove();
    // if (confsseeventsource != null) {
    //     confsseeventsource.close();
    //     // this.ev.close();
    //     confsseeventsource = null;
    // }
    // countt = 0 ;
  }
  componentDidUpdate() {
    //    console.log(this.state.connectionOnlineColor);
    // setTimeout(() => {
    // console.log('inside update component')
    //   console.log('len:'+this.state.verifyKeyInput.length)
    // if (this.state.verifyKeyInput.length == 4) {
    //     this.getInviteSenderNum(this.state.verifyNumber, this.state.verifyKeyCode, this.state.verifyKeyInput)
    //     // this.setState({ verifyKeyInput: '' })
    //     if (Platform.OS === 'android') {
    //         RNOtpVerify.removeListener();
    //     }
    // }
    // }, 5000);
  }
  startWebRTC(isOfferer, index, chatindex) {
    console.log('inside webrtc', isOfferer);
    if (isOfferer == true) {
      if (allConversationArr[index].clientPeer == null) {
        allConversationArr[index].clientPeer = new RTCPeerConnection(
          configuration,
        );
        // console.log('pc:', allConversationArr[index].clientPeer);
        // console.log(allConversationArr[index])
      }
      if (allConversationArr[index].datachannel == null) {
        allConversationArr[index].datachannel =
          allConversationArr[index].clientPeer.createDataChannel('channel');
        console.log('pc,dc:', allConversationArr[index]);
      }
    }
    allConversationArr[index].clientPeer.onicecandidate = event => {
      if (
        event.candidate &&
        allConversationArr[index].clientPeer.signalingState ==
          'have-local-offer'
      ) {
        console.log(
          'new ice candidate! representing client SDP' +
            JSON.stringify(
              allConversationArr[index].clientPeer.localDescription.type,
            ),
          allConversationArr[index].clientPeer.signalingState,
        );
        console.log('ice candidate:', event.candidate);
        console.log(allConversationArr[index].clientPeer.localDescription);
        // console.log("countt value:",countt);
        // if(countt==0){
        // alert('you can start chat now')
        // console.log(allConversationArr)
        // this.sendMessage({'candidate': event.candidate}, allConversationArr[index].convid);
        // this.sendMessage(allConversationArr[index].clientPeer.localDescription, allConversationArr[index].convid);
        // countt++;
        // }
      }
    };
    if (allConversationArr[index].datachannel != null) {
      allConversationArr[index].datachannel.addEventListener(
        'message',
        async evt => {
          console.log('new message at client:');
          this.handleReceiveMessage(evt.data, chatindex);
          if (this.state.showchatUI == false) {
            this.state.filteredContactData[chatindex].color =
              dotColors[chatindex];
            this.setState({updateUIState: true});
          }
          // alert(evt.data);
        },
      );
      allConversationArr[index].datachannel.addEventListener(
        'open',
        async event => {
          //   alert("connection open!");
          console.log('connection open!', event);
          this.setState({
            connectionOnlineRings: 0,
            connectionOnlineOpacity: new Animated.Value(0.6),
          });
          allConversationArr[index].canOfferP2P = false;
          allConversationArr[index].status = 'Joined';
          this.state.filteredContactData[this.state.chatIndex].status =
            'inchat';
          this.setState({chatUserStatus: 'Joined the chat'});
          // alert("connection opened!!")
          console.log(
            this.state.connectionOnlineLeft,
            this.state.connectionOnlineWidth,
            this.state.connectionOnlineTop,
            this.state.connectionOnlineHeight,
          );
          // let l = Animated.subtract(Animated.add(this.state.connectionOnlineLeft, this.state.connectionOnlineWidth), new Animated.Value(screenwidth / 2));
          // let t = Animated.subtract(Animated.add(this.state.connectionOnlineTop, this.state.connectionOnlineHeight), new Animated.Value(screenwidth / 2));
          let newsize = await this.calculateBigCircleSize(
            Number.parseInt(JSON.stringify(this.state.connectionOnlineWidth)),
            Number.parseInt(JSON.stringify(this.state.connectionOnlineHeight)),
            Number.parseInt(JSON.stringify(this.state.connectionOnlineLeft)),
            Number.parseInt(JSON.stringify(this.state.connectionOnlineTop)),
          );
          // console.log(l,t);
          console.log('newsize:', newsize);
          this.setState({
            connectionOnlineFalse: 'none',
            connectionOnlineTrue: 'flex',
            connectionOnlineColor: 'lightgray',
          });
          Animated.timing(this.state.connectionOnlineHeight, {
            toValue: newsize.width,
            duration: 2000,
            useNativeDriver: false,
          }).start();
          Animated.timing(this.state.connectionOnlineWidth, {
            toValue: newsize.width,
            duration: 2000,
            useNativeDriver: false,
          }).start();
          Animated.timing(this.state.connectionOnlineLeft, {
            toValue: newsize.left,
            duration: 2000,
            useNativeDriver: false,
          }).start();
          Animated.timing(this.state.connectionOnlineTop, {
            toValue: newsize.top,
            duration: 2000,
            useNativeDriver: false,
          }).start();
          setTimeout(() => {
            let pertop =
              ((Number.parseInt(JSON.stringify(newsize.top)) +
                newsize.width / 2) /
                screenheight) *
              100;
            this.setState({
              flashopacity: true,
              flashMessage: `Now you are connected to ${this.state.chatName} directly. \n Your messages are not passing through our servers.`,
              flashColor: 'rgba(256,256,256,0.6',
              flashPosition: `${pertop}%`,
              textcolor: 'green',
            });
            setTimeout(() => {
              this.setState({flashopacity: false});
            }, 3500);
          }, 2000);
          // connectionOnlineWidth: newsize.width, connectionOnlineHeight: newsize.width, connectionOnlineLeft: newsize.left,connectionOnlineTop:newsize.top});
          allConversationArr[index].sendChannel =
            allConversationArr[index].datachannel;
          //   this.setState({ sendChannel: allConversationArr[index].datachannel });
          if (confsseeventsource != null) {
            // confsseeventsource.close();  cmntd
            // this.ev.close();
            // confsseeventsource = null;   cmntd
            // alert('SSE connection stopped.');
          }
          // countt = 0;
        },
      );
      allConversationArr[index].datachannel.addEventListener(
        'close',
        async evt => {
          console.log('p2p over at client:', evt);
          await this.handleP2PClose(index);
          // this.setState({ canOfferP2P: true, canReceiveP2P: true })
          // allConversationArr[index].clientPeer = null,
          // allConversationArr[index].remotePeer = null,
          // allConversationArr[index].datachannel = null,
          // allConversationArr[index].sendChannel = null,
          // allConversationArr[index].canOfferP2P = true,
          // allConversationArr[index].canReceiveP2P = true,
          // allConversationArr[index].status = ""
          this.joinConversation(confusername, chatindex); //9 july
          // alert(evt.data);
        },
      );
    }
    allConversationArr[index].clientPeer.addEventListener(
      'connectionstatechange',
      async event => {
        // new, connecting, connected, disconnected, failed, or closed.
        if (allConversationArr[index].clientPeer != null) {
          if (allConversationArr[index].clientPeer.connectionState != null) {
            console.log(
              'connection state client:',
              allConversationArr[index].clientPeer.connectionState,
            );
            switch (allConversationArr[index].clientPeer.connectionState) {
              case 'new':
              case 'checking':
                console.log('Connecting…', event);
                break;
              case 'connected':
                console.log('Online:', event);
                break;
              case 'disconnected':
                console.log('Disconnecting…', event);
                this.setState({
                  flashopacity: true,
                  flashMessage: `P2P disconnected. Restarting...`,
                  flashColor: 'lightgray',
                  flashPosition: '50%',
                  textcolor: '#D21F3C',
                });
                setTimeout(() => {
                  this.setState({flashopacity: false});
                }, 3500);
                await this.handleP2PDisconnect(index, chatindex);
                // this.setState({ connectionOnlineOpacity: new Animated.Value(0.3) })
                //     allConversationArr[index].clientPeer = null,
                //     allConversationArr[index].remotePeer = null,
                //     allConversationArr[index].datachannel = null,
                //     allConversationArr[index].sendChannel = null,
                //     allConversationArr[index].canOfferP2P = true,
                //     allConversationArr[index].canReceiveP2P = true,
                //     allConversationArr[index].status = ""
                // this.setState({ connectionOnlineRings: 0 })
                // Animated.timing(this.state.connectionOnlineScale, {
                //     toValue: 1,
                //     duration: 2000,
                //     useNativeDriver: false,
                // }).start();
                // this.state.connectionOnlineLeft = new Animated.Value(Number.parseInt(JSON.stringify(this.state.dotColorLocation[chatindex].ypc)));
                // this.state.connectionOnlineTop = new Animated.Value(Number.parseInt(JSON.stringify(this.state.dotColorLocation[chatindex].zpc)));
                // this.setState({ connectionOnlineFalse: 'flex', connectionOnlineTrue: 'none', connectionOnlineHeight: new Animated.Value(30), connectionOnlineWidth: new Animated.Value(30) })
                this.setState({chatUserStatus: 'Joining'});
                this.joinConversation(confusername, chatindex); //9 july
                break;
              case 'closed':
                console.log('Offline:', event);
                break;
              case 'failed':
                this.setState({
                  flashopacity: true,
                  flashMessage: `P2P connection failed. Trying again.`,
                  flashColor: 'lightgray',
                  flashPosition: '50%',
                  textcolor: '#D21F3C',
                });
                setTimeout(() => {
                  this.setState({flashopacity: false});
                }, 3500);
                console.log('Error:', event);
                await this.handleP2PFail(index, chatindex);
                //     allConversationArr[index].clientPeer = null,
                //     allConversationArr[index].remotePeer = null,
                //     allConversationArr[index].datachannel = null,
                //     allConversationArr[index].sendChannel = null,
                //     allConversationArr[index].canOfferP2P = true,
                //     allConversationArr[index].canReceiveP2P = true,
                //     allConversationArr[index].status = ""
                // this.setState({ connectionOnlineRings: 0 })
                // Animated.timing(this.state.connectionOnlineScale, {
                //     toValue: 1,
                //     duration: 2000,
                //     useNativeDriver: false,
                // }).start();
                // this.state.connectionOnlineLeft = new Animated.Value(Number.parseInt(JSON.stringify(this.state.dotColorLocation[chatindex].ypc)));
                // this.state.connectionOnlineTop = new Animated.Value(Number.parseInt(JSON.stringify(this.state.dotColorLocation[chatindex].zpc)));
                // this.setState({ connectionOnlineFalse: 'flex', connectionOnlineTrue: 'none', connectionOnlineHeight: new Animated.Value(30), connectionOnlineWidth: new Animated.Value(30) })
                // this.setState({ chatUserStatus: "" })
                this.joinConversation(confusername, chatindex); //9 july
                break;
              default:
                console.log('Unknown:', event);
                break;
            }
          }
        }
      },
    );
    allConversationArr[index].clientPeer.addEventListener(
      'icegatheringstatechange',
      ev => {
        let connection = ev.target;
        console.log('ice state:', connection.iceGatheringState);
        switch (connection.iceGatheringState) {
          case 'gathering':
            /* collection of candidates has begun */
            console.log('begun');
            // this.sendMessage(allConversationArr[index].clientPeer.localDescription, allConversationArr[index].convid);
            break;
          case 'complete':
            /* collection of candidates is finished */
            console.log('completed');
            this.sendMessage(
              allConversationArr[index].clientPeer.localDescription,
              allConversationArr[index].convid,
            );
            break;
        }
      },
    );
    // If user is offerer let the 'negotiationneeded' event create the offer
    if (isOfferer) {
      allConversationArr[index].clientPeer.onnegotiationneeded = event => {
        console.log(
          'on negotiation needed called:',
          this.state.canOfferP2P,
          this.state.canReceiveP2P,
          confusername,
        );
        // console.log(event);
        if (
          allConversationArr[index].clientPeer.signalingState === 'stable' &&
          allConversationArr[index].remotePeer === null
        ) {
          // countt = 0;
          if (
            allConversationArr[index].canOfferP2P == true &&
            allConversationArr[index].canReceiveP2P == true
          ) {
            allConversationArr[index].clientPeer
              .createOffer()
              .then(o => this.localDescCreated(o, index))
              .catch(e => this.onError(e));
          }
        }
      };
    }
  }
  onSuccess = () => {
    console.log('success');
  };
  handleP2PClose = async index => {
    this.setState({
      canOfferP2P: true,
      canReceiveP2P: true,
      isUserTyping: false,
    });
    (allConversationArr[index].clientPeer = null),
      (allConversationArr[index].remotePeer = null),
      (allConversationArr[index].datachannel = null),
      (allConversationArr[index].sendChannel = null),
      (allConversationArr[index].canOfferP2P = true),
      (allConversationArr[index].canReceiveP2P = true),
      (allConversationArr[index].status = '');
  };
  handleP2PFail = async (index, chatindex) => {
    (allConversationArr[index].clientPeer = null),
      (allConversationArr[index].remotePeer = null),
      (allConversationArr[index].datachannel = null),
      (allConversationArr[index].sendChannel = null),
      (allConversationArr[index].canOfferP2P = true),
      (allConversationArr[index].canReceiveP2P = true),
      (allConversationArr[index].status = '');
    // this.state.filteredContactData[chatindex].status = true;
    this.setState({connectionOnlineRings: 0, isUserTyping: false});
    Animated.timing(this.state.connectionOnlineScale, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
    this.state.connectionOnlineLeft = new Animated.Value(
      Number.parseInt(
        JSON.stringify(this.state.dotColorLocation[chatindex].ypc),
      ),
    );
    this.state.connectionOnlineTop = new Animated.Value(
      Number.parseInt(
        JSON.stringify(this.state.dotColorLocation[chatindex].zpc),
      ),
    );
    this.setState({
      connectionOnlineFalse: 'flex',
      connectionOnlineTrue: 'none',
      connectionOnlineHeight: new Animated.Value(30),
      connectionOnlineWidth: new Animated.Value(30),
    });
    this.setState({chatUserStatus: ''});
  };
  handleP2PDisconnect = async (index, chatindex) => {
    this.setState({
      connectionOnlineOpacity: new Animated.Value(0.3),
      isUserTyping: false,
    });
    (allConversationArr[index].clientPeer = null),
      (allConversationArr[index].remotePeer = null),
      (allConversationArr[index].datachannel = null),
      (allConversationArr[index].sendChannel = null),
      (allConversationArr[index].canOfferP2P = true),
      (allConversationArr[index].canReceiveP2P = true),
      (allConversationArr[index].status = '');
    this.state.filteredContactData[chatindex].status = true;
    this.setState({connectionOnlineRings: 0});
    Animated.timing(this.state.connectionOnlineScale, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
    this.state.connectionOnlineLeft = new Animated.Value(
      Number.parseInt(
        JSON.stringify(this.state.dotColorLocation[chatindex].ypc),
      ),
    );
    this.state.connectionOnlineTop = new Animated.Value(
      Number.parseInt(
        JSON.stringify(this.state.dotColorLocation[chatindex].zpc),
      ),
    );
    this.setState({
      connectionOnlineFalse: 'flex',
      connectionOnlineTrue: 'none',
      connectionOnlineHeight: new Animated.Value(30),
      connectionOnlineWidth: new Animated.Value(30),
    });
  };
  displayNotifications = async (title, body) => {
    console.log('inside dsp:', title);
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        smallIcon: 'ic_small_icon',
        color: '#FFFFFF',
        channelId: await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        }),
        //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };
  changeTimeFormat = async date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Check whether AM or PM
    let newformat = hours >= 12 ? 'pm' : 'am';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + newformat;
  };

  async handleReceiveMessage(e, fcdindex) {
    // Listener for receiving messages from the peer
    console.log(
      '[INFO] Message received from peer:',
      this.state.chatConvId,
      this.state.showchatUI,
      e,
    );
    const msg = JSON.parse(e);
    console.log(
      msg[0].user.name,
      this.state.chatConvId,
      this.state.chatConvId.length,
    );
    msg[0]._id = Math.random(1000).toString();
    msg[0].user._id = 2;
    const sameuser = msg[0].user.name === this.state.chatConvId;
    let nameconvid = msg[0].user.name;
    let falseuserindex;
    this.state.filteredContactData.forEach((elmnt, index) => {
      if (elmnt.convid == nameconvid) {
        falseuserindex = index;
      }
    });
    msg[0].user.name = this.state.filteredContactData[falseuserindex].name;
    msg[0].user.replyTo.name =
      msg[0].user.replyTo.id == 1
        ? this.state.filteredContactData[falseuserindex].name
        : 'You';
    msg[0].user.replyTo.id = msg[0].user.replyTo.id == 1 ? 2 : 1;
    console.log(
      'same user:',
      sameuser,
      this.state.showchatUI,
      falseuserindex,
      this.state.appState,
      AppState.currentState,
    );
    if (msg[0].user.chatType == 'image') {
      console.log('image type');
      if (msg[0].user.messageType == 'online') {
        if (msg[0].image === 'EOF') {
          console.log('EOF received:', bufferArray.length, typeof bufferArray);
          let b64String = await this.bytesArrayToString(bufferArray);
          msg[0].image = b64String;
          bufferArray = [];
          stringg = '';
          console.log(msg[0].image.length, b64String.length);
          // this.getConversationBigData(msg,this.state.chatConvId.substring(0, 8), nameconvid, sameuser, "image",fcdindex);
          // if(getdata == "ERROR"){
          // }else{
          //   msg[0].image = getdata;
          //   console.log("getdata,text:",getdata,msg[0].image)
          this.receiveImageFile(
            msg,
            this.state.chatConvId.substring(0, 8),
            nameconvid,
            sameuser,
            falseuserindex,
          );
          // }
        } else {
          // this.setState({ chatmessages: GiftedChat.append(msg, this.state.chatmessages) });
          console.log(typeof msg[0].image, 'image obj');
          bufferArray.push(msg[0].image);
        }
      } else {
        console.log('Calling getconvbigdata');
        this.getConversationBigData(
          msg,
          this.state.chatConvId.substring(0, 8),
          nameconvid,
          sameuser,
          'image',
          falseuserindex,
        );
      }
    } else if (msg[0].user.chatType == 'video') {
      console.log('video type');
      if (msg[0].user.messageType == 'online') {
        if (msg[0].video === 'EOF') {
          console.log('EOF received:', bufferArray.length, typeof bufferArray);
          let b64String = await this.bytesArrayToString(bufferArray);
          msg[0].video = b64String;
          bufferArray = [];
          stringg = '';
          console.log(msg[0].video.length, b64String.length);
          this.receiveVideoFile(
            msg,
            this.state.chatConvId.substring(0, 8),
            nameconvid,
            sameuser,
            falseuserindex,
          );
        } else {
          // this.setState({ chatmessages: GiftedChat.append(msg, this.state.chatmessages) });
          console.log(typeof msg[0].video, 'video obj');
          bufferArray.push(msg[0].video);
        }
      } else {
        console.log('Calling getconvbigdata');
        this.receiveVideoFile(
          msg,
          this.state.chatConvId.substring(0, 8),
          nameconvid,
          sameuser,
          falseuserindex,
        );
      }
    } else if (msg[0].user.chatType == 'document') {
      console.log('doc type');
      if (msg[0].user.messageType == 'online') {
        if (msg[0].text === 'EOF') {
          console.log('EOF received:', bufferArray.length, typeof bufferArray);
          let b64String = await this.bytesArrayToString(bufferArray);
          msg[0].text = b64String;
          bufferArray = [];
          stringg = '';
          console.log(msg[0].text.length, b64String.length);

          this.receiveDocFile(
            msg,
            this.state.chatConvId.substring(0, 8),
            nameconvid,
            sameuser,
            falseuserindex,
          );
        } else {
          console.log(typeof msg[0].text, 'doc obj');
          bufferArray.push(msg[0].text);
        }
      } else {
        console.log('Calling getconvbigdata');
        this.getConversationBigData(
          msg,
          this.state.chatConvId.substring(0, 8),
          nameconvid,
          sameuser,
          'doc',
          falseuserindex,
        );
      }
    } else if (msg[0].user.chatType == 'status') {
      if (msg[0].text == 'Joined') {
        this.state.filteredContactData[this.state.chatIndex].status = 'inchat';
      } else {
        this.state.filteredContactData[this.state.chatIndex].status = true;
      }
      let idIndex = allConversationArr.findIndex(
        object => object.convid === nameconvid,
      );
      if (
        this.state.showchatUI == false &&
        msg[0].user.messageType == 'online'
      ) {
        allConversationArr[idIndex].status = msg[0].text;
        this.setState({chatUserStatus: msg[0].text + ' the chat'});
        if (msg[0].text == 'Left') {
          this.handleP2PDisconnect(idIndex, falseuserindex);
        }
      } else if (
        this.state.showchatUI == true &&
        msg[0].user.messageType == 'online' &&
        sameuser === false
      ) {
        allConversationArr[idIndex].status = msg[0].text;
        this.setState({chatUserStatus: msg[0].text + ' the chat'});
        if (msg[0].text == 'Left') {
          this.handleP2PDisconnect(idIndex, falseuserindex);
        }
      } else {
        allConversationArr[idIndex].status = msg[0].text;
        this.setState({chatUserStatus: msg[0].text + ' the chat'});
        if (msg[0].text == 'Left') {
          this.handleP2PDisconnect(idIndex, falseuserindex);
        }
      }
    } else if (msg[0].user.chatType == 'typing') {
      this.setState({isUserTyping: msg[0].text});
      // setTimeout(() => {
      //     this.setState({ isUserTyping: false })
      // }, 5000);
    } else {
      await this.saveTempMessages(msg, nameconvid);

      if (sameuser == false && this.state.showchatUI == true) {
        await this.savePendingMessages(msg, nameconvid);
        let date = new Date(msg[0].createdAt);
        let timee = await this.changeTimeFormat(date);
        await this.displayNotifications(
          `${
            this.state.filteredContactData[falseuserindex].name
          }.   ${msg[0].text.substring(0, 20)}.   ${timee}`,
          '',
        );
      } else if (sameuser == false && this.state.showchatUI == false) {
        await this.savePendingMessages(msg, nameconvid);
        let date = new Date(msg[0].createdAt);
        let timee = await this.changeTimeFormat(date);
        await this.displayNotifications(
          `${
            this.state.filteredContactData[falseuserindex].name
          }.   ${msg[0].text.substring(0, 20)}.   ${timee}`,
          '',
        );
      } else if (sameuser == true && this.state.showchatUI == true) {
        console.log('calling else:', this.state.appState);
        // this.setState({ chatmessages: GiftedChat.append(msg, this.state.chatmessages) });
        this.setState({
          chatmessages: GiftedChat.append(this.state.chatmessages, msg),
        });
        // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        if (AppState.currentState == 'background') {
          let date = new Date(msg[0].createdAt);
          let timee = await this.changeTimeFormat(date);
          await this.displayNotifications(
            `${
              this.state.filteredContactData[falseuserindex].name
            }.   ${msg[0].text.substring(0, 20)}.   ${timee}`,
            '',
          );
        }
      }
    }
  }
  savePendingMessages = async (msg, nameconvid) => {
    if (pendingonlinemsgarr.length > 0) {
      let msgIndex = pendingonlinemsgarr.findIndex(
        object => object.key === nameconvid,
      );
      console.log('msgindex:', msgIndex, pendingonlinemsgarr);
      if (msgIndex == -1) {
        pendingonlinemsgarr.push({key: nameconvid, data: [msg[0]]});
      } else {
        pendingonlinemsgarr[msgIndex].data.push(msg[0]);
      }
    } else {
      pendingonlinemsgarr.push({key: nameconvid, data: [msg[0]]});
    }
  };
  saveTempMessages = async (msg, nameconvid) => {
    if (this.state.tempMsgArr.length > 0) {
      let tmpMsgIndex = this.state.tempMsgArr.findIndex(
        object => object.key === nameconvid,
      );
      console.log('tmpmsgindex:', tmpMsgIndex, this.state.tempMsgArr);
      if (tmpMsgIndex == -1) {
        this.state.tempMsgArr.push({key: nameconvid, data: [msg[0]]});
        console.log('tmpmsgindex:', tmpMsgIndex, this.state.tempMsgArr);
      } else {
        this.state.tempMsgArr[tmpMsgIndex].data.push(msg[0]);
        console.log('tmpmsgindex:', tmpMsgIndex, this.state.tempMsgArr);
      }
    } else {
      this.state.tempMsgArr.push({key: nameconvid, data: [msg[0]]});
    }
  };
  async sendText(newmessages) {
    try {
      const {setReplyEnabled} = this.state;
      var enableReply = false;
      var replyTo = {name: '', text: ''};
      if (setReplyEnabled) {
        enableReply = true;
        if (setReplyEnabled.user.chatType == 'image') {
          replyTo = {
            name: setReplyEnabled.user.name,
            text: 'image',
            id: setReplyEnabled.user._id,
          };
        } else if (setReplyEnabled.user.chatType == 'video') {
          replyTo = {
            name: setReplyEnabled.user.name,
            text: 'video',
            id: setReplyEnabled.user._id,
          };
        } else if (setReplyEnabled.user.chatType == 'document') {
          replyTo = {
            name: setReplyEnabled.user.name,
            text: 'document',
            id: setReplyEnabled.user._id,
          };
        } else {
          replyTo = {
            name: setReplyEnabled.user.name,
            text: setReplyEnabled.text,
            id: setReplyEnabled.user._id,
          };
        }
      }
      console.log('sending msg:', allConversationArr[convIndex].sendChannel);
      var msg;
      if (allConversationArr[convIndex].sendChannel != null) {
        msg = [
          {
            _id: Math.random(1000).toString(),
            text: newmessages,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: this.state.chatConvId,
              messageType: 'online',
              chatType: 'text',
              isReplyEnabled: enableReply,
              deletemessage: false,
              replyTo: replyTo,
            },
          },
        ];
        console.log('sending online msg:', msg);
        allConversationArr[convIndex].sendChannel.send(JSON.stringify(msg));
        // this.setState({ chatmessages: GiftedChat.append(msg, this.state.chatmessages) });
        this.setState({
          chatmessages: GiftedChat.append(this.state.chatmessages, msg),
        });
        // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        let convIndexx = this.state.tempMsgArr.findIndex(
          object => object.key === this.state.chatConvId,
        );
        if (convIndexx != -1) {
          this.state.tempMsgArr[convIndexx].data.push(msg[0]);
        } else {
          this.state.tempMsgArr.push({
            key: this.state.chatConvId,
            data: [msg[0]],
          });
        }
        this.setState({setReplyEnabled: null});
      } else if (allConversationArr[convIndex].sendChannel == null) {
        msg = [
          {
            _id: Math.random(1000).toString(),
            text: newmessages,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: this.state.chatConvId,
              messageType: 'offline',
              chatType: 'text',
              isReplyEnabled: enableReply,
              deletemessage: false,
              replyTo: replyTo,
            },
          },
        ];
        this.sendMessageOffline(msg, this.state.chatConvId, msg[0]._id);
        // this.setState({ chatmessages: GiftedChat.append(msg, this.state.chatmessages) });
        this.setState({
          chatmessages: GiftedChat.append(this.state.chatmessages, msg),
        });
        // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        let convIndexx = this.state.tempMsgArr.findIndex(
          object => object.key === this.state.chatConvId,
        );
        // console.log(this.state.tempMsgArr[convIndexx])
        if (convIndexx != -1) {
          this.state.tempMsgArr[convIndexx].data.push(msg[0]);
        } else {
          this.state.tempMsgArr.push({
            key: this.state.chatConvId,
            data: [msg[0]],
          });
        }
        this.setState({setReplyEnabled: null});
      }
      let x = [];
    } catch (e) {
      console.log('send text error:', e);
    }
  }
  sendUserStatus = msgtext => {
    if (allConversationArr[convIndex].sendChannel != null) {
      let msg = [
        {
          _id: Math.random(1000).toString(),
          text: msgtext,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'online',
            chatType: 'status',
            isReplyEnabled: false,
            deletemessage: false,
            replyTo: {name: '', text: '', id: ''},
          },
        },
      ];
      console.log('sending online msg:', msg);
      allConversationArr[convIndex].sendChannel.send(JSON.stringify(msg));
    }
  };
  sendTypingStatus = msgtext => {
    // this.setOnlineStatus(confusername,typing)
    if (convIndex != null) {
      if (allConversationArr[convIndex].sendChannel != null) {
        let msg = [
          {
            _id: Math.random(1000).toString(),
            text: msgtext,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: this.state.chatConvId,
              messageType: 'online',
              chatType: 'typing',
              isReplyEnabled: false,
              deletemessage: false,
              replyTo: {name: '', text: '', id: ''},
            },
          },
        ];
        console.log('sending online msg:', msg);
        allConversationArr[convIndex].sendChannel.send(JSON.stringify(msg));
      }
    }
  };
  convertFromStringToDate = responseDate => {
    let dateComponents = responseDate.split(' ');
    let datePieces = dateComponents[0].split('-');
    let timePieces = dateComponents[1].split(':');
    console.log(dateComponents, datePieces, timePieces);
    let x =
      datePieces[2] +
      '-' +
      datePieces[0] +
      '-' +
      datePieces[1] +
      'T' +
      timePieces[0] +
      ':' +
      timePieces[1] +
      ':' +
      timePieces[2] +
      'Z';
    //    console.log(x)
    // return(Date.parse(datePieces[2], ((datePieces[1])-1), datePieces[0],
    //                      timePieces[0], timePieces[1], timePieces[2]))
    return new Date(x);
  };
  checkFlakeExpiration = async (flakeToCheck, flaketype) => {
    let xhr = null;
    xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', 'https://newauth.io/fc/' + flakeToCheck);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        const currenttime = new Date();
        console.log(currenttime);
        let x = JSON.parse(xhr.responseText);
        let flakecreattime = this.convertFromStringToDate(x.crtime);
        flakecreattime.setHours(flakecreattime.getHours() + 6);
        const diffInMs = Math.abs(currenttime - flakecreattime) / 6e4;
        console.log('diff:', parseInt(diffInMs));
        console.log('diff:', diffInMs / 60);
        if (flaketype == 'user') {
          if (diffInMs / 60 > 23) {
            console.log('user flake expired');
            this.setState({displayUserBox: 'flex', isFlakeActive: 'none'});
            // AsyncStorage.setItem('flakeondevice',null);
            // AsyncStorage.removeItem('flakeondevice');
          } else {
            console.log('user flake not expired');
            this.setState({isFlakeActive: 'flex'});
          }
        } else if (flaketype == 'random') {
          console.log('diff:', diffInMs / (60 * 24));
          if (diffInMs / (60 * 24) > 15) {
            console.log('random flake expired:'), diffInMs / (60 * 24);
            this.generateRandomFlake();
          } else {
            console.log('random flake not expired');
            this.setState({randomFlakeOnDevice: flakeToCheck});
          }
        } else if (flaketype == 'vault') {
          if (diffInMs / 60 > 23) {
            console.log('vault flake expired');
            this.setState({
              flashopacity: true,
              flashMessage:
                'Your flake has expired. Please login again to access vault.',
              flashColor: 'lightgray',
              flashPosition: '50%',
              textcolor: 'black',
            });
            setTimeout(() => {
              this.setState({flashopacity: false});
            }, 3500);
          } else {
            console.log('vault flake not expired');
            if (this.state.filteredData.length == 0) {
              this.setState({displayFlake: true, showView: false});
              this.toggleModalVisibility();
            } else {
              this.setState({displayFlake: true, showView: false});
            }
          }
        } else if (flaketype == 'check') {
          if (diffInMs / 60 > 23) {
            this.setState({
              flashopacity: true,
              flashMessage: `Flake-  ${flakeToCheck} \n Created-  ${
                flakecreattime.toLocaleDateString() +
                ' ' +
                flakecreattime.toLocaleTimeString()
              } \nflake expired`,
              flashColor: 'lightgray',
              flashPosition: '0%',
              textcolor: 'black',
            });
            setTimeout(() => {
              this.setState({flashopacity: false});
            }, 3500);
          } else {
            this.setState({
              flashopacity: true,
              flashMessage: `Flake-  ${flakeToCheck} \n Created-  ${
                flakecreattime.toLocaleDateString() +
                ' ' +
                flakecreattime.toLocaleTimeString()
              } \n${parseInt(23 - diffInMs / 60)} hours left to expire`,
              flashColor: 'lightgray',
              flashPosition: '0%',
              textcolor: 'black',
            });
            setTimeout(() => {
              this.setState({flashopacity: false});
            }, 3500);
          }
        }
      }
    };
    xhr.send(null);
  };
  checkBatteryOptimization = async () => {
    try {
      const isOptimized = await notifee.isBatteryOptimizationEnabled();
      console.log('isoptimized:', isOptimized);
      if (isOptimized == true) {
        // this.requestDisableBatteryOptimization();
      }
    } catch (error) {
      console.error('Failed to check battery optimization:', error);
    }
  };
  requestDisableBatteryOptimization = () => {
    Alert.alert(
      'Battery Optimization',
      'Battery optimization is enabled. Please disable it for better performance.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Disable',
          onPress: () => Linking.openSettings(),
        },
      ],
    );
  };
  sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
  // You can do anything in your task such as network requests, timers and so on,
  // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  // React Native will go into "paused" mode (unless there are other tasks running,
  // or there is a foreground app).
  veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; i < BackgroundService.isRunning(); i++) {
        // if (i == 0) {
        //     BackgroundService.updateNotification({ taskTitle: '', taskDesc: '' })
        // }
        confusername, false;
        console.log(
          'new service bfr zoc:',
          i,
          BackgroundService.isRunning(),
          delay,
        );
        // if(this.state.showchatUI == true){
        //     this.convertFlakeToUsername(this.state.chatPhoneNumber,false)
        // } else{
        //     this.convertFlakeToUsername(confusername,true)
        // }
        // await this.stopSSEPolling();
        // confsseeventsource.removeListener();
        // this.establishnewSSEConnection(this.findconfusers, confflake, confusername, -1);
        await this.sleep(delay)
          .then(console.log('done'))
          .catch(e => console.log('error:', e));
        console.log(
          'new service aftr zoc:',
          i,
          BackgroundService.isRunning(),
          delay,
        );
        if (AppState.currentState == 'active') {
          console.log('inside if');
          await BackgroundService.stop();
          BackgroundService.removeAllListeners();
          break;
        }
      }
      // resolve();
    });
  };
  async initBackgroundFetch() {
    // BackgroundFetch event handler.
    const onEvent = async taskId => {
      console.log('[BackgroundFetch] task: ', taskId);
      //   setInterval(async() => {
      await notifee.displayNotification({
        title: 'nida',
        body: `fetch notification`,
        android: {
          smallIcon: 'ic_small_icon',
          color: '#FFFFFF',
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
          importance: AndroidImportance.HIGH,
        },
      });
      //   }, 1200);
      // Do your background work...
      await this.addEvent(taskId);
      // IMPORTANT:  You must signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
    };
    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    const onTimeout = async taskId => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };
    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
      },
      onEvent,
      onTimeout,
    );
    console.log('[BackgroundFetch] configure status: ', status);
  }
  // Add a BackgroundFetch event to <FlatList>
  addEvent(taskId) {
    // Simulate a possibly long-running asynchronous task with a Promise.
    return new Promise((resolve, reject) => {
      this.setState(state => ({
        events: [
          ...state.events,
          {
            taskId: taskId,
            timestamp: new Date().toString(),
          },
        ],
      }));
      resolve();
    });
  }
  configureBackgroundFetch = async () => {
    const status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // Fetch interval in minutes
        stopOnTerminate: false, // Continue running after app is terminated
        startOnBoot: true, // Start on device boot
        enableHeadless: true, // Enable Headless mode
      },
      async taskId => {
        console.log('[BackgroundFetch] taskId: ', taskId);
        await this.performBackgroundTask();
        BackgroundFetch.finish(taskId);
      },
      error => {
        console.log('[BackgroundFetch] failed to start', error);
      },
    );
    switch (status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        console.log('BackgroundFetch restricted');
        break;
      case BackgroundFetch.STATUS_DENIED:
        console.log('BackgroundFetch denied');
        break;
      case BackgroundFetch.STATUS_AVAILABLE:
        console.log('BackgroundFetch is enabled');
        break;
    }
  };
  performBackgroundTask = async () => {
    try {
      console.log('Performing background task...');
      // Example: Fetch data from an API and log it
      await this.getConversation(encodedConvid, flakeTousernameAuthor, true);
      //   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      //   const data = await response.json();
      //   console.log('Fetched data:', data);
      //   await notifee.displayNotification({
      //     title: "bg",
      //     body: "fetch",
      //     android: {
      //         smallIcon: 'ic_small_icon', color: '#FFFFFF',
      //         channelId: 'default',
      //         pressAction: {
      //             id: 'default',
      //         }, importance: AndroidImportance.HIGH
      //     },
      //   });
      // For demonstration, show an alert (not recommended in production)
      if (AppState.currentState !== 'active') {
        // Alert.alert('Background Fetch', 'Background fetch executed successfully!');
      }
    } catch (error) {
      console.error('Error performing background task:', error);
    }
  };
  _handleAppStateChange = async nextAppState => {
    console.log(
      'app state:',
      AppState.currentState,
      nextAppState,
      this.state.appState,
      this.state.showchatUI,
    );
    if (
      AppState.currentState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('I should be shown only once:', AppState.currentState);
      this.setState({appState: 'active'});
      ShortcutBadge.setCount(0);
      notifee.cancelDisplayedNotifications();

      await BackgroundService.stop();
      BackgroundService.removeAllListeners();
      setTimeout(() => {
        if (confusername != null || confusername != '') {
          if (this.state.showchatUI == false) {
            this.setOnlineStatus(confusername, 'ON');
          } else {
            global.btoa = require('base-64').encode;
            let encodedId = global.btoa(this.state.chatConvId);
            this.setOnlineStatus(confusername, 'ON+' + encodedId);
            this.joinConversation(confusername, this.state.chatIndex);
          }
        }
      }, 100);
      if (getStatusInterval == null) {
        getStatusInterval = setInterval(() => {
          multipleContacts = null;
          let xx = this.state.filteredContactData.map(
            ({phoneNumber}) => phoneNumber,
          );
          xx.forEach(function (item, index) {
            if (multipleContacts == null) {
              multipleContacts = item;
            } else {
              multipleContacts += ',' + item;
            }
          });

          global.btoa = require('base-64').encode;
          encodedContacts = global.btoa(multipleContacts);

          this.timerOnGetStatusCall(encodedContacts);
          this.state.onlineOfflineIndicator[0] = true;
        }, 15000);
      }
    } else {
      console.log('app is in bg:', AppState.currentState);
      clearInterval(getStatusInterval);
      getStatusInterval = null;
      if (!BackgroundService.isRunning()) {
        await BackgroundService.start(this.veryIntensiveTask, options);
        BackgroundService.on('expiration', async () => {
          console.warn('I am being closed :(');
          await BackgroundService.start(this.veryIntensiveTask, options);
        });
      }
      this.setState({vaultvalue: null, username: '', appState: 'background'});
      if (this.state.showchatUI == true) {
        this.handleP2PClose(convIndex);
      }
      if (confusername != null || confusername != '') {
        console.log('calling set user status:', this.state.showchatUI);
        this.timerOnSetStatusCall('OFF');
      }
      if (this.state.tempMsgArr.length > 0) {
        // console.log(this.state.tempMsgArr)
        let convIndex = this.state.tempMsgArr.findIndex(
          object => object.key === this.state.chatConvId,
        );
        if (convIndex != -1) {
          if (!this.state.isCameraOpen) {
            console.log('calling save chat from bg');
            await this.saveChatInFile(
              this.state.chatConvId.substring(0, 8),
              this.state.tempMsgArr[convIndex],
              convIndex,
            );
          }
        }
      }
    }
    this.setState({appState: nextAppState});
  };

  async componentDidMount() {
    // SplashScreen.show();
    // setTimeout(() => {
    SplashScreen.hide();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    subscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    if (Platform.OS === 'ios') {
      this.configureBackgroundFetch();
    }
    // this.initBackgroundFetch();
    const setting = await notifee.requestPermission();
    // BackgroundService.start(veryIntensiveTask,options);
    this.requestPermissions();
    setTimeout(() => {
      AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
        console.log('flakeondevicee:' + asyncStorageRes);
        if (asyncStorageRes == null) {
          AsyncStorage.getItem('verifiedphone').then(asyncStorage => {
            console.log('verifiedphone', asyncStorage, typeof asyncStorage);
            if (asyncStorage == null) {
              this.setState({welcomescreenModal: true});
            } else {
              this.setState({
                welcomescreenModal: false,
                displayUserBox: 'none',
                isFlakeActive: 'none',
              });
              this.getUserInviteConnections();
              AsyncStorage.getItem('disableuserbox').then(asyncStorageRes => {
                this.setState({displayUserBox: asyncStorageRes});
              });
              confusername = asyncStorage;
              loggedInuserType = 'phone';
              AsyncStorage.getItem('dotspurchased').then(asyncStorage => {
                if (asyncStorage != null) {
                  let asyncStorageRes = JSON.parse(asyncStorage);
                  if (asyncStorageRes.status == true) {
                    this.setState({
                      PaymentDoneStatus: true,
                      CanAddContacts: asyncStorageRes.noofdots,
                    });
                  }
                } else {
                  this.getAllNewauthOrders(confusername);
                }
              });
              AsyncStorage.getItem('availabledots').then(number => {
                if (number != null) {
                  let num = JSON.parse(number);
                  this.setState({
                    AlreadyAddedContacts: this.state.CanAddContacts - num,
                  });
                }
              });
              this.getSession(asyncStorage);
              this.generateRandomFlake();
              setTimeout(() => {
                // this.getUserInviteConnections();
              }, 100);
              // this.setState({ username: asyncStorage })
              setTimeout(() => {
                if (confusername != null || confusername != '') {
                  //    this.setOnlineStatus(confusername, 'ON');
                  this.timerOnSetStatusCall('ON');
                }
              }, 200);
              // this.joinConversation(confusername);
              // AsyncStorage.removeItem('chats-'+conid+'-'+confusername);
              // AsyncStorage.getItem('chats-' + conid + '-' + confusername).then(asyncStorage => {
              //   // console.log('allchats:' + asyncStorage);
              //   if (asyncStorage !== null) {
              //     this.setState({ chatmessages: GiftedChat.append(JSON.parse(asyncStorage), this.state.chatmessages) });
              //     // this.state.messages = JSON.parse(asyncStorage);
              //   }
              // })
              // confflake = conid;
            }
          });
        } else {
          // this.initializeApis(asyncStorageRes);
          this.getUserInviteConnections();
          this.checkFlakeExpiration(asyncStorageRes, 'user');
          this.setState({welcomescreenModal: false, isFlakeActive: 'flex'});
          AsyncStorage.getItem('disableuserbox').then(asyncStorageRes => {
            this.setState({displayUserBox: asyncStorageRes});
          });
          setTimeout(() => {
            this.getSession(asyncStorageRes);
          }, 100);
          setTimeout(() => {
            // this.getUserInviteConnections();
          }, 200);
          confusername = asyncStorageRes;
          loggedInuserType = 'flake';
          setTimeout(() => {
            if (confusername != null || confusername != '') {
              //    this.setOnlineStatus(confusername, 'ON');
              this.timerOnSetStatusCall('ON');
            }
          }, 300);
          // confflake = conid;
        }
      });
    }, 2000);
    // SplashScreen.hide();
    // AsyncStorage.setItem('flakeondevice',"31245");
    dismissKeyboard();
    setInterval(() => {
      debugtimer += 1000;
    }, 1000); // Update every 1000 milliseconds (1 second)
    // AsyncStorage.removeItem('LockScreenData')
    // AsyncStorage.removeItem('dotspurchased')
    // AsyncStorage.removeItem('availabledots')
    AsyncStorage.getItem('dotspurchased').then(asyncStorage => {
      if (asyncStorage != null) {
        let asyncStorageRes = JSON.parse(asyncStorage);
        if (asyncStorageRes.status == true) {
          this.setState({
            PaymentDoneStatus: true,
            CanAddContacts: asyncStorageRes.noofdots,
          });
        } else {
          // this.getAllNewauthOrders(confusername)
        }
      }
    });
    AsyncStorage.getItem('availabledots').then(number => {
      if (number != null) {
        let num = JSON.parse(number);
        this.setState({
          AlreadyAddedContacts: this.state.CanAddContacts - num,
        });
      }
    });
    AsyncStorage.getItem('isapplockenabled').then(lockval => {
      if (JSON.parse(lockval) == true) {
        this.setState({
          showView: false,
          UnlockScreenUI: true,
          lockEnabledState: true,
        });
        AsyncStorage.getItem('LockScreenData').then(asyncst => {
          if (asyncst != null) {
            this.setState({UnlockScreenData: JSON.parse(asyncst)});
            console.log('set data', this.state.UnlockScreenData);
            this.setState({updateUIState: false});
          }
        });
        // this.setState({enableLockProcessModal:true})
        isApplLocked = true;
      }
    });
    AsyncStorage.getItem('isminiappsenabled').then(miniapp => {
      if (JSON.parse(miniapp) == true) {
        this.setState({addAppsToggleSwitch: true});
        AsyncStorage.getItem('isnotesappenabled').then(note => {
          if (note == 'flex') {
            this.state.NewauthMiniApps[0].ischecked = true;
            this.setState({displaynotesapp: 'flex'});
          }
        });
        AsyncStorage.getItem('isfoodappenabled').then(food => {
          if (food == 'flex') {
            this.state.NewauthMiniApps[1].ischecked = true;
            this.setState({displayfoodapp: 'flex'});
          }
        });
      }
    });
    // setInterval(() => {
    //     setTimeout(() => {
    //         this.setState({ imgLogo: setImgurl + '-2' })
    //     }, 2000);
    //     setTimeout(() => {
    //         this.setState({ imgLogo: setImgurl + '-3' })
    //     }, 4000);
    //     setTimeout(() => {
    //         this.setState({ imgLogo: setImgurl + '-4' })
    //     }, 6000);
    //     setTimeout(() => {
    //         this.setState({ imgLogo: setImgurl + '-5' })
    //     }, 8000);
    // }, 8000);
    // AsyncStorage.setItem('disableuserbox','none');
    // }, 1400);
    // AsyncStorage.setItem('verifiedphone',"+15037808472")
    // isMounted = true;
    // AsyncStorage.removeItem('chats-1db2cce6-7916-487d-babb-dbb110660bf3-+9637');
    // this.initializeApis();
    // this.requestPermissions();

    //from here
    // if (Platform.OS === 'android') {
    //     RNOtpVerify.getHash()
    //         .then(console.log)
    //         .catch(console.log);
    //     let msg = "7968 is your code. qikks1mvNTP"
    //     RNOtpVerify.getOtp()
    //         .then(p => RNOtpVerify.addListener(otpHandler))
    //         .catch(p => console.log(p));
    //     const otpHandler = (message) => {
    //         console.log("msg:", message)
    //         if (msg == 'Timeout Error.') {
    //             console.log("msgg:", message)
    //             // alert('Timeout. Try again')
    //             // this.setState({showOtpInput:'none',isPhoneModalVisible:false})
    //         }
    //         else {
    //             const otp = /(.{4})/g.exec(msg)[1];
    //             console.log("otp sms:", otp)
    //             this.setState({ verifyKeyInput: otp })
    //             if (this.state.verifyKeyInput == '') {
    //                 setTimeout(() => {
    //                     console.log('enter manually')
    //                     let x = 'Automatic verification failed. Please enter...';
    //                     this.setState({ verificationProcessText: x })
    //                 }, 10000);
    //             }
    //             RNOtpVerify.removeListener();
    //         }
    //         // this.getInviteSenderNum(this.state.verifyNumber,this.state.verifyKeyCode,otp)
    //         console.log("ottp:", this.state.verifyKeyInput)
    //     }
    // }
    //to here
    // this.setState({otp:otp})
    // this.setState({ otp });
    // RNOtpVerify.removeListener();
    // Keyboard.dismiss();
    //   }
    // this.getUserContacts();
    AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
      if (asyncStorageRes == null) {
        AsyncStorage.getItem('randomflakeondevice').then(gettingflake => {
          if (gettingflake == null) {
            this.generateRandomFlake();
          } else {
            this.checkFlakeExpiration(gettingflake, 'random');
          }
        });
      }
    });
    console.disableYellowBox = true;
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    AsyncStorage.getItem('devicegiveout').then(asyncStorageRes => {
      this.setState({userGiveOut: asyncStorageRes});
    });
    AsyncStorage.getItem('loggedin').then(asyncStorageRes => {
      console.log('loginvall:' + asyncStorageRes);
      if (asyncStorageRes == null) {
        this.setState({userLoggedin: 'none'});
      } else {
        this.setState({userLoggedin: asyncStorageRes});
      }
    });
    AsyncStorage.getItem(this.state.deviceflake).then(asyncStorageRes => {
      console.log('flkvall:' + asyncStorageRes);
    });
    if (this.state.displayUserBox == 'flex') {
      // setInterval(() => {
      //     this.setState({ imgLogo: setImgurl + '-2' })
      // }, 2000);
      // setInterval(() => {
      //     this.setState({ imgLogo: setImgurl + '-3' })
      // }, 3000);
      // setInterval(() => {
      //     this.setState({ imgLogo: setImgurl + '-4' })
      // }, 3000);
    } else {
      this.setState({
        imgLogo:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAFKCAYAAAB7KRYFAAAAAXNSR0IArs4c6QAAIABJREFUeF7tnQt8XFW1/9faZ5IUCpRW2sxM5kxKJQXl6lVBvaJe8YUE6UxKKQrqVa4UaVV8omIRKlrwhYgIQYpvBaXSZqZg6uMqXu/1dcUH/uVih0c7M5mZ0EoprzbJnL3+n33S9KYhM5lHMqdn8svn4+fDx5y919rfdfrLPvuxFp988snXE9GvaZb//OEPf7htliPA8EEABEoQ4JNPPvlciATeDxAAARAoTQBCibcDBEAABKYgAKHEKwICIAACEEq8AyAAAiBQHwHMKOvjh9YgAAKzgACEchYEGUMEARCojwCEsj5+aA0CIDALCEAoZ0GQMUQQAIH6CEAo6+OH1iAAArOAAIRyFgQZQwQBEKiPAISyPn5oDQIgMAsIQChnQZAxRBAAgfoIQCjr44fWIAACs4AAhHIWBBlDBAEQqI8AhLI+fmgNAiAwCwhAKGdBkDFEEACB+ghAKOvjh9YgAAKzgACEchYEGUMEARCojwCEsj5+aA0CIDALCEAoZ0GQMUQQAIH6CEAo6+OH1iAAArOAAIRyFgQZQwQBEKiPAISyPn5oDQIgMAsIQChnQZAxRBAAgfoIQCjr44fWIAACs4AAhHIWBBlDBAEQqI8AhLI+fmgNAiAwCwhAKGdBkDFEEACB+ghAKOvjh9YgAAKzgACEchYEGUMEARCojwCEsj5+aA0CIDALCEAoZ0GQMUQQAIH6CHB9zdEaBEAABJqfAISy+WOMEYIACNRJAEJZJ0A0BwEQaH4CEMrmjzFGCAIgUCcBCGWdANEcBECg+QlAKJs/xhghCIBAnQQglHUCRHMQAIHmJwChbP4YY4QgAAJ1EoBQ1gkQzUEABJqfAISy+WOMEYIACNRJAEJZJ0A0BwEQaH4CEMrmjzFGCAIgUCcBCGWdANEcBECg+QlAKJs/xhghCIBAnQQglHUCRHMQAIHmJwChbP4YY4QgAAJ1EoBQ1gkQzUEABJqfAISy+WOMEYIACNRJAEJZJ0A0BwEQaH4CEMrmjzFGCAIgUCcBCGWdANEcBECg+QlAKJs/xhghCIBAnQQglHUCRHMQAIHmJwChbP4YY4QgAAJ1EoBQ1gkQzUEABJqfAISy+WOMEYIACNRJAEJZJ0A0BwEQaH4CEMrmjzFGCAIgUCcBCGWdANEcBECg+QlAKJs/xhghCIBAnQQglHUCRHMQAIHmJwChbP4YY4QgAAJ1EoBQ1gkQzUEABJqfAISy+WOMEYIACNRJAEJZJ0A0BwEQaH4CEMrmjzFGCAIgUCcBCGWdANEcBECg+QlAKJs/xhghCIBAnQQglHUCRHMQAIHmJwChbP4YY4QgAAJ1EoBQ1gkQzUEABJqfAISy+WOMEYIACNRJAEJZJ0A0BwEQaH4CEMrmjzFGCAIgUCcBCGWdAA+p5idRy/wl8w/fvXH3nkPKLzgDAj4nAKH0eQDH3A/GI2ew8IVE0ipMvy0kslc2ydAwDBDwnACE0vMQ1O9AsDu4kFsDtwsJKeEnheg4LXLJ4JaBO+vvHT2AAAhAKJvgHQjGo89VJN8mkT3E1EHEj5Hwplwy/bkmGB6GAAKeE4BQeh6C+h1Y3LP46GFdvMMROkwRtZMSxQFrVe6O9M/q7x09gAAIQCib5B1o7+l4bYD4HSIU0kxHFh7LvpzupmKTDA/DAAFPCUAoPcU/A8ZPpUB4XmSNsNqd70t/ZwYsoEsQmHUEIJRNGPLwsvAxoqwNytLvHdg0kG3CIWJIINBQAhDKhuJunLFgT/Qc0rqzkMx+vnFWYQkEmpMAhLI54+qOKhS3e0noa/lk5g9NPEzPhvbclc894h9DT7wmoPRTA30D/+GZIzA84wQglDOO2DsDoZj9r6Qonu/LfMg7L5rTcvsbo0uUoutJSTuRWMLWpkLfjk8152gxKghlk78DwVjkChF1z+CWNA6fT2OsQ3F7LROfTSI7iWRIFLdbWi7IJrP3TqMZdHWIEIBQHiKBmCk3OpZ3LNVaXcHaWZXbknt6puzMtn7b4/bHWeRNivhZwrJNmOaQE7i0sGX7L2cbi9kwXgjlLIhyKB59F5N2consLbNguA0ZYvDsyKlc5K9pLYcp5kdJ6N58MnNeQ4zDSMMJQCgbjrzxBhd0H3fUnJahDU4LXzp4R/qhejwIxe0PCNMrlNAecfjr+TvT/1VPf35t274iuiQwQhsc0b9UineRdm7Pbcnt8ut44Hd5AhDKWfKGhJfbcXHoeflk5tO1Drk9Fo4xqauZKauF5iniJ+a3Hbn8vo33PVlrn35tF4rZl7FFf81tziT8Ogb4XTkBCGXlrHz/ZCgeuY7J+kEusePXtQzGiIOwnKmItAg7QtSmyHlbLpn7ey39+bVNON55ipDzpnwi+z6/jgF+V0cAQlkdL18/3R6PvJSJ31ZIZN5Ty0BCyyIriGU9kXpcSBYwU8ZqpRXZjdlHa+nPr22CcfsrQvKdwUT2d34dA/yujgCEsjpevn86FIteSqT/nk9mN9UwGBXusddpzS9nli7l6PMH7pxdB61DschZROr4fDJ9dQ380MSnBCCUPg1crW6Hzjq2kxznmpYirUrfld5dSz8Luhcc1do69xPKUrflNu34Yy19VNsmEoscp4VPZNZFHuLfZH/c+Fls9I3R+SMB2kCW9aH8pod3VDsGPO9fAhBK/8auZs/Dcft8TXRYIZG5sdZOzMxKmIP19FGp7YWxyHGtRF8WomOFSROpPz2177GLH//x4w395A/G7TWKaG8ukflGpb7jueYgAKFsjjhWNYrFpy6eMzSveDMp6+r85h3/W1Xj/Q9Hzox0OBZflU9k3l5L+2raBM/qOJsdtY5E0kzkiCKbhN+bT2R+VU0/9TwbWt75HNLOpW17Ahduv3v7vnr6Qlv/EYBQ+i9m0+JxsCfSrTS/LJfMXF5rh6G4/UVL5JszfW2vY1n0HK3kchIiZnlSmOewqDW17t7XMt5wzL5SK/lNoS/bX0t7tPE3AQilv+NXl/fhePRzWpz+QnLgF7V01B6336SEj8on0xtqaV9pm2DP4sVKF6/Xil6qhB8Xpf97rzz1vsf6Hnus0j7qeS4Y63i1Yqs7l0h/pJ5+0Na/BCCU/o1d3Z6HY50vFJbV+UT6wlo6MxtDoouXF/oy76ylfTVtjFiKLn6FLXV7IKDvbOSRpFA8ejML9+aSO/5Ujc94tnkIQCibJ5Y1jSQUsz/IQvnclsxttXQQjEe/TEQ3FRLp+2ppX02bYNy+rSiHX7gr+fcnqmlXz7PhZfa5milcSGauqacftPU3AQilv+NXt/fHnNUZCjj6q1oCqx5JPjxYbYehWOQtzNw60zvBx3Uf1/ZUy9Ct+WRmRbU+1vr8otix7YqLG4qWeteuTTvytfaDdv4nAKH0fwzrHoERO2JelE9krq22M3N0J8D84Xwic1G1bat53o7Z4SLzulqXCaqxNfasSQBCIo/kk9nv1dIebZqHAISyeWJZz0g4FLNNMbLrBzYP/KXajsI99o3Kkmuzd2RT1bat9Pn2eOR5iui8fCJ7aaVt6nmuY3nHP2tHvTefzKwiMvvt+JnNBCCUszn648be0RN9raPptEIy/dFqkQRj0bezIj2T5XGDyyOvIs0vLiQyX6jWv1qeD8ain7UU/WSgL41aOLUAbLI2EMomC2g9wwnFbZOC7Vf5RObH1fQTXrb4BFLOe3I1JtuoxJa5CcTER+eSma9X8nw9z4Ti9huI6JX5ROayevpB2+YhAKFsnljWPZLgsuiJypJLQosWrbrn5ntGqukwFI9u0JqvGtyy4+Fq2lX6bCgWWcXCj+S2zGz+x+eufG7rYyNP3Kwd/nxhS/pvlfqH55qbAISyueNb9ejCsch7NKknCsn0t6ppHO6JvJM0P5VLZr5fTbtKnw3Fox8jRf+V3zyzGdXNMoIifWQumf1Kpb7hueYnAKFs/hhXNcKO5R3P0lptYHLel0vkMpU2bl9u/5MSuSDfl31/pW2qec69RUT0zZk8rxk6MxQlK/AlpfSqgc0D/6jGPzzb3AQglM0d35pGF4xHz1ZEz84l0p+tpoNw3P4GkXN5JQK7aEXk+daw/IswpQqPd/2K7r67WM5WsMf+mtaBj9dy1rPSMYTj0Y9qogcLifQPK22D52YHAQjl7Ihz1aMMx+wbtZJvFvqyv6+0cShmXyTMu6YSmmCs442s1BXsUKtWYhFRfyGRLXuPOhSz+/KPZ86mu6msoFbq68Tngj2RlyjN78glM2uq6SO0PPQcclp6iHQ7K/5drq+2G07V2MSzjScAoWw88wMWw7Hwyx22VrBQiyLnp7lkLumhOweZDi2PvoIcWZFPZj5QqU8dPYtfIOK8JZfIXFKuTXss8jUWWcqsnmQiFiJFbS0X5Dc+lJ6s3eKexUcPif5KPpF+a1lfLqSW0KD9GuXoxwfuHPhNpX6b50Ix+1qy+I5q10CDMfsHTPRPmuRxxTxXj1hXD/5oe03XQavxF882lgCEsrG8D1g7rvu4o55qG/ohCS/UpPdaRHNGlLp45wxvVlQz3GA8crkS/nMumalYwEM90e+MKP5IuSt/4Xj0Zk3yfBZaRCIZUjzcMpfPSd86ecb1RT32sy2Ri8sV81p4xsJga+ucGzSZXJWkWMtduS3ZKyoZbzhmxzTLCwqJ7JWVPD/2TCQWeb5DfAMxCQsNOSRHBBT9bmCG1mmr8Q3PTi8BCOX08qy4t0XxzlMs0dcxSUGIlwhTkYl+kE9krqq4kxl+0JRfKDJ/ymndt2rnxp0VlaQ1u+akOJvry/SVcm9Rj32aJXSpCJ3ALLuY1c25vvT1pZ43n8UkdHo5IQvHIxcL8yrWst30I0wdRPy+qZL7Lly58AhreM6GgMgnssnsA9UgDa8In0Aj1veIKSRCDxLzAib6drVru9XYxLPeEIBQesOdwmd1vkg7uleJPEJEUYcoqkh97lArWhVaFnVTsOW3pG+uBFVwmf1iVnLWVFcNF65cGAyMzLnEcfS2R7YMfLVc38FlkW6leEkukbmh1HOhWOcHifX5TDJHhAvEdJgSfcVAcuCucn1XO77xfS08Y3HQsoq3WYqPcYh2K6EBEueTuS25+ythhWf8QwBC6WGsgjF7NTGdyyJmNvmUJtonzD8cTGR+4KFbB5muZcYVjNvfV9p5T25Lble5cZgUZsKipko64WYoEtblUsG5a6oiXySSLhLOkNBD+Z2Zc+k3tLeUD7XMmMf6Ci8LHy5srSeSX/E+fZ86TLVkE9m/Hipxgx/TS2DWC2Uwbp9PQicqpr/lWjPfo400PL2Iy/e2IB62W8g5ejAx+NfgyuBCGgqsMWteNFzsLfQXdjbSl1K23DU8Rf9c6Mt8qhJ/Qj3R94vmVCG5o+xsLtxjn0bCJ+QSaZPTsuRPOB69mFjuz/VlflJ25tkT/QiTnEJCvxwR+sGuZCZX/nn7E0rTX6pZgz0glKY0BPGD1R7Mr4Qfnjn0CMxqoQzGo59Uos/R5K6TPUuI7ipMsWPbiBCG4/abRChOTL1TrbE1wh9jo5pd4Y7lHS/Tos7I92U+Ufaztyd6EgvFcol02U2XcDz6SWFK5vvS95TtL2Z/Sln6RwObp97xrmVXf8x2MBa5RCnam+vD7Z1GvX9e25nVQhnqsfvIkTZmOlqYFBHvzrdmYo2eVU72Eoym+eI1zPQ/uUT2Fq9fFPecofDbc4nMu6f0ZR2p0J+it7exumB73/aSdW3al3Uey0p/qDBFMo1gj309kXVNoW+7u1Ez2c/+I0S35BPpc4hMSdvyP+G4fYNm+VY150T3/8G4iJgWHEqbblONFb+vn8DsFspl9k3C8iIm2ktKOkWUMOvLrRa+q5E1WUr+43fLyjqrWaijqKj3kb7Mg/WHfH8Ppy6eEzmy+GpNuk1brX8uJ0IHPjeruLliZl3MfG+5TEQLuo87qq1t6KZ8X+a8KWaKtw6NtF30aP8Dj5d6zmT8EZHnF5LZz0/FqPabR5HzhOh5+Rdm19K6qcV4Kj/we/8QmNVCuT8Z7GeYaIEwP05ariVWncTSzST/oTT1V3tkZCZCP1paltZopt5CIvujum2cdFJLuKNwnWb1CiaxSDhNuuVd+TsnP/A9Zs+9Cx0IXGu1yKqp/pCE4vYrReQ1hWT2k2VFsMe+Y+5Q23kP9D8wNNlzbgmItqFb833lS0CYM59M/IuplioiKyMLnBHeQMXiB/J35ic94D6ZH+F4dBmRvGFva8va3Rsf2lN3DNCBrwjMaqF0I7WOAgv+9OzQo3se3El3k1vY3t3pHTqs2wgmiewgRf3VfqJN91vQ/sboEisgq0Uob7VJb3ZjtuRu7lS2QzH7ZCL+KpPOEdOzhPgIZnVdrm/H16ZqW2l2HZOubPfIE7cXW/a9tdwZTFPhcMTiK0odUD8mZodbpigBYeIVGJnz3fktR55z38b7ym7G1ZIdKdgTOZWFz1eWXjuwaSA7FSP8vvkIQCiniKnJ/C1auoWlhYT688nsVi9fA5POTIheokh6B/oG/lyLL4vO7jzFGtJfJpYnifh4JnrSUfKZwb7slELpCuDwExuE+LNTZfIJxaKXKkW/L5clPBiPfEYUf3dwc+b/TTYWk5WItby1kMh+rNRYTYy0ppdMdQY1GI8+l0k+Or/1yFVTCeqBWXRP9CQSWSvEl0013lpigTb+IAChrDBOozWwdTcJP4dZ9weKqj991+RX7irssubH3B1bLWbtckst+R8XPnfhEYGlbTey8ElCfDixnivKOr+wqfxxngPiUWEG8PZlHa9RSv1LuY0Ps5ZJQr8vbMn+cjIgbgkIh15Sbu0xFLc/rrX+7eCWgZ+X/cyvMoN7ZEWkyynSek10zWAi+7uaA4aGvicAoawyhKGzju2kYrFbmLqVyE+LivundZOlQn/Cy8LHaMtaTVqUWG29g5sfNDd8Kv5Z8rol84aOGHqDdqw2VtymWb/MGbbW7vzR9kIlnbg1ZSz+8cDmHSXFyRzK1sr6/hHDbStLrUGGY/a/C8lj+WR202R2pyoBYdYwn2wdul1p59zcltzTJWedyztf4zjyhkprArm3blqd9Ur4tlwi/bNKmOCZ5iUAoawxtsfEjj8yoPYasezWJA+T5v7Clsz/1Nhdzc2CPdFzSGQ5C/Xmk5n/rLWjUDyynJhepZ8eWTv4k8Gnpuqn0iqFwR77E+TIf5aaMYZ77B4SOabUEahwPHIBMe8qdXc8uCzyKrL4X6c4DF9Vlcn209rnqsNb1puD6/lEdvNULPD75icAoZyGGIfj0deJ2fgZ3UHur7Y4V70uuFlsmFeT8B/zyfSGWvtzqymSHJdPlj8oPu4T/ANMMphLZG8tZdO9fUPyglxf9nOTzhjj9iuZ+JRSiSRMMl0h+XWp3exwLPIRUvzncrd2wnFzrIfbK61bHorZnxLiB3DrptY3qfnaQSinMaYm0YU42gjm8czc30pWf7kD19NomkaP0QyvJhK7qKV3Z5WZcMZ8Gd0VpsMqOY+4KHZsu+LihqKl3lVq13r+yiXz5oyMfD3fkjmHNpIzccxmg0URvSOXSE+auLdsCYiVZIVG7NuHhtrOL3XG8pizOkMBR39VS2BVJdnRw2bNlGgvauZM59vp/74glDMQw2DP4sVETjcJdRPRjyXA/YN3pB+aAVPP6DIUi5wu7uxS3TzVXetS/oR6opeSlt35ZOamqXweTWxBoXwy88WSs8qYfSWx2ppL7Pj1xGfG1gILfZl3TtY+GLO/pmnyEhDheOcpJPr0XDJzecmxxOwPslC+XEKNAzPkmH0REc+favd8Kib4ffMRgFDOYEzNzZM5rUPdxNRtarGwNseLMn+YQZNu1+ZqoKVktWYZVI7TW26To4QvHOqx15OWv02V2ce0N2chWbg3l9zxp0nFLh45g4VPmFRMLzypJTT4yO35RGZ5iU/zzfnsonPonmeWzw3F7A8Ky/2lDuGPnlSQ1flE2k0VV+7HZCgixSfm+zJrTTrLqZ7H72cXAQhlg+IdjkVf765jCjEr6p8qE850uOXuKDO/jIVvLCVipeyYT+a24ZH1SugnU2XXCcY6Xq3Y6i71+WwqO4qjbswlM2+aXAyj321j9Z6JyxRTlYAImzIMll5TqmKi+9kuTn8hOfCLcjxHM5zTaUNPtazd/TPcupmOd6/Z+oBQNjiiIXOAmVzB7GKh/r1tLf0zeSUuHIu+XJhWM8td1Ra+6jirI6IdtV5YvlHoy949hdhcqZX8ptCX7Z9UDGP2VaKkb7IbTqF49DodoOsmLk+MloDgi/OJ9Psm9mmSdLDmnnwy8/FJZ7HutU9+WbnPctOuqls3K6k15Bwb4mMW7MzdfE/Jo0gNfqVgrgEEIJQNgDyZCXMlkQNyunu8iLlftOof3LLj4Zlwx63VLWo1EweK2uqtZFNjzI/Q8s7nkNbriXl9uTRno885l84dnrNqsjOT4WV2nCyJ5vqyzyj5EIxFriDhH008XhU8y34xFeWMye6Lh3si7yXNOyab7bobW637NpCyrs5v3vG/pZi6f7RE1pJSa8s9Z9p39HS8QGt1NTPNF6IniPljU6V9m4lYok9vCEAoveF+wKr5vBzWzunmADsJpUhx/0z9AwzGoiuJZQVp6S11rrHE7OwlLHSJUrJ2YPPAtlLIgnHblHrdW0hkvjHxGbNDbnHxi/lE5i0Tf2d22oXogYnXQ83GFBMdN9kOdCge/a4j1ocmE303GbPZuU9kbizla8fyjqVa83ph+nwl9/g74vZNDtOLWNM/NOkjLaWyuZbMWybbyff4lYL5GSAAoZwBqLV2aVKFkUg3MWsW7s8l0z+tta9S7UzGJIt5tRD/Od9XWR0c05c5K6pJzitaam2po0DRN0bnjwRoA1nWh/KbHt7xDEGMRz9Hmr+f27Ljj+N/F+6xzxX9zJIQbgkIxXrikkF4WeeLSMmbJ1sTdW9OOc41LUVaVeqK6f4jQ+sV8a2V3roxdcWJ6dlMZJHIg0Tckms7NHKXTvc7gv6eSQBCeQi+FaZAFynpVsTHOkRbR4bb+svlYqx2CCddeFJLrrBzDbF0Wo70Zu/Mpirp48DtnSNH1g5+Z/LbO6HlkbPIUcdPdsQm1BNZIcSLCn2Z3vH2zB8IZlk68bPcVFYk5meUgAj22KuZ5JF8X/aOiX6bRBxk6b/nN09+JbL9be1z1RPV3bqJnBnp0pb6lhAt0aQfsoQWkFKJXF/6o5VwwzP+JwChPIRjaDYzAtpdw3w9CW0lZfVXkmC30iG5M1im1Zr5lsHN6TsraReMR/+NWbrKlXkIxu2vCMl3JiaSiKyMdOgRXp/ry7zjIKGM2Sez4jNzfel1B880o+tEy50Tj1SFe+xvqqKszd6ZHRj/fHs88lImflu5jOmhHvtTIpwqJNLfrmS87cujZyqRC0ioV0i3k1gnWkT3DbSlbzsUMuFXMgY8Uz+BWSOUZkOj1DGS+jHObA/mk7YY0N1iDrAz389a9U/8fK3VA/OpKkXHzC53yt7h3krueYfj9rtJZG4uOfm1RHMQXMh5Uz6RfcZudShuf1GTfGNwXMVCtySEpT9Y6Mu8d/w4TAkIcdQXx29yjSZb5vPzicwHnzGbjEeuY7J+MNnBdnf5oCfyERJ+qlzZ27E+zX1vPqzVXAtdSEr1TucfqFpjhXbeEWh6oXRLkhJ9lpmPEZZdAYs+lr2jsk9N78JS2rLZ4DAH2Jl5hIS3VrrGNtVYwnH7fBF6OQfUjblNB68hTtbWfOKarD+F5MGf0WPPhmL2ZWzRX3ObM4mDZolu4TQ5Kp/MHriT7paEaBm6KZ88uCREKGY/owREKBZZxcyP5yaU9A0vt+Pi0PPyycynJ/PXlAZm4qMruXXjXkUtalOv6L9zk2xMTcUSv28+Ak0vlKFY9GZieiGTPCYi84jo3nwye4HfQ2nOEZKmbsXcqZm3FvXT/buSu56oZ1zuTFBktcm3WS7RxX4bJiOPqWs96e2d9hXRJdaIXD1Mh1+wK/n3A36Z652sncvyycxBMQjF7U3zW49881hC3f0Jgr+fT2TOmvCZfoso69PjZ3gmk1MrPX2L08KXTnZV1L11Q3xiPjn1rRs3gYYo84eot9TMtB7GaOtPAs0vlPHIXSykiSliPqM0014WWSeKUq0jKuVV8t3pel3MjFkr6hbi15rMRWSNbM1vyj9jx7lSe25NmWE2SYHbRtqsG3duLJ2f0swEW9uG1itNP53sPKNJkSakrHwi/dWDPqlj9vVsqRvHn10MxaMbRiy+fGxH3exMtzhyZT6RXnVglrq88zni6DWF5MGf6KF49F1M2pksVdv+muSvHx5qW1tuQ2zhysXBliFnjTANWa1uqY1HK2WG55qfQPMLZSz6JVLyWnH0I0pZIU1yL4vcyay6RKSLmJ9i0dtIcUo7nFow54hUpWUCDqXXwxW4IbOGqczd8r+x5q3VXls8SMziHWcrUSu1kt5yt3IiZ0Y6dIDXa62/NfGqoJvX8bDWm62ArBu/3GFmeKK4pdCX+eaYzYklISYrARHssd/BWkbG3z8fzULO6/Te4Qsnrq+6VyuVevtkGz8HjbUncqrSbDa1NhYS6R8eSnGdbl8iK5Z08fDI0RkPcqdO91ga2V/TC2X4wpMOl8HBi1m4i0S2HT3nqBvu23jfk2OQzTU9p0hdzNZSFunSbP5bHjY7o0p4m1Yq5beFfFO1kUR1K5IhZt5armZNuZfNiJWlyRQ0+2u5TELhFYtPkKJzFQldNXGH2uwas6NPGn+7xsyCHeYP5xOZi8bsm7ySQvzbseTDoZj9r0zy0ty48rOhuH2TJfKF8ZUxza0esdQ9E3ft3QJqii5ly1qbu2P7/aXGGYrZFzHT8xxFvaXq9jTyH+RM2gous9ewovNI2CGmHa37+KM7frwjP5M2m6XvphfKqgO1jlT4j+Euxwp0KUeWElMXkTyLiFPClFKitunWoVRhY2Fn1X03uIE5LmOxMhnYbfNZ7rTu3Vojq6hFAAAVpElEQVSuIuKk7p1KgfC8yBoRPlZZurfUzRz37nWJ2zuhHvsaEuobn3w3FLd7LUe+OHaG0y2aJvToWEZxc2aTmRbk9hc8M2cZHYs/mE9kVh/4FI/brySmnnxf5kPjfa/k1o37jKPMHfiHc3uyN9LdVGxweBpqLrJi8Usdx7mehXaTyLAQHcdM15TKLN9Q53xgDEJZQZCOiR1zZGtgbhc52sw43ZknEztClDIzT8tytklRUjWkM6vAev2PmM9TXXTXMV9NzP1UHNlaTU1r44HJVC5CZu3yG6WyCZlqiI7IWybe3nFnd0zvHC9y7mc0STHfl/3u/v4PKgkxsQREqCfyViEOjP9cN2JLQl8bP4sdu3VjMX+v1EzarFsK0/nM1NuILE71R7C2HkzNIg5wl+NYS5n160n4LGbZa95bYjWfSffl+srXXa/NcvO1glDWGFOTcDbQ4pgMQF2aZSkzm//OG+EU1qmA0Lbxn4g1mpnWZm5yDIfNWcxuIv6rYmdrNSVvQ2eGomJZa0joH07bUO9ks1NTA0dEXl1sHVo7/vcmc7gmtb2QTG90hXHZ4hO05bx77OxkyC0JIafkEtnPur+PRz4qxAdKQJgzlcqxbshtGf2MNvfWFenF4z/N3frew23rmfkXk9XYGa3X3rba1DJnx7mx2j8W0xqMGejMPQrn/iFXXcLSxUwhEXGXkIrkZBQFLh1N6qGHmVVAaf7wQHJH2RR0M+CmL7uEUE5j2Ny0YFq6WFGX1ryUmTrctU7WKa0pVWyxtpW6Jz2NblTSFQfjEVcwlfDeSnI2ju/UzAaJ6JWs3YJmz0hE7N7eIVmaT2QuG2u3P2Xb9aydVbktuV3m/zc73VrzVeZAeXBZ9ESy6N8K+68FBnuinyWHvl3Ykv6bOZCulHx8bAfcVKAUZW1Qln7vwKaB7LhP8U8T89/zfenvTIRgZrWiyHy2/2r8rLQSWIfiM+7MecRZqsy7Jsqsq3eJ0IBSsk00pRzFqYnVQUezJemzhbnV0urnA8nKyhMfiuNvtE8QyhkkHlkZOWx4iLosRV1k/sqTO/NsEdEpxZwyL/TQSNu26bzHXe1wOpZ1/Isoq1tEOkhJv356ZGslt3NMO63YzC5/PFkW9GDcfrdimTu+qFioJ/o2Fj0/l8h+ef+s8QISftLUJndn6AHn02PnK0Mx+5Zi0brMlM8Nx+w3E8sRY+tp5g64sNo9XhDNrRst/FQhkbnhmSIZeQsxvUFpuXFgy8Bvq2Xk9fP7D+Qvdf8Am2Wf0RMbI0y8jVinHE2p1jZKZTdm93rta7Pah1A2OLJmNuSuG2nLnQWwpqXCtNvdKNKUEkul8oEd2xqdvmt0c8PqJpZXmY0fFXD6x8/WJsM0mi1IzKfsYSOaenclM7nxz4Xi0Y8Jy54DSTDcjSF7g6PoGrPD7F5HFP73fDLzATdRx7iSEKG4vTncvuice26+ZyQUs6/VLF831x7378R/KLcns2psA8ZNkiE8L59If2a8fTtmh4tmFim0t6XIvePPzJplCGvYmpd+cTpN6w6hjRxTMK3YuZTNerhykzub/80XRdvc9XDlpPavh7uzcvw0hgCEsjGcy1oJnRHq5JYWs9bp/sPYvyOZIk0pZc53FkdSjVpPcz9rrUA3aTG3U/6iRPdnk9l7yw3AzRik6c0i0jvxLGUobq8nkf/NJw9s2pwmmk4dy0wejtnf5IC+zIhyKG5/b19ri8lpSXOGizfkE+m3mk92KapP55KjiTRCMfsqVnT32CZMKBZ5KzE/J59wb90c+DFnKNkUWVP0/YmZhDpiHa/WSl0hWtoU0S4i6/J6zpzW8wqZdV8VaOnSWrpIkfl87mKiB0ZPWHBKRkZS+R/VfoGgHt/Q9v8IQCgPxbfh1FMDwXkPLVVa9s8qpEuY5ymhbeIejHdSgQClZjTJx0qygkOdpyvW3eaTlpTuL3fw3KwxKlPQTOhv4+9/m+uFAXr6KiX0s9yW0XvfoXjkaib1H+aeujnHKMy7zEHvYDz6ZQnQl8wzXKT3FxLpi4Px6Nkscow5x+nWTyf92nwie6n76b7Mjmum1xXp8I8fdE0yZq9WTCdqzb1mjXN8iOe9cd78uYGjvq9Jt7CoIVIc1CK/GJwkycZ0vxpmFlssUpeyrC42sTVndkUeF2b3a0IrThX2LNlGd9/d1EeVpptrI/qDUDaC8jTYWLJyybyn940sVUq6tJl1mHUqliGzo2nWPDVT6rA9gdT2u7fvmwZzB3XRsbzzZaZeuTCHSHS/1Ub9k66HrSQrPBJZ7c6Ite7NJXN/Nx25t3cUr9c0entnUSzyfMX8/sILMxeE/9j5z8T6vFwic8lYSQjXOI+WgAjH7c+TqFtzL9rxl+Cf7Fu0yJceSWbvdW/dkHq70v+Xbi0cCx8vypS8oAdyLdneyZYvzAyOA1ZSNM1n4l2a9R4mzuUT2bdOJ7fFpy6es3desUvtj5UWd326bXR9mlJac+rwOS3bHtqIYmbTyX2m+oJQzhTZBvRr1uBGlCxlvV84SbqEOKNYu+tZOsCp6awnHl4WPkGswOlE8koW6VcO9U/MCenO9EYrTq5mTd8am0Wa40BiOetJ09VmpzwUi76PSP/DfJKbsg7FEfXhltbi2cZvVydZukaGAz8MtOgvmE9w9xOb1LPyyfR1B27dONbaseNCZnYpit4+Wjb3mZnh3U94h03Nc1NrfRFp6tAsBUVsEqXckk9krq0nZCYJiCqajRbzh0wtZRKbzSUF0SmTV6BF87bMhDXceuyhbWMJQCgby3vGrZnD5cURWcrKMp91RjjbiXTK7JCaz3bHsVLVFBebzOH25e2LWLcZwexWLH9yhPrH55d0xTIetoUtk4n8sWG9r9dkNjKZ21nxR1mKax3L2a2k9eaApjWOkhXEnCYtcw+yp/gpEolamu8oKrpR8/CFlmPNFw6sFy2fNcXI3MsAao4pbXE0i9ObS+Qy4/sYLX1BZvnghUTcT63D/XNG5owMU3EFiTqeSP+5gkxJB7nl1v+xHPfz2ZxkIFJdTDJoPqFFO6lAC2/zcyq/GX9JfWgAQunDoFXjsklMETg8MLbLbs52mg0DNoXMRPE2pTk10vZ0quqrjcaJUynQPj96umWysJM8QYr6C5uzvxzvXzAWfbu7k66p1whbx/LO14jWb7OE1jpMr9RENmn6JSs5i4jvNiUhTHsR3kYkp4rmTaToVYooYwn9ymFaz0p9Z2Dzjp+Plswwu9r8y0Iy/a2D7C6PGJumnMaRjuL+wd3prbVcUzSH1FuGDu/SypxQGL3Sykwihp8evZVVfLqYquRIVTVxw7OHFgEI5aEVj4Z407782YssZ2T/P35aSu5uO+80O60iaptlFc1GkfkElkodcuuHKzmdRNqJqL9tfqB/+zdH10tH75ybgmbyM3NlcfT2Dr+62Lp3bWB4zhfYUjdrR39EEZs1yC7Txpwz1SQXKEt9Thx9YbF134cDw4etZxb31o250sjEr3NEesdKTix+x+I5Q7uL3UQmg5IMsqj+KnNKcsfyji7HCXQx66XuCQSWhWR2nxW5f1QcqyU1uPnBRyrlgueagwCEsjniWPcozO0Xy9Jd5B5PMjMn7mQzazKfk6S3BYqUmmw9cqLh/XXATyfil5sEwJbmfrM2Z8ryDmm9mljmmoJmTkC9hkSOFyU/ZU0Lwu3td5ozk+P7Gz1bOXimKHqUNb/e3LqxivrnjsVmFvlUm1K92/u2P2bWah0l3SbhLpH8Nym1dao63caO2WQqBsxxHOXe3xeTAEVkx+hBbko5jkrNVK31ugOGDhpKAELZUNz+MXZc93FtT8wZ6jJHlNzPdc3ms/MwdtfhdEoCvG2OtlJGqCYblVnHU6poapWbWeY9YnG/OWTuVnIkdZ5W3Mtan8BW4K7JStuO79Ot6+MU3yhK3a+0rCbSt5osQ27OSsct73sSMW3VOtBfav3VCPU+5XRx0azf7s9FKrSXzZU/GT2ac+S+ttQD/Q8M+SdK8LRRBCCUjSLdBHZMcuCRYepS7vk/1aXNlUziJ9wjL+Z8p/C2jvaFqYNmhhee1BIuPNJNik4XkT3m1o85N0lmV7xY/HylB+ndhByBwCUk3GvOVRK7B+LnkaatueCifho3GzUz0YHBnV2KZak5yO0epSI5UpkNLXPvXijV0upe+UMW8yZ4LxsxBAhlIyg3sQ2zu+3oli5zvnN/4mOztvfggZslAWvb2IwxtDz6CnPjh0SOYcX9k2X4KYfKPQLEcgYZoVXcn9+c/i/zvJlxctFZeuBmE9Oz3cP5Zp3TbLiokdTE3fAmDgmGNgMEIJQzALWpulxHitaRrnhM5tD5vsVdpPT+UhvuXeUFoxtFJpMSp8yWdii48PcT1ySnsmFmivlC/iXELTKaHGL/lU+mR80uvlkWIK1SuTnbU42+Kz+V7179vv2058+15u56nZZAm3KK9+a25Epme/fKRz/YhVD6IUoe+BhcFjEVHt9BJIcz8Y8GSpSlrcQ1N/tN2/DotT1FXUpTSy6ZubySthOfCcfsK7WiETeBiOLU0FBrysvsS7WMoVFtTCXLx4Yfv0GEX8YkllY04Fi0eqePyzU3it1EOxBKr8gf4nZDMbuXSSJE1GFcFSU3Mam6yuGOH3KuL3NbLQjCy+xza2k3G9sI0bHEcgETPUbEJtvQIiG5YXxN9dnIpZYxQyhroTYL2kAo/R9kUXQsCb2TSfbsF8p2YnV9LrHjFv+PrrEjgFA2lrdvrE3np7dvBt1kjppP793DT36FRE4xn95ElFOaLhor6NZkw53R4UAoZxRvE3Re7WZOEwy5mYbQ/rbnz7We2P16EqeNhP48ltGpmcbYiLFAKBtBGTZAAAR8TQBC6evwwXkQAIFGEIBQTkE5vMz+urCcbx5jol25ZHZhIwIDGyDQKAIn9Jxw0h558vckpIhJz+MjXnJ/3/33NMq+H+xAKP0QJfgIAiDgKQEIpaf4YRwEQMAPBCCUfogSfAQBEPCUAITSU/wwDgIg4AcCEEo/RAk+ggAIeEoAQukpfhgHARDwAwEIpR+iBB9BAAQ8JQCh9BQ/jIMACPiBAITSD1GCjyAAAp4SgFB6ih/GQQAE/EAAQumHKMFHEAABTwlAKD3FD+MgAAJ+IACh9EOU4CMIgICnBCCUnuKHcRAAAT8QgFD6IUrwEQRAwFMCEEpP8cM4CICAHwhAKP0QJfgIAiDgKQEIpaf4YRwEQMAPBCCUfogSfAQBEPCUAITSU/wwDgIg4AcCEEo/RAk+ggAIeEoAQukpfhgHARDwAwEIpR+iBB9BAAQ8JQCh9BQ/jIMACPiBAITSD1GCjyAAAp4SgFB6ih/GQQAE/EAAQumHKMFHEAABTwlAKD3FD+MgAAJ+IACh9EOU4CMIgICnBCCUnuKHcRAAAT8QgFD6IUrwEQRAwFMCEEpP8cM4CICAHwhAKP0QJfgIAiDgKQEIpaf4YRwEQMAPBCCUfogSfAQBEPCUAITSU/wwDgIg4AcCEEo/RAk+ggAIeEoAQukpfhgHARDwAwEIpR+iBB9BAAQ8JQCh9BQ/jIMACPiBAITSD1GCjyAAAp4SgFB6ih/GQQAE/EAAQumHKMFHEAABTwlAKD3FD+MgAAJ+IACh9EOU4CMIgICnBCCUnuKHcRAAAT8QgFD6IUrwEQRAwFMCEEpP8cM4CICAHwhAKP0QJfgIAiDgKQEIpaf4YRwEQMAPBCCUfogSfAQBEPCUAITSU/wwDgIg4AcCEEo/RAk+ggAIeEoAQukpfhgHARDwAwEIpR+iBB9BAAQ8JQCh9BQ/jIMACPiBAITSD1GCjyAAAp4SgFB6ih/GQQAE/EAAQumHKMFHEAABTwlAKD3FD+MgAAJ+IACh9EOU4CMIgICnBCCUnuKHcRAAAT8QgFD6IUrwEQRAwFMCEEpP8cM4CICAHwhAKP0QJfgIAiDgKQEIpaf4YRwEQMAPBCCUfogSfAQBEPCUAITSU/wwDgIg4AcCEEo/RAk+ggAIeEoAQukpfhgHARDwAwEIpR+iBB9BAAQ8JQCh9BQ/jIMACPiBAITSD1GCjyAAAp4SgFB6ih/GQQAE/EAAQumHKMFHEAABTwlAKD3FD+MgAAJ+IACh9EOU4CMIgICnBCCUnuKHcRAAAT8QgFD6IUrwEQRAwFMCEEpP8cM4CICAHwhAKP0QJfgIAiDgKQEIpaf4YRwEQMAPBCCUfogSfAQBEPCUAITSU/wwDgIg4AcCEEo/RAk+ggAIeEoAQukpfhgHARDwAwEIpR+iBB9BAAQ8JQCh9BQ/jIMACPiBAITSD1GCjyAAAp4SgFB6ih/GQQAE/EAAQumHKMFHEAABTwlAKD3FD+MgAAJ+IACh9EOU4CMIgICnBCCUnuKHcRAAgUOdwMknn3wuhPJQjxL8AwEQ8JQAhNJT/DAOAiDgBwIQSj9ECT6CAAh4SgBC6Sl+GAcBEPADAQilH6IEH0EABDwlAKH0FD+MgwAI+IEAhNIPUYKPIAACnhKAUHqKH8ZBAAT8QABC6YcowUcQAAFPCUAoPcUP4yAAAn4gAKH0Q5TgIwiAgKcEIJSe4odxEAABPxCAUPohSvARBEDAUwIQSk/xwzgIgIAfCEAo/RAl+AgCIOApAQilp/hhHARAwA8EIJR+iBJ8BAEQ8JQAhNJT/DAOAiDgBwIQSj9ECT6CAAh4SgBC6Sl+GAcBEPADAQilH6IEH0EABDwlAKH0FD+MgwAI+IEAhNIPUYKPIAACnhKAUHqKH8ZBAAT8QABC6YcowUcQAAFPCUAoPcUP4yAAAn4gAKH0Q5TgIwiAgKcEIJSe4odxEAABPxCAUPohSvARBEDAUwIQSk/xwzgIgIAfCEAo/RAl+AgCIOApAQilp/hhHARAwA8EIJR+iBJ8BAEQ8JQAhNJT/DAOAiDgBwIQSj9ECT6CAAh4SgBC6Sl+GAcBEPADAQilH6IEH0EABDwlAKH0FD+MgwAI+IEAhNIPUYKPIAACnhKAUHqKH8ZBAAT8QABC6YcowUcQAAFPCUAoPcUP4yAAAn4gAKH0Q5TgIwiAgKcEIJSe4odxEAABPxCAUPohSvARBEDAUwIQSk/xwzgIgIAfCEAo/RAl+AgCIOApAQilp/hhHARAwA8EIJR+iBJ8BAEQ8JQAhNJT/DAOAiDgBwIQSj9ECT6CAAh4SgBC6Sl+GAcBEPADAQilH6IEH0EABDwlAKH0FD+MgwAI+IEAhNIPUYKPIAACnhKAUHqKH8ZBAAT8QABC6YcowUcQAAFPCUAoPcUP4yAAAn4gAKH0Q5TgIwiAgKcEIJSe4odxEAABPxCAUPohSvARBEDAUwIQSk/xwzgIgIAfCEAo/RAl+AgCIOApAQilp/hhHARAwA8EIJR+iBJ8BIFZTsAIlccITvn/iiKY27NhEicAAAAASUVORK5CYII=',
      });
    }
    this.fadeAnimation();
    console.log('l,t:', this.state.startChatLeft, this.state.startChatTop);
  }
  // get session
  getSession = flk => {
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    let rp = JSON.stringify({
      flake: flk,
    });
    xhr.onreadystatechange = () => {
      console.log('get session:', xhr.readyState, xhr.status);
      if ((xhr.readyState == 4, xhr.status == 200)) {
        // console.log("vn init:", xhr.responseText);
      }
    };
    xhr.open('POST', CONTENT_URL);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log('init pckt:', rp);
    xhr.send(rp);
  };
  //delete user graph
  initializeApis = flk => {
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    let rp = JSON.stringify({
      flake: flk,
    });
    xhr.onreadystatechange = () => {
      console.log('dlt user graph:', xhr.readyState, xhr.status);
      if ((xhr.readyState == 4, xhr.status == 200)) {
        console.log('graph:', xhr.responseText);
      }
    };
    xhr.open('POST', 'https://newauth.io/newauth/api/deleteuserfromgraph');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log('graph pckt:', rp);
    // xhr.send(rp);
  };
  //delete user graph
  deleteUserFromGraph = async (convarr, flake, dltvals) => {
    if (convarr.length > 0) {
      this.setState({removingContactsView: 'flex'});
      let convids = null;
      await convarr.forEach(function (item, index) {
        //   console.log(item,index)
        if (convids == null) {
          convids = item;
        } else {
          convids += ',' + item;
        }
      });
      console.log(convids);
      global.btoa = require('base-64').encode;
      let encodedconvid = global.btoa(convids);
      console.log(convids, flake, encodedconvid);
      var xhr = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
      // let rp = JSON.stringify(
      //     {
      //         "flake": flk
      //     }
      // );
      xhr.onreadystatechange = () => {
        console.log('dlt user from conv:', xhr.readyState, xhr.status);
        if ((xhr.readyState == 4, xhr.status == 200)) {
          console.log('graph conv:', xhr.responseText);
          console.log('Conversation removed.');
          this.setState({
            flashopacity: true,
            flashMessage: `User removed successfully.`,
            flashColor: 'lightgray',
            flashPosition: '50%',
            textcolor: 'green',
          });
          setTimeout(() => {
            this.setState({flashopacity: false});
          }, 3500);
          // switchcolorcounter-=1;
          // if(switchcolorcounter==0){
          //     this.setState({changeSwitchColor:false})
          // }
        } else if (xhr.readyState == 4 && xhr.status == 500) {
          this.state.filteredContactData =
            this.state.filteredContactData.concat(dltvals);
          this.state.filteredContactData.forEach(element => {
            element.checked = true;
          });
          this.forceUpdate();
          console.log('error removing user 500');
          this.setState({
            flashopacity: true,
            flashMessage: `Server error. Please try again.`,
            flashColor: 'lightgray',
            flashPosition: '50%',
            textcolor: '#D21F3C',
          });
          setTimeout(() => {
            this.setState({flashopacity: false});
          }, 3500);
          // existingusersconnection.send(null);
        } else if (xhr.readyState == 4 && xhr.status == 400) {
          this.state.filteredContactData =
            this.state.filteredContactData.concat(dltvals);
          this.state.filteredContactData.forEach(element => {
            element.checked = true;
          });
          this.forceUpdate();
          console.log('error removing user 500');
          this.setState({
            flashopacity: true,
            flashMessage: `Something went wrong. Please try again.`,
            flashColor: 'lightgray',
            flashPosition: '50%',
            textcolor: '#D21F3C',
          });
          setTimeout(() => {
            this.setState({flashopacity: false});
          }, 3500);
          // existingusersconnection.send(null);
        } else if (xhr.readyState == 4 && xhr.status == 0) {
          this.state.filteredContactData =
            this.state.filteredContactData.concat(dltvals);
          this.state.filteredContactData.forEach(element => {
            element.checked = true;
          });
          this.forceUpdate();
          console.log('error removing user 500');
          this.setState({
            flashopacity: true,
            flashMessage: `Please check your internet connection.`,
            flashColor: 'lightgray',
            flashPosition: '50%',
            textcolor: '#D21F3C',
          });
          setTimeout(() => {
            this.setState({flashopacity: false});
          }, 3500);
          // existingusersconnection.send(null);
        }
        return new Promise(resolve => {
          resolve(console.log(`conversation deleted`));
        });
      };
      xhr.open(
        'GET',
        'https://newauth.io/newauth/api/deleteuserfromconversation/' +
          encodedconvid +
          '/' +
          confusername,
      );
      // console.log('https://newauth.io/newauth/api/deleteuserfromconversation/'+convid+'/'+confusername)
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/json');
      // console.log("graph pckt:", rp)
      xhr.send(null);
    } else {
      return new Promise(resolve => {
        resolve(console.log(`conversation null`));
      });
    }
  };
  timerOnSetStatusCall = onlinestatus => {
    const currentTime = new Date().getTime();
    const timeSinceLastCall = currentTime - lastCallTime;
    if (timeSinceLastCall >= 5000) {
      // Make the API call here
      console.log('Calling Set API...', timeSinceLastCall);
      this.setOnlineStatus(confusername, onlinestatus);
      // Update the last call time
      lastCallTime = currentTime;
    } else {
      console.log('Set API call blocked. Wait for at least 3 seconds.');
    }
  };
  timerOnGetStatusCall = encodedContacts => {
    const currentTime = new Date().getTime();
    const timeSinceLastCall = currentTime - lastGetCallTime;
    if (timeSinceLastCall >= 15000) {
      // Make the API call here
      console.log('Calling Get API...', timeSinceLastCall);
      this.getOnlineStatus(encodedContacts);
      // Update the last call time
      lastGetCallTime = currentTime;
    } else {
      console.log('Get API call blocked. Wait for at least 3 seconds.');
    }
  };
  timerOnSendTypingStatusCall = text => {
    if (convIndex != null) {
      if (allConversationArr[convIndex].sendChannel != null) {
        if (text.length > 0 && !this.state.isSenderTyping) {
          this.setState({isSenderTyping: true});
          this.sendTypingStatus(true);
        } else if (text.length === 0 && this.state.isSenderTyping) {
          this.setState({isSenderTyping: false});
          this.sendTypingStatus(false);
        }

        // const currentTime = new Date().getTime();
        // const timeSinceLastCall = currentTime - lastCallTimeForTyping;
        // if (timeSinceLastCall >= 5000) {
        //     // Make the API call here
        //     console.log("Calling API...", timeSinceLastCall);
        //     this.sendTypingStatus(typingstatus);
        //     // Update the last call time
        //     lastCallTimeForTyping = currentTime;
        // } else {
        //     console.log("API call blocked. Wait for at least 5 seconds.");
        // }
      }
    }
  };
  setOnlineStatus = async (user, status) => {
    console.log('calling set online status');
    console.log('user,status:', user, status);
    //don't encode number or flake
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = () => {
      console.log('set status:', xhr.readyState, xhr.status);
      console.log(xhr.responseText, typeof xhr.responseText);
    };
    xhr.open(
      'GET',
      'https://newauth.io//newauth/api/setuseronlinestatus/' +
        user +
        '/' +
        status,
    );
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (confusername.length > 0) {
      xhr.send(null);
    }
    console.log(
      'https://newauth.io//newauth/api/setuseronlinestatus/' +
        user +
        '/' +
        status,
    );
  };
  getOnlineStatus = users => {
    if (AppState.currentState == 'active') {
      console.log('calling get online status:', users.length);
      // encode number or flake
      var xhr = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.onreadystatechange = () => {
        // console.log("get status:", xhr.readyState, xhr.status)
        if (xhr.readyState == 4 && xhr.status == 200) {
          // console.log(xhr.responseText, typeof (xhr.responseText))
          let resp = JSON.parse(xhr.responseText);
          this.state.filteredContactData.forEach((element, index) => {
            if (resp.hasOwnProperty(element.phoneNumber) == true) {
              if (resp[element.phoneNumber] == 'ON') {
                element.status = true;
                // let x = Number.parseInt(JSON.parse(JSON.stringify(element.scale)))
                // Animated.loop(
                //     Animated.sequence([
                //       Animated.timing(element.scale, {
                //         toValue: x*1.2,
                //         duration: 1500,
                //         // ease: Easing.linear,
                //         useNativeDriver: false
                //       }),
                //       Animated.timing(element.scale, {
                //         toValue: x,
                //         duration: 1500,
                //         // ease: Easing.linear,
                //         useNativeDriver: false
                //       })
                //     ])
                //   ).start();
                // index = setInterval(() => {
                // Animated.timing(element.scale, {
                //     toValue: 2,
                //     duration: 1000,
                //     useNativeDriver: false,
                // }).start();
                // setTimeout(async () => {
                //     Animated.timing(element.scale, {
                //         toValue: 1,
                //         duration: 1000,
                //         useNativeDriver: false,
                //     }).start();
                // }, 1000);
                // }, 2000);
                this.setState({updateUIState: false});
                // element.color = 'skyblue'
                // console.log(element);
              } else if (
                resp[element.phoneNumber].length > 3 &&
                resp[element.phoneNumber] != 'typingY' &&
                resp[element.phoneNumber] != 'typingN'
              ) {
                element.status = 'inchat';
                this.forceUpdate();
                this.setState({updateUIState: false});
                // element.color = 'skyblue'
                // console.log(element);
                // clearInterval(index);
              } else {
                element.status = false;
                this.forceUpdate();
                // clearInterval(index);
                this.setState({updateUIState: false});
              }
            } else {
              element.status = false;
              this.forceUpdate();
              // clearInterval(index);
              this.setState({updateUIState: false});
            }
          });
          // this.forceUpdate();
          // console.log(this.state.filteredContactData)
        }
      };
      xhr.open(
        'GET',
        'https://newauth.io//newauth/api/getuseronlinestatus/' + users,
      );
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(null);
    }
  };
  inviteInternalUserWithPhone = flaketoinvite => {
    let loggedinuserphone = null;
    AsyncStorage.getItem('verifiedphone').then(asyncStorageRes => {
      if (asyncStorageRes == null) {
        alert('Verify number to invite friends.');
        loggedinuserphone = null;
      } else {
        loggedinuserphone = asyncStorageRes;
        var reqpacket = JSON.stringify({
          sender: {
            phoneNumber: [loggedinuserphone],
            flake: this.state.randomFlakeOnDevice,
          },
          receiver: {
            flake: flaketoinvite,
          },
          message: 'Invited',
        });
        console.log(reqpacket);
        if (loggedinuserphone != null && flaketoinvite.length > 0) {
          xhr.send(reqpacket);
          console.log(reqpacket);
          this.setState({inviteInternalUserModal: false});
        } else {
          // alert("something missing in request.")
        }
      }
    });
    if (flaketoinvite == null || flaketoinvite.length == 0) return false;
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    global.atob = require('base-64').decode;
    xhr.onreadystatechange = () => {
      console.log('flkfrnd:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var jsonres = xhr.responseText;
        //alert(jsonres);
        let userGraph = JSON.parse(global.atob(jsonres));
        console.log(userGraph);
        this.setState({
          flashopacity: true,
          flashMessage: `Invite sent successfully.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      } else if (xhr.readyState == 4 && xhr.status == 500) {
        this.setState({
          flashopacity: true,
          flashMessage: `Server error. Please try again later.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      }
    };
    xhr.open('POST', 'https://newauth.io/newauth/api/invite/internaluser');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
  };
  inviteInternalUserWithFlake = flaketoinvite => {
    let loggedinuserflake = null;
    AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
      if (asyncStorageRes == null) {
        alert('login first to invite friends.');
        loggedinuserflake = null;
      } else {
        loggedinuserflake = asyncStorageRes;
        var reqpacket = JSON.stringify({
          sender: {flake: loggedinuserflake},
          receiver: {
            flake: flaketoinvite,
          },
          message: 'Invited',
        });
        console.log(reqpacket);
        if (loggedinuserflake != null && flaketoinvite.length > 0) {
          xhr.send(reqpacket);
          this.setState({inviteInternalUserModal: false});
        } else {
          alert('please enter flake');
        }
      }
    });
    if (flaketoinvite == null || flaketoinvite.length == 0) return false;
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    global.atob = require('base-64').decode;
    xhr.onreadystatechange = () => {
      console.log('flkfrnd:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var jsonres = xhr.responseText;
        //alert(jsonres);
        let userGraph = JSON.parse(global.atob(jsonres));
        console.log(userGraph);
        this.setState({
          flashopacity: true,
          flashMessage: `Invite sent successfully.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      } else if (xhr.readyState == 4 && xhr.status == 500) {
        this.setState({
          flashopacity: true,
          flashMessage: `Server error. Please try again later.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      }
    };
    xhr.open('POST', 'https://newauth.io/newauth/api/invite/internaluser');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
  };
  inviteInternalUser = flaketoinvite => {
    let loggedinuserflake = null;
    AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
      if (asyncStorageRes == null) {
        AsyncStorage.getItem('verifiedphone').then(asyncStorageRes => {
          let loggedinuserphone = null;
          if (asyncStorageRes == null) {
            alert(
              'Please login or verify your phone number to invite friends.',
            );
            loggedinuserphone = null;
          } else {
            loggedinuserphone = asyncStorageRes;
            var reqpacket = JSON.stringify({
              sender: {
                flake: this.state.randomFlakeOnDevice,
                phones: [asyncStorageRes],
              },
              receiver: {
                flake: flaketoinvite,
              },
              message: 'Invited',
            });
            console.log(reqpacket);
            if (loggedinuserphone != null && flaketoinvite.length > 0) {
              xhr.send(reqpacket);
              console.log(reqpacket);
              this.setState({inviteInternalUserModal: false});
            } else {
              alert('please enter flake');
            }
          }
        });
      } else {
        loggedinuserflake = asyncStorageRes;
        var reqpacket = JSON.stringify({
          sender: {flake: loggedinuserflake},
          receiver: {
            flake: flaketoinvite,
          },
          message: 'Invited',
        });
        console.log(reqpacket);
        if (loggedinuserflake != null && flaketoinvite.length > 0) {
          xhr.send(reqpacket);
          this.setState({inviteInternalUserModal: false});
        } else {
          alert('please enter flake');
        }
      }
    });
    if (flaketoinvite == null || flaketoinvite.length == 0) return false;
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    global.atob = require('base-64').decode;
    xhr.onreadystatechange = () => {
      console.log('flkfrnd:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var jsonres = xhr.responseText;
        //alert(jsonres);
        let userGraph = JSON.parse(global.atob(jsonres));
        console.log(userGraph);
        this.setState({
          flashopacity: true,
          flashMessage: `Invite sent successfully.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      } else if (xhr.readyState == 4 && xhr.status == 500) {
        this.setState({
          flashopacity: true,
          flashMessage: `Server error. Please try again later.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      }
    };
    xhr.open('POST', 'https://newauth.io/newauth/api/invite/internaluser');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
  };
  acceptInvite = async relId => {
    console.log('inside accept');
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    let reqpacket = JSON.stringify({
      relationid: relId,
    });
    xhr.onreadystatechange = async () => {
      console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.setState({
          flashopacity: true,
          flashMessage: `Request has been accepted successfully.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
          let x = allConversationArr.map(item => item['convid']);
          multiconvids = null;
          // for(let i=0)
          x.forEach(function (item, index) {
            //   console.log(item,index)
            if (multiconvids == null) {
              multiconvids = item;
            } else {
              multiconvids += ',' + item;
            }
          });
          console.log(multiconvids);
          global.btoa = require('base-64').encode;
          encodedConvid = global.btoa(multiconvids);
          console.log(encodedConvid);
          this.forceUpdate();
          // setTimeout(() => {
          //     // pendingmessagesnotificationarray = [];
          //     // this.joinConversation(confusername);
          //     if(multiconvids != null){
          //     //   this.joinConversation(confusername, connectionIndex)
          //     }
          // },300);
          this.startPeerChat(connectionIndex);
        }, 3500);
        var cId = xhr.responseText;
        this.state.filteredContactData[connectionIndex].tag = 'conversation';
        this.state.filteredContactData[connectionIndex].convid = cId;
        allConversationArr.push({
          convid: cId,
          clientPeer: null,
          remotePeer: null,
          datachannel: null,
          sendChannel: null,
          status: '',
        });
        pendingonlinemsgarr.push({key: cId, data: []});
        this.setState({updateUIState: false});
      } else if (xhr.status == 500 || xhr.status == 404 || xhr.status == 400) {
        this.setState({
          flashopacity: true,
          flashMessage: `Something went wrong. Please try again later.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      }
    };
    xhr.open('POST', 'https://newauth.io/newauth/api/acceptinvite');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(reqpacket);
    xhr.send(reqpacket);
    this.setState({acptDenyAlrt: false});
  };
  denyInvite = async relId => {
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    let reqpacket = JSON.stringify({
      relationid: relId,
    });
    xhr.onreadystatechange = async () => {
      console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.setState({
          flashopacity: true,
          flashMessage: `Request has been denied successfully.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
        // alert('request denied successfully.' + connectionIndex)
        this.state.showCnctn[connectionIndex] = 'none';
        this.state.filteredContactData.splice(connectionIndex, 1);
        // arr.splice(connectionIndex, 1);
        this.state.dotColorLocation.splice(connectionIndex, 1);
        var userGraph;
        var jsonres = await xhr.responseText;
        global.atob = require('base-64').decode;
        userGraph = JSON.parse(global.atob(jsonres));
        console.log(userGraph);
      } else if (xhr.status == 500 || xhr.status == 404 || xhr.status == 400) {
        this.setState({
          flashopacity: true,
          flashMessage: `Something went wrong. Please try again later.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      }
      return new Promise(resolve => {
        resolve(console.log(`invite deleted`));
      });
    };
    xhr.open('POST', 'https://newauth.io/newauth/api/declineinvite');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(reqpacket);
    console.log(reqpacket);
    this.setState({acptDenyAlrt: false});
  };
  acceptDenyInvite = conn => {
    connectionIndex = conn;
    console.log('connectionIndex:' + connectionIndex);
    console.log(this.state.showCnctn);
    this.state.inviteRelationId = this.state.filteredContactData[conn]['relId'];
    // this.state.inviteName = this.state.userConnectionData[conn]["name"];
    this.state.invitePhoneNumber =
      this.state.filteredContactData[conn]['phoneNumber'];
    this.state.inviteName = this.state.filteredContactData[conn]['name'];
    this.setState({acptDenyAlrt: true});
    console.log(this.state.inviteRelationId, this.state.invitePhoneNumber);
  };
  async getUserInviteConnections() {
    userGraph = {
      maparr: [],
      edgearr: [],
    };
    let reqpacket;
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = () => {
      console.log('getinviteconnections' + xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var userconnection;
        var jsonres = xhr.responseText;
        // if (!global.atob) {
        global.atob = require('base-64').decode;
        userconnection = JSON.parse(global.atob(jsonres));
        // }
        console.log(userconnection);
        // console.log('graph length:' + userconnection['@value'].length)
        //new code start
        let selfUserId = userconnection['@value'][0]['@value'][1]['@value'];
        // console.log(selfUserId)
        console.log('outside for loop', userconnection['@value'][1]);
        if (userconnection['@value'][1] != undefined) {
          for (let i = 1; i < userconnection['@value'].length; i++) {
            console.log('inside for loop');
            let type = userconnection['@value'][i]['@type'];
            if (type == 'g:Map') {
              console.log(type);
              let phnindex =
                userconnection['@value'][i]['@value'].indexOf('phone');
              let flkindex =
                userconnection['@value'][i]['@value'].indexOf('flake');
              let fullnameindex =
                userconnection['@value'][i]['@value'].indexOf('fullName');
              console.log(
                'phone flake name index:',
                phnindex,
                flkindex,
                fullnameindex,
              );
              if (userconnection['@value'][i]['@value'][3] == 'user') {
                let x;
                if (phnindex == -1) {
                  x = {
                    label: 'user',
                    outV: userconnection['@value'][i]['@value'][1]['@value'],
                    label: userconnection['@value'][i]['@value'][3],
                    phone:
                      userconnection['@value'][i]['@value'][flkindex + 1][
                        '@value'
                      ][0],
                    name: userconnection['@value'][i]['@value'][
                      fullnameindex + 1
                    ]['@value'][0],
                  };
                } else {
                  x = {
                    label: 'user',
                    outV: userconnection['@value'][i]['@value'][1]['@value'],
                    label: userconnection['@value'][i]['@value'][3],
                    phone:
                      userconnection['@value'][i]['@value'][phnindex + 1][
                        '@value'
                      ][0],
                    name: userconnection['@value'][i]['@value'][
                      fullnameindex + 1
                    ]['@value'][0],
                  };
                }
                // console.log('x:', x)
                userGraph.maparr.push(x);
              } else if (
                userconnection['@value'][i]['@value'][3] == 'conversation'
              ) {
                let convidindex =
                  userconnection['@value'][i]['@value'].indexOf('convid');
                let partiesindex =
                  userconnection['@value'][i]['@value'].indexOf('parties');
                let y = {
                  label: 'conversation',
                  inV: userconnection['@value'][i]['@value'][1]['@value'],
                  label: userconnection['@value'][i]['@value'][3],
                  convid:
                    userconnection['@value'][i]['@value'][convidindex + 1][
                      '@value'
                    ][0]['@value'],
                  parties:
                    userconnection['@value'][i]['@value'][partiesindex + 1][
                      '@value'
                    ][0],
                };
                userGraph.maparr.push(y);
              }
            } else if (type == 'g:Edge') {
              // console.log(type);
              if (
                userconnection['@value'][i]['@value']['label'] == 'invited' &&
                userconnection['@value'][i]['@value'][
                  'properties'
                ].hasOwnProperty('invDeclinedAt') == false
              ) {
                if (
                  userconnection['@value'][i]['@value']['inV']['@value'] ==
                  selfUserId
                ) {
                  // console.log("invite rcvd");
                  let senderid =
                    userconnection['@value'][i]['@value']['outV']['@value'];
                  let x = {
                    label: 'invited',
                    relId:
                      userconnection['@value'][i]['@value']['id']['@value'][
                        'relationId'
                      ],
                    inV: selfUserId,
                    outV: senderid,
                  };
                  userGraph.edgearr.push(x);
                }
              } else if (
                userconnection['@value'][i]['@value']['label'] == 'joined' &&
                userconnection['@value'][i]['@value']['outV']['@value'] !=
                  selfUserId
              ) {
                let y = {
                  label: 'joined',
                  inV: userconnection['@value'][i]['@value']['inV']['@value'],
                  outV: userconnection['@value'][i]['@value']['outV']['@value'],
                };
                userGraph.edgearr.push(y);
              }
            }
            if (i == userconnection['@value'].length - 1) {
              console.log('calling sortandmatchdata');
              this.sortAndMatchData();
              // AsyncStorage.setItem('cachedconversation',JSON.stringify(userGraph));
            }
          }
        } else {
          // alert("empty list")
          for (let i = 0; i < this.state.filteredContactData.length; i++) {
            // this.state.filteredContactData[i].color = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
            // dotColors[i] = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
            //    if(confusername != ""){
            if (this.state.dotColorLocation.length > 3) {
              setTimeout(() => {
                // this.increasedotsize(Number.parseInt(JSON.stringify(this.state.dotColorLocation[i].width)), i, this.state.dotColorLocation.length, this.state.dotColorLocation);
                //   this.forceUpdate();
              }, 500);
            }
            // }
          }
        }
      } else if (xhr.readyState == 4 && xhr.status == 500) {
        this.setState({
          flashopacity: true,
          flashMessage: `Please check your internet connection.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
        console.log('something went wrong! try again.');
        AsyncStorage.getItem('cachedconversation').then(asyncStorage => {
          if (asyncStorage != null) {
            userGraph = JSON.parse(asyncStorage);
            // this.sortAndMatchData();
          }
        });
      } else if (xhr.readyState == 4 && xhr.status == 400) {
        this.setState({
          flashopacity: true,
          flashMessage: `You seem to be offline. Some functions may not work.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
        AsyncStorage.getItem('cachedconversation').then(asyncStorage => {
          if (asyncStorage != null) {
            userGraph = JSON.parse(asyncStorage);
            // this.sortAndMatchData();
          }
        });
      } else if (xhr.readyState == 4 && xhr.status == 0) {
        this.setState({
          flashopacity: true,
          flashMessage: `You seem to be offline. Some functions may not work.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
        AsyncStorage.getItem('cachedconversation').then(asyncStorage => {
          if (asyncStorage != null) {
            userGraph = JSON.parse(asyncStorage);
            // this.sortAndMatchData();
          }
        });
      }
    };
    await AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
      console.log('flakeondevicee:' + asyncStorageRes);
      if (asyncStorageRes == null) {
        AsyncStorage.getItem('verifiedphone').then(asyncStorage => {
          console.log('num:' + asyncStorage);
          if (asyncStorage == null) {
            console.log('all null');
          } else {
            xhr.open(
              'POST',
              'https://newauth.io/newauth/api/getusercontactsbyphoneorflake',
            );
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/json');
            reqpacket = JSON.stringify({
              phones: {
                number: asyncStorage,
              },
            });
            console.log('pckt:' + reqpacket);
            xhr.send(reqpacket);
            // for (let i = 0; i < this.state.filteredContactData.length; i++) {
            //     this.state.filteredContactData[i].color = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
            //     dotColors[i] = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
            //     //    if(confusername != ""){
            //     if (this.state.dotColorLocation.length > 3) {
            //         setTimeout(() => {
            //             this.increasedotsize(Number.parseInt(JSON.stringify(this.state.dotColorLocation[i].width)), i, this.state.dotColorLocation.length, this.state.dotColorLocation);
            //               this.forceUpdate();
            //         }, 500);
            //     }
            //     // }
            // }
          }
        });
      } else {
        xhr.open(
          'POST',
          'https://newauth.io/newauth/api/getusercontactsbyphoneorflake',
        );
        xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/json');
        reqpacket = JSON.stringify({
          flake: asyncStorageRes,
        });
        console.log('pckt:' + reqpacket);
        xhr.send(reqpacket);
        // for (let i = 0; i < this.state.filteredContactData.length; i++) {
        //     this.state.filteredContactData[i].color = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
        //     dotColors[i] = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
        //     //    if(confusername != ""){
        //     if (this.state.dotColorLocation.length > 3) {
        //         setTimeout(() => {
        //             this.increasedotsize(Number.parseInt(JSON.stringify(this.state.dotColorLocation[i].width)), i, this.state.dotColorLocation.length, this.state.dotColorLocation);
        //             //   this.forceUpdate();
        //         }, 500);
        //     }
        //     // }
        // }
      }
    });
  }
  startChatPressed = async (convid, chatindex) => {
    if (
      pendingmessagesnotificationarray.map(e => e.index).indexOf(chatindex) !=
      -1
    ) {
      pendingmessagesnotificationarray.splice(
        pendingmessagesnotificationarray.map(e => e.index).indexOf(chatindex),
        1,
      );
    }
    RNFS.getFSInfo().then(info => {
      console.log('Total Space is:' + info.totalSpace / 1024 / 1000000 + ' GB');
      console.log('Free Space is:' + info.freeSpace / 1024 / 1000000 + ' GB');
      if (info.freeSpace / 1024 / 1000 < 20) {
        alert(
          'We are not able to save your chats. Please free up some space on your phone.',
        );
      }
    });
    console.log('pending online msgs:', pendingonlinemsgarr);
    let pendingmsgindex = pendingonlinemsgarr.findIndex(
      object => object.key === this.state.chatConvId,
    );
    if (pendingmsgindex != -1) {
      if (pendingonlinemsgarr[pendingmsgindex].data.length > 0) {
        let reversedata = pendingonlinemsgarr[pendingmsgindex].data.reverse();
        // this.setState({ chatmessages: GiftedChat.append(pendingonlinemsgarr[pendingmsgindex].data, this.state.chatmessages) });
        this.setState({
          chatmessages: GiftedChat.append(this.state.chatmessages, reversedata),
        });
        // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        let convIndexx = this.state.tempMsgArr.findIndex(
          object => object.key === this.state.chatConvId,
        );
        if (convIndexx != -1) {
          // this.state.tempMsgArr[convIndexx].data = this.state.tempMsgArr[convIndexx].data.concat(pendingonlinemsgarr[pendingmsgindex].data)
        } else {
          //   this.state.tempMsgArr.push({key:this.state.chatConvId,data:pendingonlinemsgarr[pendingmsgindex].data})
        }
        pendingonlinemsgarr[pendingmsgindex].data = [];
      }
      console.log('temp array:', this.state.tempMsgArr.length);
    }
    if (allConversationArr[convIndex].sendChannel == null) {
      this.joinConversation(confusername, chatindex);
    } else if (allConversationArr[convIndex].sendChannel.readyState != 'open') {
      this.setState({chatUserStatus: 'Joining'});
      this.state.connectionOnlineColor = 'lightgray';
      this.state.connectionOnlineFalse = 'flex';
      this.state.connectionOnlineTrue = 'none';
      // this.setState({connectionOnlineLeft:50,connectionOnlineTop:50,connectionOnlineWidth:25,connectionOnlineHeight:25})
      this.joinConversation(confusername, chatindex);
    } else if (allConversationArr[convIndex].sendChannel.readyState == 'open') {
      console.log(this.state.tempMsgArr.length);
      this.sendUserStatus('Joined');
      this.setState({connectionOnlineOpacity: new Animated.Value(0.6)});
      this.setState({
        chatUserStatus: allConversationArr[convIndex].status + ' the chat',
      });
      console.log('pending online msgs:', pendingonlinemsgarr);
      // let pendingmsgindex = pendingonlinemsgarr.findIndex(object => object.key === this.state.chatConvId)
      // if (pendingmsgindex != -1) {
      //     if (pendingonlinemsgarr[pendingmsgindex].data.length > 0) {
      //         // this.setState({ chatmessages: GiftedChat.append(pendingonlinemsgarr[pendingmsgindex].data, this.state.chatmessages) });
      //         this.setState({ chatmessages: GiftedChat.append(this.state.chatmessages, pendingonlinemsgarr[pendingmsgindex].data) });
      //         // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
      //         let convIndexx = this.state.tempMsgArr.findIndex(object => object.key === this.state.chatConvId);
      //         if (convIndexx != -1) {
      //             // this.state.tempMsgArr[convIndexx].data = this.state.tempMsgArr[convIndexx].data.concat(pendingonlinemsgarr[pendingmsgindex].data)
      //         }
      //         else {
      //             //   this.state.tempMsgArr.push({key:this.state.chatConvId,data:pendingonlinemsgarr[pendingmsgindex].data})
      //         }
      //         pendingonlinemsgarr[pendingmsgindex].data = [];
      //     }
      //     console.log("temp array:", this.state.tempMsgArr.length)
      // }
      this.state.connectionOnlineColor = 'lightgray';
      this.state.connectionOnlineFalse = 'none';
      this.state.connectionOnlineTrue = 'flex';
      // let l = Animated.subtract(Animated.add(this.state.connectionOnlineLeft, this.state.connectionOnlineWidth), new Animated.Value(screenwidth / 2));
      // let t = Animated.subtract(Animated.add(this.state.connectionOnlineTop, this.state.connectionOnlineHeight), new Animated.Value(screenwidth / 2));
      let newsize = await this.calculateBigCircleSize(
        Number.parseInt(JSON.stringify(this.state.connectionOnlineWidth)),
        Number.parseInt(JSON.stringify(this.state.connectionOnlineHeight)),
        Number.parseInt(JSON.stringify(this.state.connectionOnlineLeft)),
        Number.parseInt(JSON.stringify(this.state.connectionOnlineTop)),
      );
      // console.log(l,t);
      // this.setState({ connectionOnlineLeft: newsize.left, connectionOnlineTop: newsize.top });
      Animated.timing(this.state.connectionOnlineWidth, {
        toValue: newsize.width,
        duration: 2000,
        useNativeDriver: false,
      }).start();
      Animated.timing(this.state.connectionOnlineHeight, {
        toValue: newsize.width,
        duration: 2000,
        useNativeDriver: false,
      }).start();
      Animated.timing(this.state.connectionOnlineLeft, {
        toValue: newsize.left,
        duration: 2000,
        useNativeDriver: false,
      }).start();
      Animated.timing(this.state.connectionOnlineTop, {
        toValue: newsize.top,
        duration: 2000,
        useNativeDriver: false,
      }).start();
      // this.setState({ connectionOnlineLeft: l, connectionOnlineTop: t, connectionOnlineWidth: screenwidth, connectionOnlineHeight: screenwidth })
    } else {
      allConversationArr[convIndex].clientPeer.oniceconnectionstatechange =
        () => {
          if (allConversationArr[convIndex].clientPeer != null) {
            if (
              allConversationArr[convIndex].clientPeer.connectionState != null
            ) {
              if (
                allConversationArr[convIndex].clientPeer.iceConnectionState ==
                'disconnected'
              ) {
                console.log('Disconnected');
                // this.joinConversation(confusername, chatindex); 9 july
              } else {
                console.log('peer already connected.');
              }
            }
          }
        };
    }
    //   AsyncStorage.getItem("datachannel").then(a=>{
    //     console.log("datachannel:",a);
    //     if(a!=null){
    //       console.log("connection already exists.")
    //     //   this.setState({ sendChannel: JSON.parse(a) });
    //       console.log(this.state.sendChannel);
    //     }
    //     else{
    //     //   this.joinConversation(confusername);
    //     }
    //   })
    // navigate('Chat',{conid:convid});
    AsyncStorage.getItem('pendingmessages').then(asyncSt => {
      console.log('pendingmsgsnew:', asyncSt);
      if (asyncSt != null) {
        let msgarr = [];
        msgarr = JSON.parse(asyncSt);
        const uniqueIds = [];
        const unique = msgarr.filter(element => {
          const isDuplicate = uniqueIds.includes(element.msgid);
          if (!isDuplicate) {
            uniqueIds.push({id: element.id, msg: element.msg});
            return true;
          }
          return false;
        });
        if (unique.length > 0) {
          AsyncStorage.removeItem('pendingmessages');
          for (let i = 0; i < unique.length; i++) {
            setTimeout(() => {
              this.sendMessageOffline(unique[i].msg, unique[i].id, null);
            }, 100);
          }
        }
      }
    });
    if (this.state.confirmDocSendObject == null) {
      this.handleSharedData();
    }
  };
  async convertFlakeToUsername(flake, shownotification) {
    console.log('flakeinput:', flake);
    let xhr;
    var result = flake;
    flakeTousernameAuthor = flake;
    xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open(
      'GET',
      'https://newauth.io/newauth/api/getusernamepartbyflake/' + flake,
    );
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = async () => {
      console.log('getflakeusername:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('flkresult:', xhr.responseText);
        result = await xhr.responseText;
        flakeTousernameAuthor = result;
        await this.getConversation(encodedConvid, result, shownotification);
        // var intervalID = setInterval(() => {
        //     // this.getConversation(encodedConvid, result)
        //     if (this.state.showchatUI==false) {
        //         clearInterval(intervalID);
        //     }
        // }, 5000);
        console.log(
          'flaketousername:',
          result,
          typeof result,
          flakeTousernameAuthor,
        );
        return result;
      }
    };
    await xhr.send(null);
  }
  saveChatInFile = async (convid, addChat, convIndexxx) => {
    console.log('save chat:', addChat.data.length);
    var fileDate = [
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ].join('');
    var fileTime = [
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
    ].join('');
    // console.log(addChat)
    if (addChat.data.length > 0) {
      addChat.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );
      // addChat.data = addChat.data.reverse();
      const {config, fs} = RNFetchBlob;
      let chatFolder;
      if (Platform.OS === 'ios') {
        chatFolder =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/Newauth/chats/.hiddenchats/' +
          convid;
      } else {
        chatFolder =
          RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/chats/' + convid;
      }
      var ispermission = false;
      try {
        if (Platform.OS === 'android') {
          ispermission = true;
        } else if (Platform.OS === 'ios') {
          ispermission = true;
        }
        if (ispermission == true) {
          let noOfFiless = await fs
            .ls(chatFolder)
            .then(async files => {
              let noOfFiles = files.length;
              console.log('no of chat files:', noOfFiles);
              //   let isFile =  await fs.exists(dirs);
              //   console.log("file exist:",isFile)
              if (noOfFiles > 0) {
                let fileNumbering = parseInt(noOfFiles - 1) + 1;
                let dirs = chatFolder + '/' + files[noOfFiles - 1]; //(fileNumbering + '-' + fileDate + '-' + fileTime)
                await RNFetchBlob.fs
                  .readFile(chatFolder + '/' + files[noOfFiles - 1], 'utf8')
                  .then(async dataa => {
                    console.log('msgs:', dataa.length);
                    let chatmsg = JSON.parse(dataa);
                    console.log('chatmsg:', chatmsg.data.length);
                    if (chatmsg.data.length > 0) {
                      addChat.data = chatmsg.data.concat(
                        addChat.data.filter(
                          item2 =>
                            !chatmsg.data.some(
                              item1 => item1._id === item2._id,
                            ),
                        ),
                      );
                    }
                  });
                // fs.readFile(dirs, 'utf8').then(async (dataa) => {
                // console.log(data,typeof(data))
                // let fileData = JSON.parse(dataa)
                // if (fileData.data.length < 10) {
                console.log('inside if', dirs);
                if (addChat.data.length > 50) {
                  console.log('inside if', dirs);
                  console.log(addChat.data.length);
                  if (this.state.tempMsgArr[convIndexxx].data.length > 0) {
                    await fs
                      .writeFile(
                        dirs,
                        JSON.stringify({
                          key: addChat.key,
                          data: addChat.data.splice(0, 50),
                        }),
                        'utf8',
                      )
                      .then(e => console.log('chat file saved! 1'))
                      .catch(e => console.log('error saving chat file:', e));
                    // addChat.data.splice(0, 10);
                  }
                  console.log(addChat.data.length);
                  if (addChat.data.length > 0) {
                    if (this.state.tempMsgArr[convIndexxx].data.length > 0) {
                      let newdir =
                        chatFolder +
                        '/' +
                        (fileNumbering + 1 + '-' + fileDate + '-' + fileTime);
                      await fs
                        .writeFile(newdir, JSON.stringify(addChat), 'utf8')
                        .then(e => console.log('chat file saved! 2'))
                        .catch(e => console.log('error saving chat file:', e));
                    }
                  }
                  this.state.tempMsgArr[convIndexxx].data = [];
                } else {
                  console.log('inside else', dirs);
                  if (this.state.tempMsgArr[convIndexxx].data.length > 0) {
                    await fs
                      .writeFile(dirs, JSON.stringify(addChat), 'utf8')
                      .then(e => {
                        console.log(
                          'chat file saved! 3',
                          e,
                          this.state.tempMsgArr[convIndexxx].data.length,
                        );
                        this.state.tempMsgArr[convIndexxx].data = [];
                        console.log(
                          this.state.tempMsgArr[convIndexxx].data.length,
                        );
                      })
                      .catch(e => console.log('error saving chat file:', e));
                  }
                }
                // }
                // else {
                //     let dirs = chatFolder + '/' + (fileNumbering + 1)
                //     await fs.writeFile(dirs, JSON.stringify(addChat), 'utf8');
                //     this.state.tempMsgArr[convIndexxx].data = [];
                // }
                // });
              } else if (noOfFiles == 0) {
                let fileNumbering = 1;
                let dirs =
                  chatFolder +
                  '/' +
                  (fileNumbering + '-' + fileDate + '-' + fileTime);
                if (addChat.data.length > 50) {
                  console.log('inside if', dirs);
                  console.log(addChat.data.length);
                  if (this.state.tempMsgArr[convIndexxx].data.length > 0) {
                    await fs
                      .writeFile(
                        dirs,
                        JSON.stringify({
                          key: addChat.key,
                          data: addChat.data.splice(0, 50),
                        }),
                        'utf8',
                      )
                      .then(e => console.log('chat file saved! 4'))
                      .catch(e => console.log('error saving chat file:', e));
                    // addChat.data.splice(0, 10);
                  }
                  console.log(addChat.data.length);
                  if (this.state.tempMsgArr[convIndexxx].data.length > 0) {
                    let newdir =
                      chatFolder +
                      '/' +
                      (fileNumbering + 1 + '-' + fileDate + '-' + fileTime);
                    await fs
                      .writeFile(newdir, JSON.stringify(addChat), 'utf8')
                      .then(e => console.log('chat file saved! 5'))
                      .catch(e => console.log('error saving chat file:', e));
                    this.state.tempMsgArr[convIndexxx].data = [];
                  }
                } else {
                  if (this.state.tempMsgArr[convIndexxx].data.length > 0) {
                    let dirs =
                      chatFolder +
                      '/' +
                      (fileNumbering + '-' + fileDate + '-' + fileTime);
                    await fs
                      .writeFile(dirs, JSON.stringify(addChat), 'utf8')
                      .then(e => console.log('chat file saved! 6'))
                      .catch(e => console.log('error saving chat file:', e));
                    this.state.tempMsgArr[convIndexxx].data = [];
                  }
                }
                // let dirs = chatFolder + '/' + (noOfFiles.length + 1)
                // await fs.writeFile(dirs, JSON.stringify(addChat), 'utf8');
                // this.state.tempMsgArr[convIndexxx].data = [];
              }
            })
            .catch(e => console.log(e));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  isCloseToTop({layoutMeasurement, contentOffset, contentSize}) {
    // console.log(layoutMeasurement,contentOffset,contentSize)
    const paddingToTop = 80;
    if (
      parseInt(contentOffset.y) ==
      parseInt(contentSize.height - layoutMeasurement.height)
    ) {
      return true;
    }
    //   console.log(contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y)
    //   return contentSize.height - layoutMeasurement.height - paddingToTop  <= contentOffset.y;
    const contentTopOffset =
      contentSize.height - layoutMeasurement.height - contentOffset.y;
    // if the screen is not full of messages, offset would be too big
    // console.log(contentTopOffset)
    // console.log(contentSize.height < layoutMeasurement.height
    //     ? contentOffset.y > LOAD_EARLIER_ON_SCROLL_HEGHT_OFFSET // so we only check bottom offset
    //     : contentTopOffset + LOAD_EARLIER_ON_SCROLL_HEGHT_OFFSET < 0
    // )
    // return contentSize.height < layoutMeasurement.height
    //   ? contentOffset.y > LOAD_EARLIER_ON_SCROLL_HEGHT_OFFSET // so we only check bottom offset
    //   : contentTopOffset + LOAD_EARLIER_ON_SCROLL_HEGHT_OFFSET < 0;
  }
  loadMoreMessage = async () => {
    console.log('loading msgs');
    try {
      if (Platform.OS === 'ios') {
        var dirschats =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/Newauth/chats/.hiddenchats/' +
          this.state.chatConvId.substring(0, 8);
      } else {
        var dirschats =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/Newauth/chats/' +
          this.state.chatConvId.substring(0, 8);
      }
      let isFile = await RNFetchBlob.fs
        .ls(dirschats)
        .then(files => {
          console.log(files.length);
          if (files.length > 0) {
            if (loadedFileIndex > 0) {
              RNFetchBlob.fs
                .readFile(dirschats + '/' + files[loadedFileIndex - 1], 'utf8')
                .then(async data => {
                  //  let chatmsg = {key:this.state.chatConvId,data:[]}
                  let chatmsg = JSON.parse(data);
                  console.log(chatmsg);
                  if (chatmsg.data.length > 0) {
                    loadedFileIndex = loadedFileIndex - 1;
                    await this.loadAndDisplayMessage(
                      chatmsg,
                      dirschats + '/' + files[files.length - 1],
                    );
                    this.setState({loadingsign: false});
                  } else {
                    RNFetchBlob.fs.unlink(
                      dirschats + '/' + files[files.length - 1],
                    );
                    await this.loadMoreMessage();
                    this.setState({loadingsign: false});
                  }
                });
            } else {
            }
          } else {
            console.log('no previous chat file exist.');
          }
          return files.length;
        })
        .catch(error => console.log(error));
      console.log('isFile:', isFile);
    } catch (e) {
      console.log('startpeerchaterror:', e);
    }
  };
  loadAndDisplayMessage = async (msg, filepath) => {
    // let loadedconvindex = this.state.loadedMsgArr.findIndex(object => object.key === this.state.chatConvId);
    // if(loadedconvindex == -1){
    //     this.state.loadedMsgArr.push({key:this.state.chatConvId,data:[]})
    //     this.state.tempMsgArr[convIndex].data = filetempdata.data.concat(this.state.tempMsgArr[convIndex].data);
    // }
    for (let i = 0; i < msg.data.length; ) {
      if (
        msg.data[i].user.chatType == 'image' ||
        msg.data[i].user.chatType == 'video' ||
        msg.data[i].user.chatType == 'document'
      ) {
        if (msg.data[i].user.chatType == 'image') {
          const newimg = await RNFetchBlob.fs
            .readFile(msg.data[i].image, 'base64')
            .then(data => {
              return data;
            })
            .catch(e => {
              console.log('read image error:');
            });
          try {
            if (newimg == undefined) {
              msg.data.splice(i, 1);
              // this.state.tempMsgArr[convIndex].data.splice(i, 1)
              i = i;
            } else {
              let file_path;
              if (Platform.OS === 'ios') {
                file_path =
                  RNFetchBlob.fs.dirs.DocumentDir +
                  '/Newauth/chats/media/a7d2b264/1/' +
                  'IMG-10003.png';
              } else {
                file_path =
                  RNFetchBlob.fs.dirs.DownloadDir +
                  '/Newauth/chats/media/a7d2b264/1/' +
                  'IMG-10003.png';
              }
              // msg.data[i].image = `data:image/png;base64,${newimg}` cmntng
              this.setState({updateUIState: false});
              i++;
            }
          } catch (e) {
            console.log(e);
          }
        } else if (msg.data[i].user.chatType == 'video') {
          const newvid = await RNFetchBlob.fs
            .readFile(msg.data[i].video, 'base64')
            .then(data => {
              return data;
            })
            .catch(e => {
              console.log('read image error:');
            });
          try {
            if (newvid == undefined) {
              msg.data.splice(i, 1);
              // this.state.tempMsgArr[convIndex].data.splice(i, 1)
              i = i;
            } else {
              this.setState({updateUIState: false});
              i++;
            }
          } catch (e) {
            console.log(e);
          }
        } else if (msg.data[i].user.chatType == 'document') {
          const newvid = await RNFetchBlob.fs
            .readFile(msg.data[i].path, 'base64')
            .then(data => {
              return data;
            })
            .catch(e => {
              console.log('read doc error:', e);
            });
          try {
            if (newvid == undefined) {
              msg.data.splice(i, 1);
              // this.state.tempMsgArr[convIndex].data.splice(i, 1)
              i = i;
            } else {
              console.log(msg.data[i].path);
              let pathh = msg.data[i].path;
              msg.data[i].text = (
                <Text onPress={() => FileViewer.open(pathh)}>
                  {msg.data[i].file_name}
                  {'\n'}
                  {msg.data[i].file_size}
                </Text>
              );
              this.setState({updateUIState: false});
              i++;
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        i++;
      }
      if (i === msg.data.length) {
        let convIndex = this.state.tempMsgArr.findIndex(
          object => object.key === this.state.chatConvId,
        );
        let filetempdata = JSON.parse(JSON.stringify(msg));
        console.log('index:', convIndex);
        this.state.tempMsgArr[convIndex].data = filetempdata.data.concat(
          this.state.tempMsgArr[convIndex].data,
        );
        RNFetchBlob.fs
          .unlink(filepath)
          .then(console.log('file deleted:', filepath))
          .catch(console.log('error deleting file:', filepath));
        // loadedFileIndex = 0;
        console.log('update the UI:', i);
        let x = i;
        // this.setState({ chatmessages: GiftedChat.append(this.state.chatmessages, msg.data) });
        this.setState({
          chatmessages: GiftedChat.append(
            msg.data.reverse(),
            this.state.chatmessages,
          ),
        });
        // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        //    console.log(filepath)
        //    RNFetchBlob.fs.writeFile(filepath,JSON.stringify(msg),'utf8').catch(e=>console.log('write file error:',e))
        this.setState({updateUIState: false});
      }
    }
  };
  selectAndDisplayMessage = async (msg, filepath) => {
    console.log(
      'inside select and display msg:',
      msg.data.length,
      this.state.tempMsgArr,
    );
    for (let i = 0; i < msg.data.length; ) {
      console.log('i:', i, msg.data[i].user);
      if (
        msg.data[i].user.chatType == 'image' ||
        msg.data[i].user.chatType == 'video' ||
        msg.data[i].user.chatType == 'document'
      ) {
        // console.log(msg[i].image)
        if (msg.data[i].user.chatType == 'image') {
          // this.receiveImageFile([msg[i]],this.state.chatConvId.substring(0,8))
          const newimg = await RNFetchBlob.fs
            .readFile(msg.data[i].image, 'base64')
            .then(dataa => {
              console.log(
                'image base64:',
                dataa.substring(0, 7),
                msg.data[i].user._id,
              );
              console.log('state updated');
              return dataa;
              // msg[i].image  =  `data:image/png;base64,${data}`
              // this.setState({videoPauseIcons:'pink'})
              // console.log(msg[i].user._id)
              // this.setState({videoPauseIcons:'pink'})
            })
            .catch(e => {
              console.log('read image error:');
            });
          try {
            if (newimg == undefined) {
              console.log('newimg:', newimg);
              console.log('old msgs:', msg.data.length);
              msg.data.splice(i, 1);
              // this.state.tempMsgArr[convIndex].data.splice(i, 1)
              console.log('new msgs:', msg.data.length);
              console.log('read image error:');
              i = i;
            } else {
              let file_path;
              if (Platform.OS === 'ios') {
                file_path =
                  RNFetchBlob.fs.dirs.DocumentDir +
                  '/Newauth/chats/media/a7d2b264/1/' +
                  'IMG-10003.png';
              } else {
                file_path =
                  RNFetchBlob.fs.dirs.DownloadDir +
                  '/Newauth/chats/media/a7d2b264/1/' +
                  'IMG-10003.png';
              }
              console.log('newimg:', newimg.substring(0, 8), msg.data[i].image);
              // msg.data[i].image = `data:image/png;base64,${newimg}`  //cmntng
              // msg[i].image =  msg[i].image
              this.setState({updateUIState: false});
              i++;
            }
          } catch (e) {
            console.log(e);
          }
        } else if (msg.data[i].user.chatType == 'video') {
          // this.receiveVideoFile([msg[i]],this.state.chatConvId.substring(0,8))
          let file_path;
          if (Platform.OS === 'ios') {
            file_path =
              RNFetchBlob.fs.dirs.DocumentDir +
              '/Newauth/chats/media/a7d2b264/1/' +
              'VID-enc.mp4';
          } else {
            file_path =
              RNFetchBlob.fs.dirs.DownloadDir +
              '/Newauth/chats/media/a7d2b264/1/' +
              'VID-enc.mp4';
          }
          const newvid = await RNFetchBlob.fs
            .readFile(msg.data[i].video, 'base64')
            .then(dataa => {
              console.log(
                'video base64:',
                dataa.substring(0, 7),
                msg.data[i].user._id,
              );
              return dataa;
              // msg[i].image  =  `data:image/png;base64,${data}`
              // this.setState({videoPauseIcons:'pink'})
              // console.log(msg[i].user._id)
              // this.setState({videoPauseIcons:'pink'})
              console.log('state updated');
            })
            .catch(e => {
              console.log('read image error:');
            });
          try {
            if (newvid == undefined) {
              console.log('newvid:', newvid);
              console.log('old msgs:', msg.data.length);
              msg.data.splice(i, 1);
              // this.state.tempMsgArr[convIndex].data.splice(i, 1)
              console.log('new msgs:', msg.data.length);
              console.log('read video error:');
              i = i;
            } else {
              console.log('newvid:', newvid.substring(0, 8));
              //  msg[i].video  =  `data:video/mp4;base64,${newvid}`
              // RNFetchBlob.fs.writeFile(file_path,newvid, 'base64').catch((e)=>console.log("save video error:",e))
              this.setState({updateUIState: false});
              i++;
            }
          } catch (e) {
            console.log(e);
          }
        } else if (msg.data[i].user.chatType == 'document') {
          // this.receiveDocFile([msg[i]],this.state.chatConvId.substring(0,8))
          let file_path;
          if (Platform.OS === 'ios') {
            file_path =
              RNFetchBlob.fs.dirs.DocumentDir +
              '/Newauth/chats/media/a7d2b264/1/' +
              'VID-enc.mp4';
          } else {
            file_path =
              RNFetchBlob.fs.dirs.DownloadDir +
              '/Newauth/chats/media/a7d2b264/1/' +
              'VID-enc.mp4';
          }
          const newvid = await RNFetchBlob.fs
            .readFile(msg.data[i].path, 'base64')
            .then(dataa => {
              console.log(
                'doc base64:',
                dataa.substring(0, 7),
                msg.data[i].user._id,
              );
              return dataa;
            })
            .catch(e => {
              console.log('read doc error:', e);
            });
          try {
            if (newvid == undefined) {
              console.log('newdoc:', newvid);
              console.log('old msgs:', msg.data.length);
              msg.data.splice(i, 1);
              // this.state.tempMsgArr[convIndex].data.splice(i, 1)
              console.log('new msgs:', msg.data.length);
              console.log('read doc error:');
              i = i;
            } else {
              console.log('newdoc:', newvid.substring(0, 8), msg.data[i]);
              //  msg[i].video  =  `data:video/mp4;base64,${newvid}`
              let pathh = msg.data[i].path;
              msg.data[i].text = (
                <Text onPress={() => FileViewer.open(pathh)}>
                  {msg.data[i].file_name}
                  {'\n'}
                  {msg.data[i].file_size}
                </Text>
              );
              // RNFetchBlob.fs.writeFile(file_path,newvid, 'base64').catch((e)=>console.log("save video error:",e))
              this.setState({updateUIState: false});
              i++;
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        i++;
      }
      if (i === msg.data.length) {
        let convIndex = this.state.tempMsgArr.findIndex(
          object => object.key === this.state.chatConvId,
        );
        let filetempdata = JSON.parse(JSON.stringify(msg));
        console.log('index:', convIndex);
        this.state.tempMsgArr[convIndex].data = filetempdata.data.concat(
          this.state.tempMsgArr[convIndex].data,
        );
        // RNFetchBlob.fs.unlink(filepath).then(console.log('file deleted:', filepath)).catch(console.log("error deleting file:", filepath));
        console.log(
          'inside select and display msg:',
          msg.data.length,
          this.state.tempMsgArr.length,
        );
        console.log('update the UI:', i);
        let x = i;
        // this.setState({ chatmessages: GiftedChat.append(msg.data, this.state.chatmessages) });
        this.setState({
          chatmessages: GiftedChat.append(
            this.state.chatmessages,
            msg.data,
          ).reverse(),
        });
        // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        //    console.log(filepath)
        //    RNFetchBlob.fs.writeFile(filepath,JSON.stringify(msg),'utf8').catch(e=>console.log('write file error:',e))
        this.setState({updateUIState: false});
      }
    }
  };
  sendDocFile = async (file_name, file_path, file_type, b64, convid, size) => {
    console.log('inside send doc file', convid, size, file_path);
    const {setReplyEnabled} = this.state;
    var enableReply = false;
    var replyTo = {name: '', text: 'document'};
    if (setReplyEnabled) {
      (enableReply = true),
        (replyTo = {
          name: setReplyEnabled.user.name,
          text: 'document',
          id: setReplyEnabled.user._id,
        });
    }
    var fileDate = [
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ].join('');
    var fileTime = [
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
    ].join('');
    var file_path;
    let dirs;
    if (Platform.OS === 'ios') {
      dirs = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/chats/media/' + convid;
      file_path =
        RNFetchBlob.fs.dirs.DocumentDir +
        '/Newauth/chats/media/sent/DOC-' +
        fileDate +
        '-' +
        fileTime +
        '-' +
        file_name;
    } else {
      dirs = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/chats/media/' + convid;
      file_path =
        RNFetchBlob.fs.dirs.DownloadDir +
        '/Newauth/chats/media/sent/DOC-' +
        fileDate +
        '-' +
        fileTime +
        '-' +
        file_name;
    }
    console.log(dirs, file_path);
    await RNFetchBlob.fs
      .writeFile(file_path, b64, 'base64')
      .catch(e => console.log('save image error:', e));
    if (allConversationArr[convIndex].sendChannel != null) {
      // allConversationArr[convIndex].sendChannel.send(JSON.stringify(sendmsg));
      let newmsg = [
        {
          _id: Math.random(1000).toString(),
          text: (
            <Text onPress={() => FileViewer.open(file_path)}>
              {file_name}
              {'\n'}
              {size}
            </Text>
          ),
          createdAt: new Date(),
          file_type: file_type,
          path: file_path,
          file_size: size,
          file_name: file_name,
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'online',
            chatType: 'document',
            isReplyEnabled: false,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: false,
        },
      ];
      // this.state.tempMsgArr.push(newmsg[0])
      let convIndexx = this.state.tempMsgArr.findIndex(
        object => object.key === this.state.chatConvId,
      );
      if (convIndexx != -1) {
        this.state.tempMsgArr[convIndexx].data.push(newmsg[0]);
      } else {
        this.state.tempMsgArr.push({
          key: this.state.chatConvId,
          data: [newmsg[0]],
        });
      }
      // this.setState({ chatmessages: GiftedChat.append(newmsg, this.state.chatmessages) });
      this.setState({
        chatmessages: GiftedChat.append(this.state.chatmessages, newmsg),
      });
      this.forceUpdate();
      // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
      let sendmsg = [
        {
          _id: Math.random(1000).toString(),
          text: b64,
          file_type: file_type,
          file_size: size,
          file_name: file_name,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'online',
            chatType: 'document',
            isReplyEnabled: false,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: false,
        },
      ];
      this.imageToChunks(b64, sendmsg);
    } else if (allConversationArr[convIndex].sendChannel == null) {
      // this.setState({ chatmessages: GiftedChat.append(msg, this.state.chatmessages) });
      let newmsg = [
        {
          _id: Math.random(1000).toString(),
          text: (
            <Text onPress={() => FileViewer.open(file_path)}>
              {file_name}
              {'\n'}
              {size}
            </Text>
          ),
          createdAt: new Date(),
          file_type: file_type,
          path: file_path,
          file_size: size,
          file_name: file_name,
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'offline',
            chatType: 'document',
            isReplyEnabled: false,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: false,
        },
      ];
      // this.state.tempMsgArr.push(newmsg[0])
      let convIndexx = this.state.tempMsgArr.findIndex(
        object => object.key === this.state.chatConvId,
      );
      if (convIndexx != -1) {
        this.state.tempMsgArr[convIndexx].data.push(newmsg[0]);
      } else {
        this.state.tempMsgArr.push({
          key: this.state.chatConvId,
          data: [newmsg[0]],
        });
      }
      // this.setState({ chatmessages: GiftedChat.append(newmsg, this.state.chatmessages) });
      this.setState({
        chatmessages: GiftedChat.append(this.state.chatmessages, newmsg),
      });
      // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
      let sendmsg = [
        {
          _id: Math.random(1000).toString(),
          text: b64,
          file_type: file_type,
          file_size: size,
          file_name: file_name,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'offline',
            chatType: 'document',
            isReplyEnabled: false,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: false,
        },
      ];
      // this.sendMessageOffline(sendmsg, conid);   //savebigdatahere
      this.saveConversationBigData(
        sendmsg,
        this.state.chatConvId,
        'doc',
        newmsg[0]._id,
      );
    }
  };
  receiveDocFile = async (message, convid, nameconvid, sameuser, fcdindex) => {
    console.log(
      'inside rcv document file',
      convid,
      message[0].file_size,
      message[0].file_name,
      message[0].file_type,
      typeof message[0].text,
      message[0].text.length,
    );
    let dirs;
    if (Platform.OS === 'ios') {
      dirs = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/chats/media/' + convid;
    } else {
      dirs = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/chats/media/' + convid;
    }
    console.log(dirs);
    let fileDate = [
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ].join('');
    let fileTime = [
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
    ].join('');
    let ext_type = message[0].file_type.split('/');
    console.log('ext_type:', ext_type, message[0].file_size);
    let file_path;
    if (Platform.OS === 'ios') {
      file_path =
        RNFetchBlob.fs.dirs.DocumentDir +
        '/Newauth/chats/media/' +
        convid +
        '/' +
        message[0].file_name; //+ '.' + ext_type[ext_type.length - 1]
    } else {
      file_path =
        RNFetchBlob.fs.dirs.DownloadDir +
        '/Newauth/chats/media/' +
        convid +
        '/' +
        message[0].file_name; //+ '.' + ext_type[ext_type.length - 1]
    }
    await RNFetchBlob.fs
      .writeFile(file_path, message[0].text, 'base64')
      .catch(e => console.log('save doc error:', e));
    RNFetchBlob.fs
      .readFile(file_path, 'base64')
      .then(data => {
        console.log('doc base64:', data.substring(0, 7));
      })
      .catch(e => console.log('read doc error:', e));
    console.log('file_path:', file_path);
    (message[0].text = (
      <Text onPress={() => FileViewer.open(file_path)}>
        {message[0].file_name}
        {'\n'}
        {message[0].file_size}
      </Text>
    )),
      (message[0].path = file_path);
    await this.saveTempMessages(message, nameconvid);
    if (this.state.showchatUI == false) {
      //&& message[0].user.messageType == 'online'
      let date = new Date(message[0].createdAt);
      let timee = await this.changeTimeFormat(date);
      await this.displayNotifications(
        `${this.state.filteredContactData[fcdindex].name}.   document.   ${timee}`,
        '',
      );
      await this.savePendingMessages(message, nameconvid);
    } else if (this.state.showchatUI == true && sameuser === false) {
      //&& message[0].user.messageType == 'online'
      let date = new Date(message[0].createdAt);
      let timee = await this.changeTimeFormat(date);
      await this.displayNotifications(
        `${this.state.filteredContactData[fcdindex].name}.   document.   ${timee}`,
        '',
      );
      await this.savePendingMessages(message, nameconvid);
    } else {
      // this.setState({ chatmessages: GiftedChat.append(message, this.state.chatmessages) });
      this.setState({
        chatmessages: GiftedChat.append(this.state.chatmessages, message),
      });
      // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
      if (AppState.currentState == 'background') {
        await this.displayNotifications(
          `${this.state.filteredContactData[fcdindex].name}.   document.   ${timee}`,
          '',
        );
      }
    }
  };
  sendImageFile = async (
    file_name,
    filepath,
    file_type,
    b64,
    convid,
    imagesize,
    saveOrnot,
  ) => {
    this.setState({isCameraOpen: false, isPending: true});
    console.log('inside send image file', convid, b64.length, filepath);
    const {setReplyEnabled} = this.state;
    var enableReply = false;
    var replyTo = {name: '', text: 'image'};
    if (setReplyEnabled) {
      (enableReply = true),
        (replyTo = {
          name: setReplyEnabled.user.name,
          text: 'image',
          id: setReplyEnabled.user._id,
        });
    }
    let dirs;
    if (Platform.OS === 'ios') {
      dirs = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/chats/media/' + convid;
    } else {
      dirs = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/chats/media/' + convid;
    }
    console.log(dirs);
    var fileDate = [
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ].join('');
    var fileTime = [
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
    ].join('');
    var file_path;
    if (saveOrnot == 'clicked') {
      if (Platform.OS === 'ios') {
        file_path =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/Newauth/chats/media/' +
          convid +
          '/IMG-' +
          fileDate +
          '-' +
          fileTime +
          '.png';
      } else {
        file_path =
          RNFetchBlob.fs.dirs.DownloadDir +
          '/Newauth/chats/media/' +
          convid +
          '/IMG-' +
          fileDate +
          '-' +
          fileTime +
          '.png';
      }
    } else {
      if (Platform.OS === 'ios') {
        file_path =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/Newauth/chats/media/sent/IMG-' +
          fileDate +
          '-' +
          fileTime +
          '.png';
      } else {
        file_path =
          RNFetchBlob.fs.dirs.DownloadDir +
          '/Newauth/chats/media/sent/IMG-' +
          fileDate +
          '-' +
          fileTime +
          '.png';
      }
    }
    console.log('filepath:', file_path);
    await RNFetchBlob.fs
      .writeFile(file_path, b64, 'base64')
      .catch(e => console.log('save image error:', e));
    var msg = [
      {
        _id: Math.random(1000).toString(),
        image: `data:image/png;base64,${b64}`,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: this.state.chatConvId,
          messageType: 'offline',
          chatType: 'image',
          isReplyEnabled: enableReply,
          deletemessage: false,
          replyTo: replyTo,
        },
        pending: false,
      },
    ];
    if (allConversationArr[convIndex].sendChannel != null) {
      // allConversationArr[convIndex].sendChannel.send(JSON.stringify([{
      //     _id: Math.random(1000).toString(),
      //     text: "online image",
      //     createdAt: new Date(),
      //     user: {
      //         _id: 1,
      //         name: "Test User",
      //         messageType: "online",
      //         chatType: 'text'
      //     },
      // }]));
      let newmsg = [
        {
          _id: Math.random(1000).toString(),
          image: file_path,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'online',
            chatType: 'image',
            isReplyEnabled: enableReply,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: true,
        },
      ];
      // this.state.tempMsgArr.push(newmsg[0])
      let convIndexx = this.state.tempMsgArr.findIndex(
        object => object.key === this.state.chatConvId,
      );
      if (convIndexx != -1) {
        this.state.tempMsgArr[convIndexx].data.push(newmsg[0]);
      } else {
        this.state.tempMsgArr.push({
          key: this.state.chatConvId,
          data: [newmsg[0]],
        });
      }
      this.setState({
        chatmessages: GiftedChat.append(this.state.chatmessages, newmsg),
      });
      // this.forceUpdate();
      let sendmsg = [
        {
          _id: Math.random(1000).toString(),
          image: b64,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'online',
            chatType: 'image',
            isReplyEnabled: enableReply,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: false,
        },
      ];
      // allConversationArr[convIndex].sendChannel.send(JSON.stringify(sendmsg));
      this.setState({isPending: true});
      this.imageToChunks(b64, sendmsg, newmsg[0]._id);
    } else if (allConversationArr[convIndex].sendChannel == null) {
      let newmsg = [
        {
          _id: Math.random(1000).toString(),
          image: file_path,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'offline',
            chatType: 'image',
            isReplyEnabled: enableReply,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: true,
        },
      ];
      // this.state.tempMsgArr.push(newmsg[0])
      let convIndexx = this.state.tempMsgArr.findIndex(
        object => object.key === this.state.chatConvId,
      );
      if (convIndexx != -1) {
        this.state.tempMsgArr[convIndexx].data.push(newmsg[0]);
      } else {
        this.state.tempMsgArr.push({
          key: this.state.chatConvId,
          data: [newmsg[0]],
        });
      }
      this.setState({
        chatmessages: GiftedChat.append(this.state.chatmessages, newmsg),
      });
      let sendmsg = [
        {
          _id: Math.random(1000).toString(),
          image: b64,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'offline',
            chatType: 'image',
            isReplyEnabled: enableReply,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: false,
        },
      ];
      // this.sendMessageOffline(sendmsg, conid); //call  savebigdatahere
      this.saveConversationBigData(
        sendmsg,
        this.state.chatConvId,
        'image',
        newmsg[0]._id,
      );
    }
    // this.setState({ chatmessages: GiftedChat.append(this.state.chatmessages, msg) }); cmntng
    console.log(msg[0].image.length);
    this.setState({setReplyEnabled: null});
  };
  sendVideoFile = async (
    file_name,
    file_path,
    file_type,
    b64,
    convid,
    videosize,
  ) => {
    //save to media pass path in msg read from that
    console.log('inside send video file:', b64.length, convid.length);
    const {setReplyEnabled} = this.state;
    var enableReply = false;
    var replyTo = {name: '', text: 'video'};
    if (setReplyEnabled) {
      (enableReply = true),
        (replyTo = {
          name: setReplyEnabled.user.name,
          text: 'video',
          id: setReplyEnabled.user._id,
        });
    }
    let dirs;
    if (Platform.OS === 'ios') {
      dirs = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/chats/media/' + convid;
    } else {
      dirs = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/chats/media/' + convid;
    }
    console.log(dirs);
    let fileDate = [
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ].join('');
    let fileTime = [
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
    ].join('');
    if (allConversationArr[convIndex].sendChannel != null) {
      // console.log(allConversationArr[convIndex].sendChannel, allConversationArr[convIndex].sendChannel.readyState)
      if (videosize > 104857600) {
        showMessage({
          style: {
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: 'lightgray',
            opacity: 0.8,
          },
          message: 'File more than 100 mb is not allowed',
          // description:"could not authenticate. Please try again",
          type: 'danger',
          color: 'red',
          animated: true,
          animationDuration: 300,
          duration: 3000,
        });
      } else {
        // allConversationArr[convIndex].sendChannel.send(JSON.stringify(sendmsg));
        let newmsg = [
          {
            _id: Math.random(1000).toString(),
            video: file_path,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: this.state.chatConvId,
              messageType: 'online',
              chatType: 'video',
              isReplyEnabled: false,
              deletemessage: false,
              replyTo: replyTo,
            },
            pending: true,
          },
        ];
        // this.state.tempMsgArr.push(newmsg[0])
        let convIndexx = this.state.tempMsgArr.findIndex(
          object => object.key === this.state.chatConvId,
        );
        if (convIndexx != -1) {
          this.state.tempMsgArr[convIndexx].data.push(newmsg[0]);
        } else {
          this.state.tempMsgArr.push({
            key: this.state.chatConvId,
            data: [newmsg[0]],
          });
        }
        // this.setState({ chatmessages: GiftedChat.append(newmsg, this.state.chatmessages) });
        this.setState({
          chatmessages: GiftedChat.append(this.state.chatmessages, newmsg),
        });
        // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
        let sendmsg = [
          {
            _id: Math.random(1000).toString(),
            video: b64,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: this.state.chatConvId,
              messageType: 'online',
              chatType: 'video',
              isReplyEnabled: false,
              deletemessage: false,
              replyTo: replyTo,
            },
            pending: false,
          },
        ];
        this.imageToChunks(b64, sendmsg, newmsg[0]._id);
      }
    } else if (allConversationArr[convIndex].sendChannel == null) {
      // console.log(allConversationArr[convIndex].sendChannel, allConversationArr[convIndex].sendChannel.readyState)
      showMessage({
        style: {
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: 'lightgray',
          opacity: 0.8,
        },
        message: 'Videos can only be sent within P2P chat',
        // description:"Videos can not be sent offline",
        type: 'danger',
        color: 'red',
        animated: true,
        animationDuration: 300,
        duration: 3000,
      });
      let sendmsg = [
        {
          _id: Math.random(1000).toString(),
          video: b64,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'offline',
            chatType: 'video',
            isReplyEnabled: false,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: false,
        },
      ];
      //   this.sendMessageOffline(sendmsg, conid);
      // this.setState({ chatmessages: GiftedChat.append(msg, this.state.chatmessages) });
      let newmsg = [
        {
          _id: Math.random(1000).toString(),
          video: file_path,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.state.chatConvId,
            messageType: 'offline',
            chatType: 'video',
            isReplyEnabled: false,
            deletemessage: false,
            replyTo: replyTo,
          },
          pending: true,
        },
      ];
      //    this.state.tempMsgArr.push(newmsg[0])
      // this.setState({ chatmessages: GiftedChat.append(newmsg, this.state.chatmessages) });
    }
  };
  receiveImageFile = async (
    message,
    convid,
    nameconvid,
    sameuser,
    fcdindex,
  ) => {
    console.log(
      'inside rcv image file',
      fcdindex,
      convid,
      typeof (convid, message[0].image.length),
      typeof message[0].image,
      message[0].image.length,
    );
    let dirs;
    if (Platform.OS === 'ios') {
      dirs = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/chats/media/' + convid;
    } else {
      dirs = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/chats/media/' + convid;
    }
    console.log(dirs);
    let fileDate = [
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ].join('');
    let fileTime = [
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
    ].join('');
    let file_path;
    if (Platform.OS === 'ios') {
      file_path =
        RNFetchBlob.fs.dirs.DocumentDir +
        '/Newauth/chats/media/' +
        convid +
        '/IMG-' +
        fileDate +
        '-' +
        fileTime +
        '.png';
    } else {
      file_path =
        RNFetchBlob.fs.dirs.DownloadDir +
        '/Newauth/chats/media/' +
        convid +
        '/IMG-' +
        fileDate +
        '-' +
        fileTime +
        '.png';
    }
    await RNFetchBlob.fs
      .writeFile(file_path, message[0].image, 'base64')
      .catch(e => console.log('save image error:', e));
    RNFetchBlob.fs
      .readFile(file_path, 'base64')
      .then(data => {
        console.log('image base64:', data.substring(0, 7));
      })
      .catch(e => console.log('read image error:', e));
    // message[0].image = file_path;
    message[0].image = file_path; //data:image/png;base64,${message[0].image}`
    console.log('img ln:', message[0].image.length);
    let newmsg = JSON.parse(JSON.stringify(message));
    newmsg[0].image = file_path;
    console.log('new file path:', newmsg[0].image);
    // this.state.tempMsgArr.push(newmsg[0])
    let date = new Date(message[0].createdAt);
    let timee = await this.changeTimeFormat(date);
    await this.saveTempMessages(newmsg, nameconvid);
    if (this.state.showchatUI == false) {
      //&& message[0].user.messageType == 'online'
      await this.displayNotifications(
        `${this.state.filteredContactData[fcdindex].name}.   image.   ${timee}`,
        '',
      );
      await this.savePendingMessages(message, nameconvid);
    } else if (this.state.showchatUI == true && sameuser === false) {
      //&& message[0].user.messageType == 'online'
      await this.displayNotifications(
        `${this.state.filteredContactData[fcdindex].name}.   image.   ${timee}`,
        '',
      );
      await this.savePendingMessages(message, nameconvid);
    } else {
      // this.setState({ chatmessages: GiftedChat.append(message, this.state.chatmessages) });
      this.setState({
        chatmessages: GiftedChat.append(this.state.chatmessages, message),
      });
      // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
      if (AppState.currentState == 'background') {
        await this.displayNotifications(
          `${this.state.filteredContactData[fcdindex].name}.   image.   ${timee}`,
          '',
        );
      }
    }
  };
  receiveVideoFile = async (
    message,
    convid,
    nameconvid,
    sameuser,
    fcdindex,
  ) => {
    console.log('inside rcv video file', convid);
    let dirs;
    if (Platform.OS === 'ios') {
      dirs = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/chats/media/' + convid;
    } else {
      dirs = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/chats/media/' + convid;
    }
    console.log(dirs);
    let fileDate = [
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ].join('');
    let fileTime = [
      new Date().getHours(),
      new Date().getMinutes(),
      new Date().getSeconds(),
    ].join('');
    let file_path;
    if (Platform.OS === 'ios') {
      file_path =
        RNFetchBlob.fs.dirs.DocumentDir +
        '/Newauth/chats/media/' +
        convid +
        '/VID-' +
        fileDate +
        '-' +
        fileTime +
        '.mp4';
    } else {
      file_path =
        RNFetchBlob.fs.dirs.DownloadDir +
        '/Newauth/chats/media/' +
        convid +
        '/VID-' +
        fileDate +
        '-' +
        fileTime +
        '.mp4';
    }
    RNFetchBlob.fs
      .writeFile(file_path, message[0].video, 'base64')
      .catch(e => console.log('save video error:', e));
    RNFetchBlob.fs
      .readFile(file_path, 'base64')
      .then(data => {
        console.log('video base64:', data.substring(0, 7));
      })
      .catch(e => console.log('read video error:', e));
    message[0].video = file_path;
    // message[0].video = `data:video/mp4;base64,${message[0].video}`
    // let newmsg = message;
    // newmsg[0].video = file_path;
    // this.state.tempMsgArr.push(message[0])
    await this.saveTempMessages(message, nameconvid);
    let date = new Date(message[0].createdAt);
    let timee = await this.changeTimeFormat(date);
    if (this.state.showchatUI == false) {
      //&& message[0].user.messageType == 'online'
      await this.displayNotifications(
        `${this.state.filteredContactData[fcdindex].name}.   video.   ${timee}`,
        '',
      );
      await this.savePendingMessages(message, nameconvid);
    } else if (this.state.showchatUI == true && sameuser === false) {
      //&& message[0].user.messageType == 'online'
      await this.displayNotifications(
        `${this.state.filteredContactData[fcdindex].name}.   video.   ${timee}`,
        '',
      );
      await this.savePendingMessages(message, nameconvid);
    } else {
      // this.setState({ chatmessages: GiftedChat.append(message, this.state.chatmessages) });
      this.setState({
        chatmessages: GiftedChat.append(this.state.chatmessages, message),
      });
      // this.state.chatmessages.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
      if (AppState.currentState == 'background') {
        await this.displayNotifications(
          `${this.state.filteredContactData[fcdindex].name}.   video.   ${timee}`,
          '',
        );
      }
    }
  };
  startPeerChat = async chatindex => {
    this.setState({preventFurtherClick: true});
    this.state.chatmessages = [];
    this.setState({showReactionsModal: false});
    console.log(encodedConvid);
    console.log('chat started', chatindex, pendingmsgsarr.length);
    this.state.connectionOnlineLeft = new Animated.Value(
      Number.parseInt(
        JSON.stringify(this.state.dotColorLocation[chatindex].ypc),
      ),
    );
    this.state.connectionOnlineTop = new Animated.Value(
      Number.parseInt(
        JSON.stringify(this.state.dotColorLocation[chatindex].zpc),
      ),
    );
    this.state.connectionOnlineWidth = new Animated.Value(
      Number.parseInt(
        JSON.stringify(this.state.dotColorLocation[chatindex].width),
      ),
    );
    this.state.connectionOnlineHeight = new Animated.Value(
      Number.parseInt(
        JSON.stringify(this.state.dotColorLocation[chatindex].height),
      ),
    );
    this.state.chatName = this.state.filteredContactData[chatindex]['name'];
    this.state.chatPhoneNumber =
      this.state.filteredContactData[chatindex]['phoneNumber'];
    this.state.chatConvId = this.state.filteredContactData[chatindex]['convid'];
    this.state.chatIndex = chatindex;
    this.setState({startChatAlert: false, showView: false, showchatUI: true});
    console.log(
      'showchatui:',
      this.state.chatName,
      this.state.chatPhoneNumber,
      this.state.chatConvId,
      this.state.chatIndex,
      this.state.showchatUI,
    );
    global.btoa = require('base-64').encode;
    let encodedId = global.btoa(this.state.chatConvId);
    this.setOnlineStatus(confusername, 'ON+' + encodedId);
    try {
      var dirschats;
      var dirsmedia;
      if (Platform.OS === 'ios') {
        dirschats =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/Newauth/chats/.hiddenchats/' +
          this.state.chatConvId.substring(0, 8);
        dirsmedia =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/Newauth/chats/media/' +
          this.state.chatConvId.substring(0, 8);
      } else {
        dirschats =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/Newauth/chats/' +
          this.state.chatConvId.substring(0, 8);
        dirsmedia =
          RNFetchBlob.fs.dirs.DownloadDir +
          '/Newauth/chats/media/' +
          this.state.chatConvId.substring(0, 8);
      }
      let isChat = await RNFetchBlob.fs.isDir(dirschats);
      let isMedia = await RNFetchBlob.fs.isDir(dirsmedia);
      console.log('folder exist:', isChat, isMedia, dirschats, dirsmedia);
      if (isChat == false && isMedia == false) {
        RNFetchBlob.fs.mkdir(dirschats).catch(e => console.log('er:', e));
        RNFetchBlob.fs.mkdir(dirsmedia).catch(e => console.log('er:', e));
      } else if (isChat == true && isMedia == false) {
        RNFetchBlob.fs.mkdir(dirsmedia).catch(e => console.log('er:', e));
      } else if (isChat == false && isMedia == true) {
        RNFetchBlob.fs.mkdir(dirschats).catch(e => console.log('er:', e));
      }
    } catch (e) {
      console.log('startpeerchaterror:', e);
    }
    console.log('allconvarr:', allConversationArr);
    convIndex = allConversationArr.findIndex(
      object => object.convid === this.state.chatConvId,
    );
    // AsyncStorage.removeItem('chats-' + this.state.chatConvId + '-' + confusername);
    console.log('convIndex', convIndex);
    setTimeout(() => {
      this.startChatPressed(this.state.chatConvId, this.state.chatIndex);
    }, 100);
    await this.getFileMessages(dirschats);
    console.log(
      this.state.chatPhoneNumber,
      this.state.chatConvId,
      this.state.filteredContactData[chatindex]['name'],
    );
    // setTimeout(() => {
    // this.setState({ startChatAlert: false, showView: false, showchatUI: true })
    console.log(
      'id name index:',
      this.state.chatConvId,
      confusername,
      convIndex,
    );
    this.state.filteredContactData[chatindex].color = 'gray';
    confflake = this.state.chatConvId;
    conid = this.state.chatConvId;
    // }, 1000);
    // this.setState({ startChatAlert: true });
  };
  getFileMessages = async dirschats => {
    try {
      let isFile = await RNFetchBlob.fs
        .ls(dirschats)
        .then(async files => {
          console.log(files.length, files[0], files[1]);
          if (files.length > 0) {
            await RNFetchBlob.fs
              .readFile(dirschats + '/' + files[files.length - 1], 'utf8')
              .then(async dataa => {
                console.log('msgs:', dataa.length);
                let chatmsg = JSON.parse(dataa);
                console.log('chatmsg:', chatmsg);
                console.log(
                  'msgs:',
                  chatmsg.data.length,
                  dirschats + '/' + files[files.length - 1],
                );
                // if(pendingmsgsarr.length>0){
                // chatmsg = chatmsg.concat(pendingmsgsarr)
                // }
                if (chatmsg.data.length > 0) {
                  loadedFileIndex = files.length - 1;
                  await this.selectAndDisplayMessage(
                    chatmsg,
                    dirschats + '/' + files[files.length - 1],
                  );
                  await this.convertFlakeToUsername(
                    this.state.chatPhoneNumber,
                    false,
                  );
                  if (chatmsg.data.length < 15) {
                    await this.loadMoreMessage();
                  }
                } else {
                  await RNFetchBlob.fs.unlink(
                    dirschats + '/' + files[files.length - 1],
                  );
                  await this.getFileMessages(dirschats);
                }
              });
          } else {
            this.setState({loadingsign: false});
            console.log('no previous chat file exist.');
            await this.convertFlakeToUsername(
              this.state.chatPhoneNumber,
              false,
            );
          }
          return files.length;
        })
        .catch(error => console.log(error));
      console.log('isFile:', isFile);
    } catch (e) {
      console.log('startpeerchaterror:', e);
    }
  };
  async getUsernameFromFlake(flake) {
    console.log('flakeinput:', flake);
    let xhr;
    var result = flake;
    xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open(
      'GET',
      'https://newauth.io/newauth/api/getusernamepartbyflake/' + flake,
    );
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = async () => {
      console.log('getflakeusername:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('flkresult:', xhr.responseText);
        result = await xhr.responseText;
        return result;
      } else {
        return result;
      }
    };
    await xhr.send(null);
  }
  sortAndMatchData = async () => {
    console.log(userGraph);
    allConversationArr = [];
    // this.state.tempMsgArr = [];
    // pendingonlinemsgarr = [];
    try {
      tempConnArr = userGraph.edgearr.map(itm => ({
        ...userGraph.maparr.find(
          item => (item.outV === itm.outV || item.inV === itm.inV) && item,
        ),
        ...itm,
      }));
      console.log('temparr:', tempConnArr);
      if (tempConnArr.length > 0) {
        for (let i = 0; i < tempConnArr.length; i++) {
          if (
            tempConnArr[i].hasOwnProperty('convid') == true &&
            tempConnArr[i].hasOwnProperty('phone') == false
          ) {
            for (let j = 0; j < userGraph.maparr.length; j++) {
              if (tempConnArr[i].outV == userGraph.maparr[j].outV) {
                tempConnArr[i].phone = userGraph.maparr[j].phone;
                tempConnArr[i].name = userGraph.maparr[j].name;
              }
            }
          }
        }
        console.log(tempConnArr);
        for (let k = 0; k < tempConnArr.length; k++) {
          if (tempConnArr[k].hasOwnProperty('convid') == true) {
            let lenghtKey = chatConnectionArr.length;
            this.state.userChatConnectionData[lenghtKey] = tempConnArr[k];
            console.log('convs:', this.state.userChatConnectionData);
            let index = this.state.filteredContactData.findIndex(object => {
              if (
                object.phoneNumber != null &&
                this.state.userChatConnectionData[lenghtKey].phone != null
              ) {
                if (
                  object.phoneNumber.length <=
                  this.state.userChatConnectionData[lenghtKey].phone.length
                ) {
                  if (
                    this.state.userChatConnectionData[lenghtKey].phone.endsWith(
                      object.phoneNumber,
                    )
                  )
                    return true;
                  else return false;
                } else if (
                  object.phoneNumber.endsWith(
                    this.state.userChatConnectionData[lenghtKey].phone,
                  )
                )
                  return true;
                else return false;
              }
            });
            if (index == -1) {
              console.log('item not found');
              let allconindex = this.state.allRecentContactsArray.findIndex(
                object => {
                  if (
                    object.phoneNumber != null &&
                    this.state.userChatConnectionData[lenghtKey].phone != null
                  ) {
                    if (
                      object.phoneNumber.length <=
                      this.state.userChatConnectionData[lenghtKey].phone.length
                    ) {
                      if (
                        this.state.userChatConnectionData[
                          lenghtKey
                        ].phone.endsWith(object.phoneNumber)
                      )
                        return true;
                      else return false;
                    } else if (
                      object.phoneNumber.endsWith(
                        this.state.userChatConnectionData[lenghtKey].phone,
                      )
                    )
                      return true;
                    else return false;
                  }
                },
              );
              if (allconindex == -1) {
                let namee = this.state.userChatConnectionData[lenghtKey].name;
                if (namee == 'i') {
                  namee = this.state.userChatConnectionData[lenghtKey].phone;
                }
                if (Platform.OS === 'android') {
                  console.log(this.state.allAndroidContactsArray.length);
                  this.state.filteredContactData.push({
                    name: namee + ' ',
                    phoneNumber:
                      this.state.userChatConnectionData[lenghtKey].phone,
                    display: 'flex',
                    color: 'rgba(256,256,256,0.6',
                    tag: 'conversation',
                    checked: true,
                    convid: this.state.userChatConnectionData[lenghtKey].convid,
                    opacity: new Animated.Value(0),
                    scale: new Animated.Value(1),
                    status: false,
                  });
                } else if (Platform.OS === 'ios') {
                  this.state.filteredContactData.push({
                    name: namee + ' ',
                    phoneNumber:
                      this.state.userChatConnectionData[lenghtKey].phone,
                    display: 'flex',
                    color: 'rgba(256,256,256,0.6',
                    tag: 'conversation',
                    checked: true,
                    convid: this.state.userChatConnectionData[lenghtKey].convid,
                    opacity: new Animated.Value(0),
                    scale: new Animated.Value(1),
                    status: false,
                  });
                }
              } else {
                console.log('item found in all recents');
                this.state.filteredContactData.push({
                  name: this.state.allRecentContactsArray[allconindex].name,
                  phoneNumber:
                    this.state.allRecentContactsArray[allconindex].phoneNumber,
                  display: 'flex',
                  color: 'rgba(256,256,256,0.6',
                  tag: 'conversation',
                  checked: true,
                  convid: this.state.userChatConnectionData[lenghtKey].convid,
                  opacity: new Animated.Value(0),
                  scale: new Animated.Value(1),
                  status: false,
                });
                this.state.allRecentContactsArray.splice(allconindex, 1);
              }
              console.log(this.state.filteredContactData.length);
              let arrlen = this.state.filteredContactData.length - 1;
              // console.log(this.state.filteredContactData[arr])
              // this.state.chatName = this.state.filteredContactData[arrlen].name;
              this.state.dataDrag.push('');
              this.pan = this.state.dataDrag.map(() => new Animated.ValueXY());
            } else {
              console.log('found the item:', index);
              this.state.filteredContactData[index].convid =
                this.state.userChatConnectionData[lenghtKey].convid;
              this.state.filteredContactData[index].tag = 'conversation';
              this.state.filteredContactData[index].color =
                'rgba(256,256,256,0.6';
              this.state.filteredContactData[index].checked = true;
              // this.state.chatName = this.state.filteredContactData[index].name;
            }
            allConversationArr.push({
              convid: this.state.userChatConnectionData[lenghtKey].convid,
              clientPeer: null,
              remotePeer: null,
              datachannel: null,
              sendChannel: null,
              canOfferP2P: true,
              canReceiveP2P: true,
              status: '',
            });
            let tempIndex = this.state.tempMsgArr.findIndex(
              object =>
                object.key ===
                this.state.userChatConnectionData[lenghtKey].convid,
            );
            if (tempIndex == -1) {
              this.state.tempMsgArr.push({
                key: this.state.userChatConnectionData[lenghtKey].convid,
                data: [],
              });
            }
            let pndngIndex = pendingonlinemsgarr.findIndex(
              object =>
                object.key ===
                this.state.userChatConnectionData[lenghtKey].convid,
            );
            if (pndngIndex == -1) {
              pendingonlinemsgarr.push({
                key: this.state.userChatConnectionData[lenghtKey].convid,
                data: [],
              });
            }

            this.state.showChatDots[lenghtKey] = 'flex';
          } else if (tempConnArr[k].hasOwnProperty('relId') == true) {
            let lenKey = coonectionArr.length;
            this.state.userConnectionData[lenKey] = tempConnArr[k];
            console.log(
              'rels:',
              this.state.userConnectionData,
              this.state.userConnectionData[lenKey],
              lenKey,
            );
            let index = this.state.filteredContactData.findIndex(object => {
              if (
                object.phoneNumber != null &&
                this.state.userConnectionData[lenKey].phone != null
              ) {
                if (
                  object.phoneNumber.length <=
                  this.state.userConnectionData[lenKey].phone.length
                ) {
                  if (
                    this.state.userConnectionData[lenKey].phone.endsWith(
                      object.phoneNumber,
                    )
                  )
                    return true;
                  else return false;
                } else if (
                  object.phoneNumber.endsWith(
                    this.state.userConnectionData[lenKey].phone,
                  )
                )
                  return true;
                else return false;
              }
            });
            if (index == -1) {
              console.log('item not found in recents');
              console.log(this.state.allRecentContactsArray.length);
              let allconindex = this.state.allRecentContactsArray.findIndex(
                object => {
                  if (
                    object.phoneNumber != null &&
                    this.state.userConnectionData[lenKey].phone != null
                  ) {
                    if (
                      object.phoneNumber.length <=
                      this.state.userConnectionData[lenKey].phone.length
                    ) {
                      if (
                        this.state.userConnectionData[lenKey].phone.endsWith(
                          object.phoneNumber,
                        )
                      )
                        return true;
                      else return false;
                    } else if (
                      object.phoneNumber.endsWith(
                        this.state.userConnectionData[lenKey].phone,
                      )
                    )
                      return true;
                    else return false;
                  }
                },
              );
              console.log('allconindex:', allconindex);
              if (allconindex == -1) {
                this.state.filteredContactData.push({
                  name: this.state.userConnectionData[lenKey].name,
                  phoneNumber: this.state.userConnectionData[lenKey].phone,
                  display: 'flex',
                  color: 'rgba(256,256,256,0.6',
                  tag: 'invitation',
                  checked: true,
                  relId: this.state.userConnectionData[lenKey].relId,
                  opacity: new Animated.Value(0),
                  scale: new Animated.Value(1),
                  status: false,
                });
              } else {
                console.log('item found in all recents');
                this.state.filteredContactData.push({
                  name: this.state.allRecentContactsArray[allconindex].name,
                  phoneNumber:
                    this.state.allRecentContactsArray[allconindex].phoneNumber,
                  display: 'flex',
                  color: 'rgba(256,256,256,0.6',
                  tag: 'invitation',
                  checked: true,
                  relId: this.state.userConnectionData[lenKey].relId,
                  opacity: new Animated.Value(0),
                  scale: new Animated.Value(1),
                  status: false,
                });
                this.state.allRecentContactsArray.splice(allconindex, 1);
              }

              this.state.dataDrag.push('');
              this.pan = this.state.dataDrag.map(() => new Animated.ValueXY());
              console.log(this.state.filteredContactData.length);
              let arrlen = this.state.filteredContactData.length - 1;
              // this.state.chatName = this.state.filteredContactData[arrlen].name;
            } else {
              console.log('found the item:', index);
              this.state.filteredContactData[index].relId =
                this.state.userConnectionData[lenKey].relId;
              this.state.filteredContactData[index].tag = 'invitation';
              this.state.filteredContactData[index].color =
                'rgba(256,256,256,0.6';
              this.state.filteredContactData[index].checked = true;
              console.log(this.state.filteredContactData[index]);
            }
            this.state.showCnctn[lenKey] = 'flex';
          }
          if (k == tempConnArr.length - 1) {
            await AsyncStorage.setItem(
              'updatedContactList',
              JSON.stringify(this.state.filteredContactData),
            );
            let lastindex = this.state.filteredContactData.length - 1;

            console.log('fltrd:', this.state.filteredContactData.length);
            console.log('rcnt:', this.state.allRecentContactsArray.length);
            console.log(
              'allandroid:',
              this.state.allAndroidContactsArray.length,
            );

            if (
              this.state.filteredContactData.length > this.state.dottop.length
            ) {
              // let oldlen = this.state.dottop.length;
              let startIndex = this.state.dotColorLocation.length;
              let newlen = this.state.filteredContactData.length;
              console.log(startIndex, newlen);

              let centerdotsize = (screenwidth * 60) / 100; //150;
              // Minimum radius
              let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
              this.state.dotColorLocation = await this.displayRadialText(
                this.state.filteredContactData,
                'contacts',
                centerdotsize,
                true,
                'large',
              );
              console.log('debugtimer2:', debugtimer);
              // console.log(this.state.dotColorLocation)
              for (let i = 0; i < this.state.filteredContactData.length; i++) {
                this.state.filteredContactData[i].color = JSON.parse(
                  JSON.stringify(this.state.dotColorLocation[i].col),
                );
                dotColors[i] = JSON.parse(
                  JSON.stringify(this.state.dotColorLocation[i].col),
                );
                if (confusername != '') {
                  if (this.state.dotColorLocation.length > 3) {
                  }
                }
                //adding new code from here
                if (i == this.state.filteredContactData.length - 1) {
                  console.log('dot colors:', dotColors);
                  this.forceUpdate();

                  global.btoa = require('base-64').encode;
                  encodedContacts = await global.btoa(multipleContacts);

                  var clrArr;

                  setTimeout(() => {
                    for (
                      let j = startIndex;
                      j < this.state.filteredContactData.length;
                      j++
                    ) {
                      try {
                        Animated.timing(
                          this.state.filteredContactData[j].opacity,
                          {
                            toValue: 1,
                            duration: 600,
                            useNativeDriver: false,
                          },
                        ).start();
                        console.log(this.state.filteredContactData[j]);
                        setTimeout(() => {
                          Animated.timing(
                            this.state.filteredContactData[j].scale,
                            {
                              toValue: 2,
                              duration: 600,
                              useNativeDriver: false,
                            },
                          ).start();
                        }, 600);
                        setTimeout(() => {
                          Animated.timing(
                            this.state.filteredContactData[j].scale,
                            {
                              toValue: 1,
                              duration: 600,
                              useNativeDriver: false,
                            },
                          ).start();
                        }, 1200);
                        setTimeout(() => {
                          try {
                            if (
                              this.state.filteredContactData[j].status == false
                            ) {
                              // this.state.filteredContactData[j].status = true
                              // this.state.filteredContactData[j].color = "gray"
                            }
                          } catch (e) {
                            console.log('error status');
                          }
                        }, 1200);
                      } catch (e) {
                        console.log('error opacity');
                      }
                    }
                  }, 300);
                  // }
                }
                //to here
              }
            }

            console.log('allconvarr:', allConversationArr);
            let x = allConversationArr.map(item => item['convid']);
            console.log(x);
            let y = null;
            multiconvids = null;

            x.forEach(function (item, index) {
              if (multiconvids == null) {
                multiconvids = item;
              } else {
                multiconvids += ',' + item;
              }
            });
            console.log(multiconvids);
            global.btoa = require('base-64').encode;
            encodedConvid = global.btoa(multiconvids);
            console.log(encodedConvid);
            this.forceUpdate();
            setTimeout(() => {
              pendingmessagesnotificationarray = [];

              if (multiconvids != null) {
                this.joinConversation(confusername, -1);
              }
              if (multiconvids != null) {
                this.convertFlakeToUsername(confusername, true);
              }
            }, 300); //500
          }
        }
      } else {
        if (this.state.filteredContactData.length > 0) {
          this.setState({notificationDialogModal: true});
        }
      }
    } catch (e) {
      console.log('sortandmatchdata exception:', e);
    }
  };
  getPanResponder = index => {
    // console.log('pan:',this.pan[index].x,this.pan[index].y)
    return PanResponder.create({
      //Step 2
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            //Step 3
            dx: this.pan[index].x,
            dy: this.pan[index].y,
          },
        ],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          //Step 14
          this.state.filteredContactData[index].display = 'none';
          // console.log("bfr:", arr.length)
          console.log('bfr:', this.state.filteredContactData.length);
          try {
            let x = [];
            AsyncStorage.getItem('deletedRecentContacts').then(asyncStorage => {
              console.log('arrdlt:' + asyncStorage);
              if (asyncStorage !== null) {
                let x = JSON.parse(asyncStorage).concat(
                  this.state.filteredContactData[index].phoneNumber,
                );
                // We have data!!
                AsyncStorage.setItem(
                  'deletedRecentContacts',
                  JSON.stringify(x),
                );
                //   console.log(JSON.parse(myArray));
              } else {
                console.log('inside set');
                x = x.concat(this.state.filteredContactData[index].phoneNumber);
                AsyncStorage.setItem(
                  'deletedRecentContacts',
                  JSON.stringify(x),
                ).then(asy => {
                  console.log(asy);
                });
              }
            });
          } catch (error) {
            console.log('Error retrieving data');
          }
          this.setState({
            // showDraggable: false, //Step 16
            showDelete: 'none',
          });
          try {
            setTimeout(() => {
              if (this.state.filteredContactData[index].tag == 'invitation') {
                connectionIndex = index;
                this.state.inviteRelationId =
                  this.state.filteredContactData[index]['relId'];
                this.denyInvite(this.state.inviteRelationId);

                Animated.spring(
                  //Step 7
                  this.pan[index], //Step 8
                  {
                    toValue: {x: 0, y: 0},
                    useNativeDriver: false,
                  }, //Step 9
                ).start();
                setTimeout(() => {
                  // this.forceUpdate();
                }, 100);
              } else if (
                this.state.filteredContactData[index].tag == 'conversation'
              ) {
                this.deleteUserFromGraph(
                  [this.state.filteredContactData[index].convid],
                  confusername,
                  [this.state.filteredContactData[index]],
                );
                this.setState({removingContactsView: 'none'});
                // arr.splice(index, 1);
                this.state.filteredContactData.splice(index, 1);
                this.state.dotColorLocation.splice(index, 1);
                Animated.spring(
                  //Step 7
                  this.pan[index], //Step 8
                  {
                    toValue: {x: 0, y: 0},
                    useNativeDriver: false,
                  }, //Step 9
                ).start();
                setTimeout(() => {
                  // this.forceUpdate();
                }, 100);
              } else {
                if (this.state.allRecentContactsArray.length > 0) {
                  this.state.filteredContactData[index] =
                    this.state.allRecentContactsArray[0];
                  this.state.filteredContactData[index].checked = true;
                  this.state.allRecentContactsArray.splice(0, 1);
                  let updatedList = [];

                  AsyncStorage.setItem(
                    'updatedContactList',
                    JSON.stringify(this.state.filteredContactData),
                  );
                  // console.log("aftrr:", arr.length, this.state.allRecentContactsArray.length)
                  console.log('aftrr:', this.state.filteredContactData.length);
                  console.log(this.state.allRecentContactsArray);
                  Animated.spring(
                    //Step 7
                    this.pan[index], //Step 8
                    {
                      toValue: {x: 0, y: 0},
                      useNativeDriver: false,
                    }, //Step 9
                  ).start();
                  setTimeout(() => {
                    this.forceUpdate();
                    Animated.timing(
                      this.state.filteredContactData[index].scale,
                      {
                        toValue: 2,
                        duration: 500,
                        useNativeDriver: false,
                      },
                    ).start();
                    setTimeout(() => {
                      Animated.timing(
                        this.state.filteredContactData[index].scale,
                        {
                          toValue: 1,
                          duration: 500,
                          useNativeDriver: false,
                        },
                      ).start();
                    }, 500);
                  }, 100);
                } else {
                  this.state.filteredContactData.splice(index, 1);
                  this.state.dotColorLocation.splice(index, 1);
                  let updatedList = [];

                  AsyncStorage.setItem(
                    'updatedContactList',
                    JSON.stringify(this.state.filteredContactData),
                  );
                  Animated.spring(
                    //Step 7
                    this.pan[index], //Step 8
                    {
                      toValue: {x: 0, y: 0},
                      useNativeDriver: false,
                    }, //Step 9
                  ).start();
                  setTimeout(() => {
                    this.forceUpdate();
                  }, 100);
                  // }
                }
              }
              try {
              } catch (e) {
                console.log(e);
              }
            }, 500);
          } catch (e) {
            console.log(e);
          }
        } else {
          Animated.spring(
            //Step 7
            this.pan[index], //Step 8
            {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
            }, //Step 9
          ).start();
          this.forceUpdate();
        } //Step 4
      },
    });
  };
  isDropZone(gesture) {
    //Step 15
    try {
      if (this.state.showDelete == 'flex') {
        var dz = this.state.dropZoneValues;
        console.log('dz:', dz);
        if (dz != null) {
          // console.log(dz.x,gesture.moveX,dz.y,dz.height,gesture.moveY)
          //dz.height-->delete view height, dz.y-->margin top,
          return (
            gesture.moveX > dz.x - 30 &&
            gesture.moveY > dz.y - 50 &&
            gesture.moveY < dz.y + dz.height + 30
          );
        }
      } else {
      }
    } catch (e) {
      console.error('setdropzoneerror:', e);
    }
  }
  setDropZoneValues(event) {
    //Step 12
    console.log('dropzonevalues:', event.nativeEvent.layout);
    this.setState({
      dropZoneValues: event.nativeEvent.layout,
    });
  }
  getPanResponderNote = index => {
    // console.log('pannote:',this.pannote[index].x,this.pannote[index].y,index)
    return PanResponder.create({
      //Step 2
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            //Step 3
            dx: this.pannote[index].x,
            dy: this.pannote[index].y,
          },
        ],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZoneNote(gesture)) {
          //Step 14
          this.state.NotesAppData[index].display = 'none';
          try {
          } catch (error) {
            console.log('Error retrieving data');
            // alert(error)
          }
          this.setState({
            // showDraggable: false, //Step 16
            showDeleteNote: 'none',
          });
          try {
            setTimeout(async () => {
              try {
                if (Platform.OS == 'ios') {
                  var path =
                    RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/notes/';
                } else {
                  var path =
                    RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/notes/';
                }
                let isNotes = await RNFetchBlob.fs.isDir(path);
                console.log('isnotes:', isNotes);
                if (isNotes == true) {
                  let isFile = await RNFetchBlob.fs
                    .ls(path)
                    .then(async files => {
                      console.log(files.length);
                      if (files.length > 0) {
                        await RNFetchBlob.fs.unlink(path + '/' + files[index]);
                        console.log('unlink path:', path + '/' + files[index]);
                        files.splice(index, 1);
                      }
                    });
                }
              } catch (error) {
                console.log('Error retrieving data');
                // alert(error)
              }
              this.state.NotesAppData.splice(index, 1);
              this.state.NotesDotsLocations.splice(index, 1);
              NotesAppMappedData.splice(index, 1);
              Animated.spring(
                //Step 7
                this.pannote[index], //Step 8
                {
                  toValue: {x: 0, y: 0},
                  useNativeDriver: false,
                }, //Step 9
              ).start();
              setTimeout(() => {
                this.forceUpdate();
              }, 100);
              try {
              } catch (e) {
                console.log(e);
              }
            }, 500);
          } catch (e) {
            console.log(e);
          }
        } else {
          Animated.spring(
            //Step 7
            this.pannote[index], //Step 8
            {
              toValue: {x: 0, y: 0},
              useNativeDriver: false,
            }, //Step 9
          ).start();
          this.forceUpdate();
        } //Step 4
      },
    });
  };
  isDropZoneNote(gesture) {
    //Step 15
    if (this.state.showDeleteNote == 'flex') {
      var dz = this.state.dropZoneValuesNote;
      // console.log(dz.x,gesture.moveX,dz.y,dz.height,gesture.moveY)
      //dz.height-->delete view height, dz.y-->margin top,
      return (
        gesture.moveX > dz.x - 30 &&
        gesture.moveY > dz.y - 50 &&
        gesture.moveY < dz.y + dz.height + 30
      );
    } else {
    }
  }
  setDropZoneValuesNote(event) {
    //Step 12
    this.setState({
      dropZoneValuesNote: event.nativeEvent.layout,
    });
  }
  selectFewerProps(show) {
    // console.log("show");
    // console.log(show);
    try {
      if (Platform.OS === 'android') {
        //     if(this.state.allAndroidContactsArray.length==0){
        //         const { givenName,familyName, phoneNumbers } = show;
        //         let name = givenName+" "+familyName;
        //         let phoneNumber = phoneNumbers[0].number;
        //         return { name, phoneNumber };
        //     }
        // else{
        let {name, phoneNumber} = show;
        if (name == undefined && phoneNumber == undefined) {
          //bcs prop name is diff for calls and contacts
          const {givenName, familyName, phoneNumbers} = show;
          //  console.log(phoneNumbers.length)
          if (phoneNumbers.length > 0) {
            // console.log(givenName,familyName,phoneNumbers[0].number)
            let name = givenName + ' ' + familyName;
            let phoneNumber = phoneNumbers.find(
              x => x.label === 'mobile',
            ).number;
            return {name, phoneNumber};
          } else {
            console.log('undefined data');
            // console.log(show)
          }
        } else {
          console.log(name, phoneNumber);
          name += ' ';
          return {name, phoneNumber};
        }
        // }
      } else if (Platform.OS === 'ios') {
        const {givenName, familyName, phoneNumbers} = show;
        let name = givenName + ' ' + familyName;
        let phoneNumber = phoneNumbers.find(x => x.label === 'mobile').number;
        return {name, phoneNumber};
      }
    } catch (e) {
      console.log(e);
    }
  }
  async displayRecentContacts(callArray) {
    await AsyncStorage.getItem('deletedRecentContacts').then(as => {
      let dltdItems = JSON.parse(as);
      console.log(dltdItems);
      console.log('dltd bfr:', dltdItems, callArray.length);
      if (as != null) {
        if (dltdItems.length > 0) {
          for (let i = 0; i < dltdItems.length; i++) {
            const data = callArray.filter(item => {
              var x = item;
              console.log('x:', x);
              if (!(x.phoneNumber.indexOf(dltdItems[i]) > -1)) {
              } else {
                callArray.splice(callArray.indexOf(item), 1);
              }
            });
          }
        }
        console.log('dltd aftr:', dltdItems, callArray.length);
        this.state.allRecentContactsArray = callArray.map(
          this.selectFewerProps,
        );
        this.state.allRecentContactsArray.forEach(element => {
          element.color = 'gray';
          element.display = 'flex';
          element.tag = 'contact';
          element.checked = false;
          element.opacity = new Animated.Value(1);
          element.scale = new Animated.Value(1);
        });
      } else {
        this.state.allRecentContactsArray = callArray.map(
          this.selectFewerProps,
        );
        this.state.allRecentContactsArray.forEach(element => {
          element.color = 'gray';
          element.display = 'flex';
          element.tag = 'contact';
          element.checked = false;
          element.opacity = new Animated.Value(1);
          element.scale = new Animated.Value(1);
        });
      }
    });
    console.log(
      'callarray length1:' + this.state.allRecentContactsArray.length,
      this.state.allAndroidContactsArray.length,
    );
    console.log(
      'callarray length now:' + this.state.allRecentContactsArray.length,
    );
    if (this.state.allRecentContactsArray.length > 0) {
      await AsyncStorage.getItem('updatedContactList').then(asyncStorage => {
        if (asyncStorage != null) {
          this.state.filteredContactData = JSON.parse(asyncStorage);
          console.log(
            'updated list is not null:',
            this.state.filteredContactData.length,
            this.state.dotColorLocation.length,
          );
          console.log(
            'fcd,allrcnt bfr:',
            this.state.filteredContactData.length,
            this.state.allRecentContactsArray.length,
          );
          if (this.state.allRecentContactsArray.length > 0) {
            for (let i = 0; i < this.state.filteredContactData.length; ) {
              let call_i = this.state.filteredContactData[
                i
              ].phoneNumber.replace(/[^0-9]/g, '');
              let indexFcd = this.state.allRecentContactsArray.findIndex(
                object => {
                  if (object != null && call_i != null) {
                    if (
                      object.phoneNumber.replace(/[^0-9]/g, '').length <=
                      call_i.length
                    ) {
                      if (
                        call_i.endsWith(
                          object.phoneNumber.replace(/[^0-9]/g, ''),
                        )
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    } else if (
                      object.phoneNumber.replace(/[^0-9]/g, '').endsWith(call_i)
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                },
              );
              if (indexFcd == -1) {
                i++;
              } else {
                this.state.allRecentContactsArray.splice(indexFcd, 1);
                i = i;
              }
            }
          }
          console.log(
            'fcd,allrcnt aftr:',
            this.state.filteredContactData.length,
            this.state.allRecentContactsArray.length,
          );
        } else {
          console.log('updated list is null');
          if (this.state.allRecentContactsArray.length > 10) {
            let uniqueElements = new Set();
            // Continue selecting elements until reaching the desired number of unique elements
            while (uniqueElements.size < 10) {
              // Randomly choose an index from the array
              let randomIndex = Math.floor(
                Math.random() * this.state.allRecentContactsArray.length,
              );
              // Add the selected element to the Set
              uniqueElements.add(
                this.state.allRecentContactsArray[randomIndex],
              );
              this.state.allRecentContactsArray.splice(randomIndex, 1);
            }
            // Convert the Set back to an array
            let randomUniqueElements = Array.from(uniqueElements);
            this.state.filteredContactData = randomUniqueElements;
          } else {
            try {
              if (this.state.allRecentContactsArray.length == 10) {
                console.log('call length 10');
                let x = this.state.allRecentContactsArray;
                this.state.filteredContactData = JSON.parse(JSON.stringify(x));
              } else {
                console.log('call length < 10');
                let x = this.state.allRecentContactsArray;
                this.state.filteredContactData = JSON.parse(JSON.stringify(x));
                console.log(this.state.filteredContactData.length);
              }
            } catch (e) {
              console.log(e);
              alert(e);
            }
          }
        }
      });
    }
    let overlapping = false;
    var crcls = [];
    let pos = this.state.contactsPosition;
    if (this.state.filteredContactData.length > 0) {
      let updatedList = [];
      if (this.state.UnlockScreenData.length == 0) {
        AsyncStorage.getItem('LockScreenData').then(asyncst => {
          if (asyncst == null) {
            this.state.filteredContactData.forEach(element => {
              this.state.UnlockScreenData.push({
                name: element.name,
                phoneNumber: element.phoneNumber,
              });
            });
            this.ManageUnlockScreenData();
          } else {
            this.state.UnlockScreenData = JSON.parse(asyncst);
          }
        });
      }
      let centerdotsize = (screenwidth * 60) / 100; //150;
      // Minimum radius
      let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
      this.state.dotColorLocation = await this.displayRadialText(
        this.state.filteredContactData,
        'contacts',
        centerdotsize,
        true,
        'large',
      );
      // this.forceUpdate();
      console.log(this.state.dotColorLocation);
      try {
        AsyncStorage.getItem('allContactDotColors').then(asyncStorage => {
          let clrArr = JSON.parse(asyncStorage);
          console.log('clrd arr:', clrArr);
          if (clrArr != null) {
            if (clrArr.length > 0) {
              if (this.state.filteredContactData.length > 0) {
                for (
                  let i = 0;
                  i < this.state.filteredContactData.length;
                  i++
                ) {
                  clrArr.forEach(async element => {
                    let elem_num = element.phoneNumber.replace(/[^0-9]/g, '');
                    let phn_num = this.state.filteredContactData[
                      i
                    ].phoneNumber.replace(/[^0-9]/g, '');
                    if (elem_num.length <= phn_num.length) {
                      if (phn_num.endsWith(elem_num)) {
                        // this.state.filteredContactData[i].tag = "Invited"
                      }
                    } else {
                      if (elem_num.endsWith(phn_num)) {
                        // this.state.filteredContactData[i].tag = "Invited"
                      }
                    }
                  });
                }
              }
            }
          }
        });
      } catch (error) {
        console.log('Error retrieving dotcolors');
      }
      console.log(dotColors);
      setTimeout(() => {
        for (let i = 0; i < this.state.filteredContactData.length; i++) {
          this.state.filteredContactData[i].checked = true;
          this.state.filteredContactData[i].opacity = new Animated.Value(1);
          this.state.filteredContactData[i].scale = new Animated.Value(1);
          // this.forceUpdate();
          if (this.state.filteredContactData[i].tag == 'conversation') {
            allConversationArr.push({
              convid: this.state.filteredContactData[i].convid,
              clientPeer: null,
              remotePeer: null,
              datachannel: null,
              sendChannel: null,
              canOfferP2P: true,
              canReceiveP2P: true,
              status: '',
            });
            this.state.tempMsgArr.push({
              key: this.state.filteredContactData[i].convid,
              data: [],
            });
            pendingonlinemsgarr.push({
              key: this.state.filteredContactData[i].convid,
              data: [],
            });
          }
          this.state.filteredContactData[i].color = JSON.parse(
            JSON.stringify(this.state.dotColorLocation[i].col),
          );
          dotColors[i] = JSON.parse(
            JSON.stringify(this.state.dotColorLocation[i].col),
          );
          if (this.state.dotColorLocation.length > 3) {
            this.increasedotsize(
              Number.parseInt(
                JSON.stringify(this.state.dotColorLocation[i].width),
              ),
              i,
              this.state.dotColorLocation.length,
              this.state.dotColorLocation,
            );
          }
          if (i == this.state.filteredContactData.length - 1) {
            //    this.state.allRecentContactsArray.splice(0, this.state.allRecentContactsArray.length);
            console.log('fltrd:', this.state.filteredContactData.length);
            // console.log("arr:", arr.length)
            console.log('allrcnt:', this.state.allRecentContactsArray.length);
            console.log(this.state.filteredContactData);
            // if (this.state.filteredContactData.length == arr.length) {
            let xx = this.state.filteredContactData.map(
              ({phoneNumber}) => phoneNumber,
            );
            xx.forEach(function (item, index) {
              if (multipleContacts == null) {
                multipleContacts = item;
              } else {
                multipleContacts += ',' + item;
              }
            });
            console.log(multipleContacts);
            global.btoa = require('base-64').encode;
            encodedContacts = global.btoa(multipleContacts);
            // console.log(encodedContacts)
            setTimeout(() => {
              this.getOnlineStatus(encodedContacts);
            }, 100);
            // while(this.state.onlineOfflineIndicator[0]){
            if (AppState.currentState == 'active') {
              getStatusInterval = setInterval(() => {
                multipleContacts = null;
                let xx = this.state.filteredContactData.map(
                  ({phoneNumber}) => phoneNumber,
                );
                xx.forEach(function (item, index) {
                  if (multipleContacts == null) {
                    multipleContacts = item;
                  } else {
                    multipleContacts += ',' + item;
                  }
                });
                // console.log(multipleContacts)
                global.btoa = require('base-64').encode;
                encodedContacts = global.btoa(multipleContacts);
                // console.log(encodedContacts)
                // this.getOnlineStatus(encodedContacts);
                this.timerOnGetStatusCall(encodedContacts);
                this.state.onlineOfflineIndicator[0] = true;
                // console.log(this.state.filteredContactData);
              }, 15000);
              // }
            }
            console.log('fltrd:', this.state.filteredContactData.length);
            // console.log("arr:", arr.length)
            console.log('allrcnt:', this.state.allRecentContactsArray.length);
            // }
            isMounted = true;
          }
        }
        AsyncStorage.getItem('cachedconversation').then(asyncStorage => {
          if (asyncStorage != null) {
            userGraph = JSON.parse(asyncStorage);
            console.log('cachedconv:', userGraph.edgearr.length);
            if (userGraph.edgearr.length > 0) {
              // this.sortAndMatchData();
            }
          }
        });
      }, 500);
    }
    this.checkBatteryOptimization();
  }
  async requestPermissions() {
    try {
      if (Platform.OS === 'ios') {
        await request(PERMISSIONS.IOS.CONTACTS).then(result => {
          console.log(result);
        });
        check(PERMISSIONS.IOS.CONTACTS)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log(
                  'This feature is not available (on this device / in this context)',
                );
                break;
              case RESULTS.DENIED:
                console.log(
                  'The permission has not been requested / is denied but requestable',
                );
                break;
              case RESULTS.LIMITED:
                console.log(
                  'The permission is limited: some actions are possible',
                );
                break;
              case RESULTS.GRANTED:
                console.log('The permission is granted');
                Contacts.getAll()
                  .then(contacts => {
                    for (let i = 0; i < contacts.length; ) {
                      if (contacts[i] != null) {
                        if (contacts[i].phoneNumbers.length == 0) {
                          // console.log(contacts[i])
                          contacts.splice(i, 1);
                          i = i;
                        } else {
                          i++;
                        }
                      }
                    }
                    for (let k = 0; k < contacts.length; k++) {
                      for (let j = k + 1; j < contacts.length; j++) {
                        if (contacts[j] != null && contacts[k] != null) {
                          // console.log(contacts[k], contacts[j], k, j)
                          // console.log(contacts[k].phoneNumbers.find(x => x.label === 'mobile'), contacts[j].phoneNumbers.find(x => x.label === 'mobile'))
                          if (
                            contacts[k].phoneNumbers.find(
                              x => x.label === 'mobile',
                            ) == undefined ||
                            contacts[j].phoneNumbers.find(
                              x => x.label === 'mobile',
                            ) == undefined
                          ) {
                            if (
                              contacts[k].phoneNumbers.find(
                                x => x.label === 'mobile',
                              ) == undefined
                            ) {
                              contacts.splice(k, 1);
                              k = k;
                            }
                            if (
                              contacts[j].phoneNumbers.find(
                                x => x.label === 'mobile',
                              ) == undefined
                            ) {
                              contacts.splice(j, 1);
                              j = j;
                            }
                          } else {
                            let k_number = contacts[k].phoneNumbers
                              .find(x => x.label === 'mobile')
                              .number.replace(/[^0-9]/g, '');
                            let j_number = contacts[j].phoneNumbers
                              .find(x => x.label === 'mobile')
                              .number.replace(/[^0-9]/g, '');
                            if (k_number.length <= j_number.length) {
                              if (j_number.endsWith(k_number)) {
                                contacts.splice(j, 1);
                                j--;
                              }
                            } else if (k_number.endsWith(j_number)) {
                              contacts.splice(j, 1);
                              j--;
                            }
                          }
                          // if (callArray[k].phoneNumber == callArray[j].phoneNumber) {
                          //     callArray.splice(j, 1);
                          //     j--;
                          // }
                        }
                      }
                    }
                    this.displayRecentContacts(contacts);
                    // this.setState({notificationDialogModal:true})
                    // alert(contacts);
                  })
                  .catch(e => {
                    console.log(e);
                    //this.setState({ loading: false });
                  });
                break;
              case RESULTS.BLOCKED:
                console.log(
                  'The permission is denied and not requestable anymore',
                );
                break;
            }
          })
          .catch(error => {
            // …
          });
      }
    } catch (err) {
      console.warn(err);
    }
    try {
      if (Platform.OS === 'android') {
        const resp = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          // PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        PermissionsAndroid.check('android.permission.READ_SMS').then(res => {
          console.log('SMS:' + res);
          if (res == true) {
          } else {
            Alert.alert(
              'SMS Permission',
              'We need access to your SMS to auto-read OTP for verification and send invitation to contacts. Please grant SMS permissions.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Permission request cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: async () => {
                    try {
                      const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.SEND_SMS,
                        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                        PermissionsAndroid.PERMISSIONS.READ_SMS,
                      ]);

                      if (
                        granted[PermissionsAndroid.PERMISSIONS.SEND_SMS] ===
                          PermissionsAndroid.RESULTS.GRANTED &&
                        granted[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] ===
                          PermissionsAndroid.RESULTS.GRANTED &&
                        granted[PermissionsAndroid.PERMISSIONS.READ_SMS] ===
                          PermissionsAndroid.RESULTS.GRANTED
                      ) {
                        console.log('SMS permissions granted');
                      } else {
                        console.log('SMS permissions denied');
                      }
                    } catch (err) {
                      console.warn(err);
                    }
                  },
                },
              ],
            );
          }
        });

        console.log('resp:', resp);
        if (resp === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('use');
        } else {
          console.log('not use');
        }
      }
    } catch (err) {
      console.warn(err);
    }
    if (Platform.OS === 'android') {
      PermissionsAndroid.check('android.permission.READ_CONTACTS').then(res => {
        console.log('contacts:' + res);
        if (res == true) {
          this.loadContacts();
        } else {
          console.log('contact permission not granted.');
        }
      });
    }
  }
  ManageUnlockScreenData = async () => {
    if (this.state.filteredContactData.length > 0) {
      if (this.state.filteredContactData.length < 20) {
        for (let i = 0; i < 20 - this.state.filteredContactData.length; i++) {
          this.state.UnlockScreenData.push({
            name: Math.random()
              .toString(36)
              .slice(2)
              .replace(/[^A-Za-z]/g, ''),
            phoneNumber: Math.floor(
              1000000000 + Math.random() * 900000,
            ).toString(),
          });
        }
      } else {
        for (
          let i = 0;
          i < this.state.filteredContactData.slice(0, 20).length;
          i++
        ) {
          this.state.UnlockScreenData.push({
            name: Math.random()
              .toString(36)
              .slice(2)
              .replace(/[^A-Za-z]/g, ''),
            phoneNumber: Math.floor(
              1000000000 + Math.random() * 900000,
            ).toString(),
          });
        }
      }
    } else {
      for (let i = 0; i < 20; i++) {
        this.state.UnlockScreenData.push({
          name: Math.random()
            .toString(36)
            .slice(2)
            .replace(/[^A-Za-z]/g, ''),
          phoneNumber: Math.floor(
            1000000000 + Math.random() * 900000,
          ).toString(),
        });
      }
    }
    let centerdotsize = 50; //(screenwidth * 34 / 100);                 //150;
    // Minimum radius
    let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
    let locs = await this.displayRadialText(
      this.state.UnlockScreenData,
      'contacts',
      centerdotsize,
      true,
      'small',
    );
    for (let j = 0; j < locs.length; j++) {
      this.state.UnlockScreenData[j].locations = locs[j];
      await this.increaselockdotsize(
        Number.parseInt(
          JSON.stringify(this.state.UnlockScreenData[j].locations.width),
        ),
        j,
        locs.length,
        this.state.UnlockScreenData,
      );
    }
    await AsyncStorage.setItem(
      'LockScreenData',
      JSON.stringify(this.state.UnlockScreenData),
    );
    console.log(this.state.UnlockScreenData.length);
  };
  StartValidatingProcess = (index, type) => {
    clearTimeout(testtimeoutid);
    console.log('start valid:', validating_password, temp_password);
    validating_password += index + type;
    console.log('start valid:', validating_password, temp_password);
    testtimeoutid = setTimeout(() => {
      isTypingPassword = false;
      if (isTypingPassword == false) {
        console.log('inside timer');
        this.ValidateLock(temp_password, validating_password);
      }
    }, 2000);
    // if (validating_password.length >= temp_password.length) {
    //     console.log("length matched")
    //     this.ValidateLock(temp_password,validating_password)
    // }
  };
  ValidateLock = async (applock, userlock) => {
    console.log(applock, userlock);
    if (applock == userlock) {
      borderindex += 1;
      if (borderindex == 1) {
        this.setState({blw: 'green'});
        validating_password = '';
        this.setState({
          flashopacity: true,
          flashMessage: `Test 1 successful. Box updated.${'\n'}You need 3 more successful tests.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      } else if (borderindex == 2) {
        this.setState({bbw: 'green'});
        validating_password = '';
        this.setState({
          flashopacity: true,
          flashMessage: `Test 2 successful. Box updated.${'\n'}You need 2 more successful tests.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      } else if (borderindex == 3) {
        this.setState({brw: 'green'});
        validating_password = '';
        this.setState({
          flashopacity: true,
          flashMessage: `Test 3 successful. Box updated.${'\n'}You need 1 more successful tests.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      } else if (borderindex == 4) {
        let pos = this.state.currentPosition + 1;
        this.setState({btw: 'green'});
        islockvalidated = true;
        validating_password = '';
        this.setState({
          flashopacity: true,
          flashMessage: `Lock tested successfully.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: 'green',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
        setTimeout(() => {
          dismissKeyboard();
          this.setState({
            UnlockScreenUI: false,
            showView: true,
            currentPosition: pos,
          });
        }, 1500);
      }
    } else {
      this.setState({
        flashopacity: true,
        flashMessage: `Test ${
          borderindex + 1
        } failed.${'\n'}The box is being reset.${'\n'}You still need 4 successful tests.`,
        flashColor: 'lightgray',
        flashPosition: '50%',
        textcolor: '#D21F3C',
      });
      setTimeout(() => {
        this.setState({flashopacity: false});
      }, 3500);
      // alert('wrong password entered')
      validating_password = '';
      islockvalidated = false;
      borderindex = 0;
      this.setState({blw: 'white', brw: 'white', btw: 'white', bbw: 'white'});
    }
  };
  SetAppLock = async () => {
    // setTimeout(() => {
    // this.setState({ currentPosition: this.state.currentPosition + 1 })
    setTimeout(() => {
      this.setState({enableLockProcessModal: false, showSettingModal: false});
      showMessage({
        style: {
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: 'lightgray',
          opacity: 0.9,
          width: '80%',
        },
        message:
          'Now newauth app is protected by the pattern lock you just set.',
        description: `${'\n'}The next time you restart the app, you will need to enter the same pattern on the lock screen.${'\n'}${'\n'}Click anywhere on the dialog to close.`,
        type: 'success',
        color: 'green',
        animated: true,
        animationDuration: 300,
        duration: 50000,
        hideOnPress: true,
      });
    }, 1000);
    // global.btoa = require('base-64').encode;
    // let encodedLock = global.btoa(applock);
    sha256(temp_password)
      .then(hash => {
        // console.log("hashed value:",hash);
        AsyncStorage.setItem('newauthapplock', hash);
        AsyncStorage.setItem('isapplockenabled', JSON.stringify(true));
        this.setState({lockEnabledState: true});
        // AsyncStorage.setItem('newauthapplocksize', JSON.stringify(applock.length))
      })
      .catch(e => {
        console.log('error creating hashed password:', e);
      });
    setTimeout(() => {
      temp_password = '';
      validating_password = '';
      islockvalidated = false;
      this.setState({
        currentPosition: 0,
        blw: 'white',
        brw: 'white',
        btw: 'white',
        bbw: 'white',
      });
      this.forceUpdate();
    }, 1500);
    // }, 1000);
  };
  ConfigureUnlockScreen = password => {
    console.log('pressed');
    clearTimeout(passwordsettimeoutid);
    // AsyncStorage.setItem('newauthapplock',password)
    // AsyncStorage.setItem('isapplockenabled',JSON.stringify(true))
    if (
      this.state.LockValidationObject.onelongpress >= 1 &&
      this.state.LockValidationObject.twodots >= 2 &&
      this.state.LockValidationObject.threeclicks >= 3
    ) {
      this.setState({
        flashopacity: true,
        flashMessage: `Lock configured successfully.`,
        flashColor: 'lightgray',
        flashPosition: '50%',
        textcolor: 'green',
      });
      setTimeout(() => {
        this.setState({flashopacity: false});
      }, 3500);
      setTimeout(() => {
        this.setState({UnlockScreenUI: false, showView: true});
        setTimeout(() => {
          if (this.state.enableLockProcessModal == true) {
            let x = this.state.currentPosition + 1;
            this.setState({currentPosition: 1});
          }
          setTimeout(() => {
            dismissKeyboard();
          }, 1000);
        }, 1000);
      }, 3000);
    } else {
      temp_password = '';
      this.setState({LockInstructionsModal: true});
      this.forceUpdate();
    }
  };
  ProceedToTestLock = step => {
    if (step == 2) {
      if (temp_password != '') {
        if (islockvalidated == true) {
          this.SetAppLock();
        }
      }
    } else if (step == 1) {
      if (temp_password != '') {
        if (islockvalidated == false) {
          this.setState({
            UnlockScreenUI: true,
            showView: false,
            isValidatingLock: true,
          });
          showMessage({
            message: `To complete the test step, successfully open the lock four times in a row ${'\n'}${'\n'}The box at the top right corner will track your progress.`,
            description: `${'\n'}${'\n'}${'\n'}Ready? ${'\n'}${'\n'}${'\n'}Click anywhere on the dialog to begin`,
            hideOnPress: true,
            autoHide: false,
            // description: 'Press your dots and click the above box to test your lock',
            type: 'info',
            color: 'black',
            textStyle: {textAlign: 'center', fontSize: 15},
            titleStyle: {fontWeight: 'normal'},
            position: 'center',
            animated: true,
            animationDuration: 300,
            duration: 3000,
            style: {
              alignSelf: 'center',
              borderRadius: 5,
              backgroundColor: 'lightgray',
              opacity: 0.9,
            },
          });
        }
      }
    } else {
      temp_password = '';
      islockvalidated = false;
      borderindex = 0;
      this.setState({
        blw: 'white',
        brw: 'white',
        btw: 'white',
        bbw: 'white',
        isValidatingLock: false,
      });
      this.state.LockValidationObject.onelongpress = 0;
      this.state.LockValidationObject.twodots = 0;
      this.state.LockValidationObject.threeclicks = 0;
      this.state.LockValidationObject.show = 'none';
      this.setState({UnlockScreenUI: true, showView: false});
      this.forceUpdate();
      setTimeout(() => {
        this.setState({LockInstructionsModal: true});
      }, 500);
    }
  };
  closeLockInstructionsModal = () => {
    this.state.LockValidationObject.onelongpress = 0;
    this.state.LockValidationObject.twodots = 0;
    this.state.LockValidationObject.threeclicks = 0;
    this.setState({LockInstructionsModal: false});
  };
  startTimerforPasswordInput = (index, type) => {
    clearTimeout(unlocktimeoutid);
    this.StartGettingPassword(index, type);
    unlocktimeoutid = setTimeout(() => {
      isTypingPassword = false;
      if (isTypingPassword == false) {
        console.log('inside timer');
        this.UnlockAppWithDots(user_password_input);
      }
    }, 1000);
  };
  StartGettingPassword = (index, type) => {
    user_password_input += index + type;
    isTypingPassword = false;
    // AsyncStorage.getItem('newauthapplocksize').then(locksize => {
    //     let locklength = JSON.parse(locksize)
    //     if (user_password_input.length >= locklength) {
    //         this.UnlockAppWithDots(user_password_input)
    //     }
    // })
  };
  UnlockAppWithDots = pswd => {
    this.setState({isPasswordWrong: false});
    sha256(pswd).then(password => {
      AsyncStorage.getItem('newauthapplock').then(lock => {
        // console.log("password,hash:",password,lock)
        if (password == lock) {
          this.setState({isPasswordWrong: false});
          user_password_input = '';
          isApplLocked = false;
          failed_password_tries = 0;
          borderindex = 0;
          this.setState({
            blw: 'white',
            brw: 'white',
            btw: 'white',
            bbw: 'white',
          });
          this.setState({UnlockScreenUI: false, showView: true});
        } else {
          user_password_input = '';
          this.setState({isPasswordWrong: true});
          if (failed_password_tries == 4) {
            borderindex = 10;
            if (loggedInuserType == 'flake') {
              AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
                console.log(asyncStorageRes);
                let xy = asyncStorageRes;
                this.setState({
                  homepage: 'none',
                  showLoader: 'flex',
                  UnlockScreenUI: false,
                  showView: true,
                });
                this.authviaflake(xy, true);
                // this.hashUserForAuthentication("bottom-left")
                // this.setState({username:"username"})
                // this.changeValue()
              });
            } else {
              this.setState({
                flashopacity: true,
                flashMessage: `This was your 5th failed attempt. You will get 10 more attempts before the app is disabled.`,
                flashColor: 'lightgray',
                flashPosition: '50%',
                textcolor: '#D21F3C',
              });
              setTimeout(() => {
                this.setState({flashopacity: false});
              }, 3500);
              failed_password_tries += 1;
              this.setState({
                blw: '#D21F3C',
                brw: '#D21F3C',
                btw: '#D21F3C',
                bbw: '#D21F3C',
              });
              this.forceUpdate();
            }
          } else if (failed_password_tries > 4) {
            borderindex -= 1;
            failed_password_tries += 1;
            if (borderindex == 3) {
              this.setState({
                flashopacity: true,
                flashMessage: `You have 3 attempts remaining. Your data will be deleted after 3 more wrong attempts.`,
                flashColor: 'lightgray',
                flashPosition: '50%',
                textcolor: '#D21F3C',
              });
              setTimeout(() => {
                this.setState({flashopacity: false});
              }, 3500);
              this.setState({
                blw: '#D21F3C',
                brw: '#D21F3C',
                btw: '#D21F3C',
                bbw: '#D21F3C',
              });
              this.forceUpdate();
            } else if (borderindex == 0) {
              setTimeout(() => {
                this.setState({AppDisabledModal: true});
                this._appdisableflash.showMessage({
                  style: {
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: 'lightgray',
                    opacity: 0.8,
                  },
                  message: `In order to protect your data, we have removed it after multiple failed attempts to unlock the app. All your settings including the existing lock have also been wiped out. \nYou may restart the app to begin fresh.`,
                  // description:"could not authenticate. Please try again",
                  type: 'danger',
                  color: '#D21F3C',
                  animated: true,
                  animationDuration: 300,
                  duration: 50000,
                  position: 'top',
                  hideOnPress: true,
                });
                // this.setState({blw:'white',brw:'white',btw:'white',bbw:'white'})
                // borderindex = 0;
                // failed_password_tries = 0;
                AsyncStorage.clear();
                RNFetchBlob.fs.unlink(
                  RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/chats',
                );
                RNFetchBlob.fs.unlink(
                  RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/foods',
                );
                RNFetchBlob.fs.unlink(
                  RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/notes',
                );
                RNFetchBlob.fs.unlink(
                  RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/chats',
                );
                RNFetchBlob.fs.unlink(
                  RNFetchBlob.fs.dirs.DocumentDir +
                    '/Newauth/chats/.hiddenchats',
                );
                this.forceUpdate();
              }, 100);
            } else {
              this.forceUpdate();
            }
          } else {
            failed_password_tries += 1;
          }
        }
      });
    });
  };
  hasTwoDifferentNumbers = password => {
    // Use a Set to store unique digits
    const uniqueDigits = new Set();
    // Iterate over each character in the password
    for (const char of password) {
      // Check if the character is a digit
      if (!isNaN(char)) {
        // Add the digit to the set
        uniqueDigits.add(char);
      }
    }
    // Check if the set has at least two different digits
    return uniqueDigits.size >= 2;
  };
  createAppLock = async (x, type) => {
    // let regexp = new RegExp(x, 'g');
    // let isDot = (temp_password.match(regexp) || []).length
    // console.log("isdot:", isDot, regexp, temp_password)
    // if (isDot >= 2) {
    //     // alert('You can use same dot only twice')
    //     temp_password = ""
    //     clearTimeout(passwordsettimeoutid);
    // }
    // else {
    temp_password += x + type;
    this.forceUpdate();
    if (this.hasTwoDifferentNumbers(temp_password)) {
      console.log(
        `The password ${temp_password} is valid.`,
        this.state.LockValidationObject.twodots,
      );
      this.state.LockValidationObject.twodots =
        this.state.LockValidationObject.twodots + 2;
    } else {
      console.log(`The password ${temp_password} is not valid.`);
      this.state.LockValidationObject.twodots =
        this.state.LockValidationObject.twodots;
    }
    this.state.LockValidationObject.threeclicks =
      this.state.LockValidationObject.threeclicks + 1;
    // this.state.LockValidationObject.twodots = this.state.LockValidationObject.twodots + 1
    this.state.LockValidationObject.show = 'flex';
    this.setState({showcrosscheck: 'flex'});
    if (type == 'LT') {
      this.state.LockValidationObject.onelongpress =
        this.state.LockValidationObject.onelongpress + 1;
    }
    console.log(this.state.LockValidationObject);
    this.setState({updateUIState: false});
    clearTimeout(passwordsettimeoutid);
    passwordsettimeoutid = setTimeout(() => {
      this.setState({
        flashopacity: true,
        flashMessage: `If you have selected your pattern, Please click the lock icon and proceed to the test stage.`,
        flashColor: 'lightgray',
        flashPosition: '50%',
        textcolor: 'black',
      });
      setTimeout(() => {
        this.setState({flashopacity: false});
      }, 3500);
    }, 5000);
    // }
  };
  SearchFilter = text => {
    try {
      var cropedarray = [];
      if (text) {
        const newdata = this.state.usersitedata.filter(item => {
          const itemData = item[0]
            ? item[0].toUpperCase()
            : // : ''.toUpperCase() || item.sitepwd ? item.sitepwd.toUpperCase()
              // : ''.toUpperCase() || item.siteuser ? item.siteuser.toUpperCase()
              ''.toUpperCase();
          const textData = text.toUpperCase();
          if (!(itemData.indexOf(textData) > -1)) {
            item = '';
          }
          cropedarray.push(item);
          return cropedarray;
          console.log(itemData.indexOf(textData));
        });
        //    console.log(newdata)
        this.setState({filteredData: cropedarray, search: text});
        // console.log(this.state.filteredData)
        // console.log(cropedarray)
      } else {
        this.setState({filteredData: this.state.usersitedata, search: text});
      }
    } catch (e) {
      console.log(e);
    }
  };
  SearchContactsFilter = async text => {
    try {
      if (copyarray == true) {
        this.state.usercontactdata = JSON.parse(
          JSON.stringify(this.state.filteredContactData),
        );
        copyarray = false;
      }
      var cropedarray = [];
      if (text) {
        const newdata = this.state.filteredContactData.filter(item => {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const itemDataNew = item.phoneNumber ? item.phoneNumber : '';
          const textData = text.toUpperCase();
          if (
            !(itemData.indexOf(textData) > -1) &&
            !(itemDataNew.indexOf(textData) > -1)
          ) {
            item.display = 'none';
            // return itemData.indexOf(textData) > -1
          }
          // if (!(itemDataNew.indexOf(textData) > -1)) {
          //     item.display = "none";
          //     // return itemDataNew.indexOf(textData) > -1
          // }
          else {
            item.display = 'flex';
          }
          // const itemData = item.name ? item.name.toUpperCase()
          //     : item.phoneNumber ? item.phoneNumber.toUpperCase()
          //     : ''.toUpperCase()
          // const textData = text.toUpperCase();
          // if (!(itemData.indexOf(textData) > -1)) {
          //     item.display = "none";
          // }
          // else {
          //     item.display = "flex";
          // }
          cropedarray.push(item);
          return cropedarray;
        });
        this.state.filteredContactData = cropedarray;
        // this.state.filteredContactData.forEach(element => {
        //     let x = element.scale
        //     console.log(element.scale,x)
        //     element.scale = new Animated.Value(x)
        //     element.opacity = new Animated.Value(1)
        // })
        this.setState({searchcontact: text});
        copyarray = false;
      } else {
        this.state.filteredContactData = this.state.usercontactdata;
        // this.state.filteredContactData.forEach(element => {
        //     let x = element.scale
        //     console.log(element.scale,x)
        //     element.scale = new Animated.Value(x)
        //     element.opacity = new Animated.Value(1)
        // })
        this.setState({searchcontact: text});
        copyarray = true;
      }
    } catch (e) {
      console.log(e);
    }
  };
  SearchNotesFilter = text => {
    console.log('srching txt:', text, this.state.searchnotes);
    if (copynotesarray == true) {
      this.state.usernotesdata = JSON.parse(
        JSON.stringify(this.state.NotesAppData),
      );
      console.log(
        'copying array',
        text,
        this.state.searchnotes,
        this.state.NotesAppData.length,
        this.state.usernotesdata.length,
      );
      copynotesarray = false;
    }
    try {
      var cropedarray = [];
      if (text) {
        const newdata = this.state.NotesAppData.filter(item => {
          const itemData = item.note
            ? item.note.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          if (!(itemData.indexOf(textData) > -1)) {
            item.display = 'none';
          } else {
            item.display = 'flex';
          }
          cropedarray.push(item);
          return cropedarray;
        });
        this.state.NotesAppData = cropedarray;
        this.setState({searchnotes: text});
        copynotesarray = false;
      } else {
        this.state.NotesAppData = this.state.usernotesdata;
        this.setState({searchnotes: text});
        copynotesarray = true;
      }
    } catch (e) {
      console.log(e);
    }
  };
  // verify = () => {
  //     var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  //     xhr.onreadystatechange = () => {
  //         console.log(xhr.readyState, xhr.status)
  //         if (xhr.readyState == 4 && xhr.status == 200) {
  //             var jsonres = xhr.responseText;
  //             console.log(jsonres);
  //         }
  //     }
  //     xhr.open('POST', 'https://newauth.io//newauth/api/verifysmsverificationcode');
  //     xhr.withCredentials = true;
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  //     var reqpacket = JSON.stringify({
  //         "phone": "+919057443343",
  //         "verificationKeyCode": "verificationKeyCode",
  //         "verificationKeyInput": "verificationKeyInput",
  //         "status": {}
  //     });
  //     console.log(reqpacket)
  //     // xhr.send(reqpacket);
  //     xhr.open('POST', 'https://newauth.io/newauth/api/invite/externalbyphoneemail');
  //     xhr.withCredentials = true;
  //     xhr.setRequestHeader('Content-Type', 'application/json');
  // }
  measureViewPosition = () => {
    if (this.state.showView == true) {
      this._refCntr.measureInWindow((x, y, wd, ht) => {
        this.state.contactsPosition = {x, y, wd, ht};
        // console.log('center image')
        let lessHeight = (screenheight * 90) / 100;
        console.log(this.state.contactsPosition, screenwidth, screenheight);
        let l = parseInt(x);
        let t = parseInt(y);
        let r = parseInt(x) + parseInt(wd);
        let b = parseInt(y) + parseInt(ht);
        var quad = '';
        if (t < lessHeight / 2) quad += 'N';
        else quad += 'S';
        if (l < screenwidth / 2) quad += 'W';
        else quad += 'E';
        checkPosArray.push({
          top: t,
          bottom: b,
          left: l,
          right: r,
          quad: quad,
        });
        // console.log(checkPosArray)
        // console.log(this.state.dotColorLocation)
      });
    } else if (this.state.displayFlake == true) {
      this._gapRef.measureInWindow((x, y, wd, ht) => {
        this.state.dFViewPosition = {x, y, wd, ht};
        // console.log('center image')
        let lessHeight = (screenheight * 93) / 100;
        console.log(this.state.dFViewPosition);
        let l = parseInt(x);
        let t = parseInt(y);
        let r = parseInt(x) + parseInt(wd);
        let b = parseInt(y) + parseInt(ht);
        var quad = '';
        if (t < lessHeight / 2) quad += 'N';
        else quad += 'S';
        if (l < screenwidth / 2) quad += 'W';
        else quad += 'E';
        vaultPosArray.push({
          top: t,
          bottom: b,
          left: l,
          right: r,
          quad: quad,
        });
        // console.log(checkPosArray)
      });
    }
  };
  mindVaultIconsGap = (top, left, dotsize) => {
    var newscreenheight = (screenheight * 93) / 100;
    var quad = '';
    var CroppedQuad = [];
    if (top < newscreenheight / 2) quad += 'N';
    else quad += 'S';
    if (left < screenwidth / 2) quad += 'W';
    else quad += 'E';
    // console.log('quad:'+quad)
    vaultPosArray.filter(item => {
      const quadData = item;
      // console.log(quadData)
      if (!(quadData.quad.indexOf(quad) > -1)) {
        // console.log('no item')
      } else {
        // console.log('item found')
        CroppedQuad.push(item);
        // console.log(CroppedQuad)
        // console.log('croppedquad length:'+CroppedQuad.length)
      }
    });
    // var gaps = document.querySelectorAll(".dot-ui-gap, .quad-" + quad);
    var gaps = CroppedQuad;
    // if(this.state.quad.indexOf(quad)!== -1){
    // console.log('exist')
    //    console.log(this.state.quad.values(quad))
    // }
    // else{
    // console.log('not exist')
    // }
    // console.log(gaps)
    for (var i = 0; i < gaps.length; i++) {
      // console.log('inside if')
      // console.log("tld:"+top,left,dotsize)
      var gap = gaps[i];
      // console.log(gap)
      var gaptop = gap.top;
      var gapleft = gap.left;
      var gapbottom = gap.bottom;
      var gapw = gapbottom - gaptop;
      // console.log(gaptop,gapleft,gapbottom,gapw)
      console.log(
        top +
          ' ' +
          left +
          ' ' +
          dotsize +
          ' ' +
          gaptop +
          ' ' +
          gapleft +
          ' ' +
          gapw,
      );
      if (
        left < gapleft + gapw &&
        left + dotsize > gapleft &&
        top < gaptop + gapw &&
        dotsize + top > gaptop
      ) {
        console.log('Collision detected');
        return true;
      }
    }
    return false;
  };
  mindthegaps(top, left, dotsize) {
    //var gaps = document.getElementsByClassName('dot-ui-gap');
    var newscreenheight = (screenheight * 90) / 100;
    var quad = '';
    var CroppedQuad = [];
    if (top < newscreenheight / 2) quad += 'N';
    else quad += 'S';
    if (left < screenwidth / 2) quad += 'W';
    else quad += 'E';
    // console.log('quad:'+quad)
    checkPosArray.filter(item => {
      const quadData = item;
      // console.log(quadData)
      if (!(quadData.quad.indexOf(quad) > -1)) {
        // console.log('no item')
      } else {
        // console.log('item found:',item)
        CroppedQuad.push(item);
        // console.log(CroppedQuad)
        // console.log('croppedquad length:'+CroppedQuad.length)
        // console.log("arr:",CroppedQuad)
      }
    });
    // var gaps = document.querySelectorAll(".dot-ui-gap, .quad-" + quad);
    var gaps = CroppedQuad;
    // if(this.state.quad.indexOf(quad)!== -1){
    // console.log('exist')
    //    console.log(this.state.quad.values(quad))
    // }
    // else{
    // console.log('not exist')
    // }
    console.log(gaps);
    for (var i = 0; i < gaps.length; i++) {
      // console.log('inside if')
      // console.log("tld:"+top,left,dotsize)
      var gap = gaps[i];
      // console.log(gap)
      var gaptop = gap.top;
      var gapleft = gap.left;
      var gapbottom = gap.bottom;
      var gapw = gap.bottom - gap.top;
      // console.log(gaptop,gapleft,gapbottom,gapw)
      console.log(
        top +
          ' ' +
          left +
          ' ' +
          dotsize +
          ' ' +
          gaptop +
          ' ' +
          gapleft +
          ' ' +
          gapw,
      );
      if (
        left < gapleft + gapw &&
        left + dotsize > gapleft &&
        top < gaptop + gapw &&
        dotsize + top > gaptop
      ) {
        console.log('Collision detected');
        return true;
      }
    }
    return false;
  }
  isCompleteURL(input) {
    try {
      new URL(input);
      return true;
    } catch (error) {
      return false;
    }
  }
  isValidHostname(hostname) {
    // You can use your own logic to validate the hostname
    // This can involve checking for valid characters, domain extensions, etc.
    // For simplicity, let's assume any non-empty string is valid here.
    return hostname.trim() !== '';
  }
  AddCredsModalVisibility = () => {
    let x = this.state.addCredsModal;
    this.setState({addCredsModal: !x});
    let data = this.state.addSiteFields;
    console.log(data);
    if (data[0].value == '' || data[1].value == '' || data[2].value == '') {
      this.setState({
        flashopacity: true,
        flashMessage: `Please fill all the mendatory fields.`,
        flashColor: 'lightgray',
        flashPosition: '50%',
        textcolor: '#D21F3C',
      });
      setTimeout(() => {
        this.setState({flashopacity: false});
      }, 3500);
      this.state.addSiteFields[0].value = '';
      this.state.addSiteFields[1].value = '';
      this.state.addSiteFields[2].value = '';
      this.state.addSiteFields[3].value = '';
      this.state.addSiteFields[4].value = '';
      this.forceUpdate();
    } else {
      if (this.isCompleteURL(data[0].value)) {
        console.log('User entered a complete URL');
        this.addnewcredentialtovault(data);
      } else if (this.isValidHostname(data[0].value)) {
        console.log('User entered a hostname');
        data[0].value = `https://${data[0].value}`;
        this.addnewcredentialtovault(data);
      } else {
        console.log('Invalid input');
        this.setState({
          flashopacity: true,
          flashMessage: `Invalid website url.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      }
    }
  };
  encryptdatawithstretchedkey = (data, key, saltval, iter) => {
    if (saltval.length == 0) saltval = this.getrandomsalt(6);
    if (iter == 0) iter = 10000;
    console.log('salt:' + saltval + ' iter:' + iter);
    var derivedKey;
    derivedKey = sjcl.misc.pbkdf2(key, saltval, iter, 256);
    var passwordSalt = sjcl.codec.hex.toBits(saltval);
    //var hexKey = sjcl.codec.hex.fromBits( derivedKey );
    //	return sjcl.encrypt(derivedKey, document.forms[type].data.value, {ks: 256, salt: sjcl.codec.hex.fromBits(passwordSalt), iter: document.forms[type].itns.value});   // removed the third param , {mode : "ccm || gcm || ocb2"} CCM is default
    return encrypt(key, data, {
      ks: 256,
      salt: sjcl.codec.hex.fromBits(passwordSalt),
      iter: iter,
    });
  };
  addnewcredentialtovault = fielddescs => {
    var newcredstr = '{';
    for (var i = 0; i < fielddescs.length; i++) {
      var fldval = fielddescs[i].value;
      if (fldval != null && fldval.length > 0) {
        newcredstr += '"' + fielddescs[i].name + '": "' + fldval + '"';
        newcredstr += ',';
      }
    }
    newcredstr += '}';
    newcredstr = newcredstr.replace(',}', '}');
    console.log('data to update');
    console.log(parseddata);
    var updateddata = [];
    if (parseddata != null) {
      updateddata = parseddata;
    }
    console.log('newcreds:' + newcredstr);
    updateddata.push(JSON.parse(newcredstr));
    var encupdateddata = this.encryptdatawithstretchedkey(
      JSON.stringify(updateddata),
      vaultkey,
      rndsalt,
      rnditer,
    );
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', 'https://newauth.io/secure/adduserdata');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('original data updated ' + JSON.stringify(updateddata));
        this.state.addSiteFields[0].value = '';
        this.state.addSiteFields[1].value = '';
        this.state.addSiteFields[2].value = '';
        this.state.addSiteFields[3].value = '';
        this.state.addSiteFields[4].value = '';
        this.setState({showicons: false});
        // $('#vaultaddinputholder').fadeOut(500);
        // removediv(document.getElementById('vaultaddinputholder'));
        // var dotstoremove = document.getElementsByClassName('dot-vault');
        // if (dotstoremove != null && dotstoremove.length > 0) {
        //     for (var d=0; d<dotstoremove.length; d++) {
        //         removediv(dotstoremove[d]);
        //     }
        // }
        // let data = updateddata;
        updateddata = updateddata.reduce((r, o) => {
          var url = '';
          if (this.isCompleteURL(o.siteUrl)) {
            url = new URL(o.siteUrl);
          } else {
            url = new URL(`https://${o.siteUrl}`);
          }
          const hostname = url.hostname.split('.').slice(-2).join('.');
          (r[hostname.toLowerCase()] = r[hostname.toLowerCase()] || []).push(o);
          return r;
        }, {});
        let data = Object.keys(updateddata).map(key => [key, updateddata[key]]);
        console.log(data);
        this.setState({filteredData: data});
        this.displayvaultdataasdots(data);
      } else if (xhr.readyState == 4 && xhr.status == 500) {
        this.setState({
          flashopacity: true,
          flashMessage: `Could not update data. Please try again later.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
        this.state.addSiteFields[0].value = '';
        this.state.addSiteFields[1].value = '';
        this.state.addSiteFields[2].value = '';
        this.state.addSiteFields[3].value = '';
        this.state.addSiteFields[4].value = '';
        this.forceUpdate();
      }
    };
    xhr.send(
      JSON.stringify({
        group: 'sites',
        salt: rndsalt,
        iterations: rnditer,
        data: encupdateddata,
        sequence: rndseq,
        createdate: rndcrdate,
      }),
    );
    console.log(
      JSON.stringify({
        group: 'sites',
        salt: rndsalt,
        iterations: rnditer,
        data: encupdateddata,
        sequence: rndseq,
        createdate: rndcrdate,
      }),
    );
  };
  getrandomsalt = numWords => {
    // generator is already seeded during createuser page load
    var randomBase64String = '';
    global.btoa = require('base-64').encode;
    while (randomBase64String.length < numWords) {
      var randomInt = parseInt(Math.random(1, 10) * 10); //sjcl.random.randomWords(1, 10)[0];
      randomBase64String += global.btoa(randomInt);
    }
    randomBase64String = randomBase64String.substring(0, numWords);
    return randomBase64String;
  };
  getInviteSenderNum = (num, keyCode, keyInput) => {
    this.setState({showLoader: 'flex'});
    var number;
    if (num == null || num == '') {
      //  alert("please enter value")
    } else {
      if (keyInput.length == 4) {
        this.setState({verificationProcessText: 'Verifying code'});
      }
      var xhr = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.onreadystatechange = () => {
        console.log('otp resp:', xhr.readyState, xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
          var jsonres = JSON.parse(xhr.responseText);
          console.log(jsonres);
          if (keyInput == '') {
            if (jsonres.status.desc == 'Invalid phone') {
              alert('please enter valid phone number');
            } else {
              this.setState({
                homepage: 'flex',
                showLoader: 'none',
                showOtpInput: 'flex',
                isPhoneModalVisible: false,
                displayResend: 'none',
              });
              this.setState({
                verificationProcessText:
                  'Automatic phone verification in progress...',
              });
              if (Platform.OS === 'ios') {
                let countDownDate = 10;
                if (this.state.verifyKeyInput == '') {
                  var intervalID = setInterval(() => {
                    this.setState({displayOtpCounter: 'flex'});
                    countDownDate--;
                    this.setState({otpVerificationCounter: countDownDate});
                    if (countDownDate == 0) {
                      this.setState({otpVerificationCounter: 0});
                      clearInterval(intervalID);
                      console.log('enter manually');
                      let x = `Automatic verification failed. Please enter the code you received in SMS.${'\n'}${'\n'}`;
                      if (this.state.verifyKeyInput.length == 4) {
                        this.setState({
                          verificationProcessText: 'Verifying code',
                        });
                      } else {
                        this.setState({verificationProcessText: x});
                      }
                      this.setState({displayOtpCounter: 'none'});
                      countDownDate = 10;
                    }
                  }, 1000);
                }
              } else {
                let countDownDate = 15;
                if (this.state.verifyKeyInput == '') {
                  var intervalID = setInterval(() => {
                    this.setState({displayOtpCounter: 'flex'});
                    // var countDownDate = new Date("Jul 25, 2021 16:37:52").getTime();
                    countDownDate--;
                    this.setState({otpVerificationCounter: countDownDate});
                    if (countDownDate == 0) {
                      this.setState({otpVerificationCounter: 0});
                      clearInterval(intervalID);
                      console.log('enter manually');
                      let x = `Automatic verification failed. Please enter the code you received in SMS.${'\n'}${'\n'}`;
                      if (this.state.verifyKeyInput.length == 4) {
                        this.setState({
                          verificationProcessText: 'Verifying code',
                        });
                      } else {
                        this.setState({verificationProcessText: x});
                      }
                      this.setState({displayOtpCounter: 'none'});
                      countDownDate = 15;
                    }
                  }, 1000);
                }
                RNOtpVerify.getHash().then(console.log).catch(console.log);
                let msg = '7968 is your code. sXcwDjHmKLr';
                RNOtpVerify.getOtp()
                  .then(p => RNOtpVerify.addListener(otpHandler))
                  .catch(p => console.log(p));
                const otpHandler = message => {
                  console.log('msg:', message);
                  if (message == 'Timeout Error.') {
                    console.log('msgg:', message);
                    // alert('Timeout. Try again')
                    // this.setState({showOtpInput:'none',isPhoneModalVisible:false})
                  } else {
                    const otp = /(.{4})/g.exec(message)[1];
                    console.log('otp sms:', otp);
                    this.setState({verifyKeyInput: otp});
                    this.setState({displayOtpCounter: 'none'});
                    this.getInviteSenderNum(
                      this.state.verifyNumber,
                      this.state.verifyKeyCode,
                      this.state.verifyKeyInput,
                    );
                    RNOtpVerify.removeListener();
                  }
                  console.log('ottp:', this.state.verifyKeyInput);
                };
              }
            }
          } else {
            if (jsonres.status.desc == 'VERIFIED') {
              // this.setState({verifyKeyInput:keyInput})
              AsyncStorage.setItem('verifiedphone', this.state.verifyNumber);
              AsyncStorage.setItem('disableuserbox', 'none');
              this.setState({updateUIState: false, displayUserBox: 'none'});
              // this.setState({showProgressBar:'flex'})
              this.setState({
                homepage: 'none',
                showLoader: 'flex',
                showOtpInput: 'flex',
              });
              this.getSession(this.state.verifyNumber);
              setTimeout(() => {
                this.setState({showLoader: 'none', showOtpInput: 'flex'});
                this.setState({
                  flashopacity: true,
                  flashMessage: `Phone verification successful.`,
                  flashColor: 'lightgray',
                  flashPosition: '50%',
                  textcolor: 'green',
                });
                setTimeout(() => {
                  this.setState({flashopacity: false});
                }, 1500);
                setTimeout(() => {
                  this.setState({
                    homepage: 'flex',
                    showOtpInput: 'none',
                    showLoader: 'none',
                    verifyKeyInput: '',
                  });
                  if (this.state.filteredContactData.length > 0) {
                    this.setState({notificationDialogModal: true});
                  }
                }, 2000);
                confusername = this.state.verifyNumber;
                loggedInuserType = 'phone';
                this.setState({updateUIState: false});
                this.getUserInviteConnections();
                // alert('number has been verified successfully.')
              }, 5000);
              // alert('number has been verified successfully.')
            } else if (jsonres.status.desc == 'INCORRECT CODE') {
              this.setState({
                flashopacity: true,
                flashMessage: `Please enter correct OTP.`,
                flashColor: 'lightgray',
                flashPosition: '50%',
                textcolor: '#D21F3C',
                showLoader: 'none',
              });
              setTimeout(() => {
                this.setState({flashopacity: false});
              }, 3500);
            }
          }
          // if (jsonres.status.desc == "VERIFIED") {
          //     alert("your number has been verified.")
          //     AsyncStorage.setItem('verifiedphone', this.state.verifyCode);
          // }
          // console.log(jsonres);
          // console.log(jsonres.verificationKeyCode);
          this.setState({verifyKeyCode: jsonres.verificationKeyCode});
        } else if (
          xhr.readyState == 4 &&
          (xhr.status == 500 ||
            xhr.status == 400 ||
            xhr.status == 404 ||
            xhr.status == 0)
        ) {
          this.setState({
            verificationProcessText: 'Automatic phone verification failed.',
          });
          if (this.state.showLoader == 'flex') {
            this.setState({
              flashopacity: true,
              flashMessage: `Server error. Please try again.`,
              flashColor: 'lightgray',
              flashPosition: '50%',
              textcolor: '#D21F3C',
              displayResend: 'flex',
              showLoader: 'none',
            });
            setTimeout(() => {
              this.setState({flashopacity: false});
            }, 3500);
          }
        }
      };
      xhr.open(
        'POST',
        'https://newauth.io//newauth/api/verifysmsverificationcode',
      );
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/json');
      var reqpacket = JSON.stringify({
        phone: num,
        verificationKeyCode: keyCode,
        verificationKeyInput: keyInput,
        status: {},
      });
      console.log('otp pckt:', reqpacket);
      xhr.send(reqpacket);
      // console.log('count calling:' + this.state.countCalling)
    }
  };
  toggleModalVisibility = () => {
    this.setState({invalidKeyText: 'none'});
    let key = this.state.vaultvalue;
    console.log('key:' + key, this.state.username);
    if (key == null) {
      this.setState({isModalVisible: true});
    } else if (key != null) {
      // this.setState({ isModalVisible: false })
      this.setState({invalidKeyText: 'none'});
      vaultkey = key;
      this.setState({
        flashopacity: true,
        flashMessage: `Please wait, loading vault...`,
        flashColor: 'lightgray',
        flashPosition: '50%',
        textcolor: 'black',
      });
      setTimeout(() => {
        this.setState({flashopacity: false});
      }, 3500);
      this.loadvaultinflakepage(key);
      this.state.vaultvalue = null;
      this.setState({usrSrch: require('./search.png')});
    }
  };
  togglePhoneModalVisibility = () => {
    // let x = this.state.isPhoneModalVisible;
    // this.setState({ isPhoneModalVisible: !x })
    // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // let enteredNum=this.state.verifyNumber;
    AsyncStorage.getItem('flakeondevice').then(asyn => {
      if (asyn != null) {
        AsyncStorage.setItem('userphonenumber', this.state.verifyNumber);
        this.setState({isPhoneModalVisible: false});
      } else {
        this.getInviteSenderNum(this.state.verifyNumber, '', '');
        this.setState({
          isPhoneModalVisible: false,
          homepage: 'none',
          showLoader: 'flex',
          showOtpInput: 'flex',
        });
      }
    });
  };
  generateRandomFlake = () => {
    var randomFlake;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      console.log('rndm flk status:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        randomFlake = xhr.responseText;
        AsyncStorage.setItem('randomflakeondevice', randomFlake);
        this.setState({randomFlakeOnDevice: randomFlake});
        console.log('rndm flk:' + randomFlake);
      } else {
        console.log('no flake received');
      }
    };
    xhr.open('GET', 'https://newauth.io/newauth/api/getrandomflake');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(null);
  };
  getFormattedDate(date, prefomattedDate = false, hideYear = false) {
    const day = date.getDate();
    const month = MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      // Adding leading zero to minutes
      minutes = `0${minutes}`;
    }
    if (prefomattedDate) {
      // Today at 10:20
      // Yesterday at 10:20
      return `${prefomattedDate} at ${hours}:${minutes}`;
    }
    if (hideYear) {
      // 10. January at 10:20
      return `${day}. ${month} at ${hours}:${minutes}`;
    }
    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
  }
  // --- Main function
  timeAgo(dateParam) {
    if (!dateParam) {
      return null;
    }
    const date =
      typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();
    if (seconds < 5) {
      return 'now';
    } else if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 90) {
      return 'about a minute ago';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (isToday) {
      return this.getFormattedDate(date, 'Today'); // Today at 10:20
    } else if (isYesterday) {
      return this.getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } else if (isThisYear) {
      return this.getFormattedDate(date, false, true); // 10. January at 10:20
    }
    return this.getFormattedDate(date); // 10. January 2017. at 10:20
  }
  checkBeforeSendInvite = async (num, evt) => {
    // this.setState({contactToInvite:phn,showInvitePopup:true})
    if (this.state.filteredContactData[num].tag == 'conversation') {
      this.setState({preventFurtherClick: true});
    }
    AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
      console.log(
        'flakeondevicee:' + asyncStorageRes,
        num,
        this.state.filteredContactData[num].name,
      );
      if (asyncStorageRes == null) {
        AsyncStorage.getItem('verifiedphone').then(asyncStorage => {
          if (asyncStorage == null) {
            this.setState({
              flashopacity: true,
              flashMessage: `Login to your newauth account.`,
              flashColor: 'lightgray',
              flashPosition: '50%',
              textcolor: '#D21F3C',
            });
            setTimeout(() => {
              this.setState({flashopacity: false});
            }, 3500);
            // alert('either login or verify number first.')
          } else {
            dotColorIndex = num;
            let phn = this.state.filteredContactData[num];
            AsyncStorage.getItem('randomflakeondevice').then(asyncres => {
              this.setState({randomFlakeOnDevice: asyncres});
              this.setState({
                contactToInvite: phn,
                randomFlakeOnDevice: asyncres,
                senderPhone: asyncStorage,
                showInvitePopup: false,
              });
              if (this.state.filteredContactData[num].tag == 'contact') {
                let clrArr = [];
                console.log(this.state.filteredContactData[num]);
                this.state.connectionOnlineLeft = new Animated.Value(
                  Number.parseInt(
                    JSON.stringify(this.state.dotColorLocation[num].ypc),
                  ),
                );
                this.state.connectionOnlineTop = new Animated.Value(
                  Number.parseInt(
                    JSON.stringify(this.state.dotColorLocation[num].zpc),
                  ),
                );
                this.state.connectionOnlineWidth = new Animated.Value(
                  Number.parseInt(
                    JSON.stringify(this.state.dotColorLocation[num].width),
                  ),
                );
                this.state.connectionOnlineHeight = new Animated.Value(
                  Number.parseInt(
                    JSON.stringify(this.state.dotColorLocation[num].height),
                  ),
                );
                try {
                  AsyncStorage.getItem('allContactDotColors').then(
                    asyncStorage => {
                      clrArr = JSON.parse(asyncStorage);
                      // console.log("clrd arr:", clrArr)
                      if (clrArr != null) {
                        if (clrArr.length > 0) {
                          clrArr.forEach(async element => {
                            let elem_num = element.phoneNumber.replace(
                              /[^0-9]/g,
                              '',
                            );
                            let phn_num =
                              this.state.contactToInvite.phoneNumber.replace(
                                /[^0-9]/g,
                                '',
                              );
                            if (elem_num.length <= phn_num.length) {
                              if (phn_num.endsWith(elem_num)) {
                                let timeago = await this.timeAgo(element.date);
                                this.setState({
                                  systemInviteMessage1: 'Invited ' + timeago,
                                  systemInviteMessage2:
                                    'Invite ' +
                                    this.state.contactToInvite.name +
                                    ' again',
                                  alreadyInvited: true,
                                });
                              } else {
                                this.setState({
                                  systemInviteMessage1: `Click this button to invite ${this.state.contactToInvite.name} to join your network.`,
                                  systemInviteMessage2:
                                    'Invite ' + this.state.contactToInvite.name,
                                  alreadyInvited: false,
                                });
                              }
                            } else {
                              if (elem_num.endsWith(phn_num)) {
                                let timeago = await this.timeAgo(element.date);
                                this.setState({
                                  systemInviteMessage1: 'Invited ' + timeago,
                                  systemInviteMessage2:
                                    'Invite ' +
                                    this.state.contactToInvite.name +
                                    ' again',
                                  alreadyInvited: true,
                                });
                              } else {
                                this.setState({
                                  systemInviteMessage1: `Click this button to invite ${this.state.contactToInvite.name} to join your network.`,
                                  systemInviteMessage2:
                                    'Invite ' + this.state.contactToInvite.name,
                                  alreadyInvited: false,
                                });
                              }
                            }
                          });
                        } else {
                          this.setState({
                            systemInviteMessage1: `Click this button to invite ${this.state.contactToInvite.name} to join your network.`,
                            systemInviteMessage2:
                              'Invite ' + this.state.contactToInvite.name,
                            alreadyInvited: false,
                          });
                          console.log('no colored dots in array');
                        }
                      } else {
                        this.setState({
                          systemInviteMessage1: `Click this button to invite ${this.state.contactToInvite.name} to join your network.`,
                          systemInviteMessage2:
                            'Invite ' + this.state.contactToInvite.name,
                          alreadyInvited: false,
                        });
                      }
                    },
                  );
                } catch (error) {
                  console.log('Error retrieving dotcolors');
                }
                this.setState({showInvitePopup: true});
              } else if (
                this.state.filteredContactData[num].tag == 'invitation'
              ) {
                this.acceptDenyInvite(num);
                // this.setState({acptDenyAlrt:true})
              } else if (
                this.state.filteredContactData[num].tag == 'conversation'
              ) {
                this.startPeerChat(num);
              }
            });
          }
        });
      } else {
        dotColorIndex = num;
        let phn = this.state.filteredContactData[num];
        this.setState({
          contactToInvite: phn,
          randomFlakeOnDevice: asyncStorageRes,
          senderPhone: ' ',
          showInvitePopup: false,
        });
        if (this.state.filteredContactData[num].tag == 'contact') {
          let clrArr = [];
          console.log(this.state.filteredContactData[num]);
          this.state.connectionOnlineLeft = new Animated.Value(
            Number.parseInt(
              JSON.stringify(this.state.dotColorLocation[num].ypc),
            ),
          );
          this.state.connectionOnlineTop = new Animated.Value(
            Number.parseInt(
              JSON.stringify(this.state.dotColorLocation[num].zpc),
            ),
          );
          this.state.connectionOnlineWidth = new Animated.Value(
            Number.parseInt(
              JSON.stringify(this.state.dotColorLocation[num].width),
            ),
          );
          this.state.connectionOnlineHeight = new Animated.Value(
            Number.parseInt(
              JSON.stringify(this.state.dotColorLocation[num].height),
            ),
          );
          try {
            AsyncStorage.getItem('allContactDotColors').then(asyncStorage => {
              clrArr = JSON.parse(asyncStorage);
              // console.log("clrd arr:", clrArr)
              if (clrArr != null) {
                if (clrArr.length > 0) {
                  clrArr.forEach(async element => {
                    let elem_num = element.phoneNumber.replace(/[^0-9]/g, '');
                    let phn_num =
                      this.state.contactToInvite.phoneNumber.replace(
                        /[^0-9]/g,
                        '',
                      );
                    if (elem_num.length <= phn_num.length) {
                      if (phn_num.endsWith(elem_num)) {
                        let timeago = await this.timeAgo(element.date);
                        this.setState({
                          systemInviteMessage1: 'Invited ' + timeago,
                          systemInviteMessage2:
                            'Invite ' +
                            this.state.contactToInvite.name +
                            ' again',
                          alreadyInvited: true,
                        });
                      } else {
                        this.setState({
                          systemInviteMessage1: `Click this button to invite ${this.state.contactToInvite.name} to join your network.`,
                          systemInviteMessage2:
                            'Invite ' + this.state.contactToInvite.name,
                          alreadyInvited: false,
                        });
                      }
                    } else {
                      if (elem_num.endsWith(phn_num)) {
                        let timeago = await this.timeAgo(element.date);
                        this.setState({
                          systemInviteMessage1: 'Invited ' + timeago,
                          systemInviteMessage2:
                            'Invite ' +
                            this.state.contactToInvite.name +
                            ' again',
                          alreadyInvited: true,
                        });
                      } else {
                        this.setState({
                          systemInviteMessage1: `Click this button to invite ${this.state.contactToInvite.name} to join your network.`,
                          systemInviteMessage2:
                            'Invite ' + this.state.contactToInvite.name,
                          alreadyInvited: false,
                        });
                      }
                    }
                  });
                } else {
                  this.setState({
                    systemInviteMessage1: `Click this button to invite ${this.state.contactToInvite.name} to join your network.`,
                    systemInviteMessage2:
                      'Invite ' + this.state.contactToInvite.name,
                    alreadyInvited: false,
                  });
                  console.log('no colored dots in array');
                }
              } else {
                this.setState({
                  systemInviteMessage1: `Click this button to invite ${this.state.contactToInvite.name} to join your network.`,
                  systemInviteMessage2:
                    'Invite ' + this.state.contactToInvite.name,
                  alreadyInvited: false,
                });
              }
            });
          } catch (error) {
            console.log('Error retrieving dotcolors');
          }
          this.setState({showInvitePopup: true});
        } else if (this.state.filteredContactData[num].tag == 'invitation') {
          this.acceptDenyInvite(num);
          // this.setState({acptDenyAlrt:true})
        } else if (this.state.filteredContactData[num].tag == 'conversation') {
          this.startPeerChat(num);
        }
      }
    });
  };
  async sendInvite(rcvnum, flake, sndnum, evt) {
    // this.setState({ showInvitePopup: false })
    this.state.filteredContactData[dotColorIndex].color =
      dotColors[dotColorIndex];
    console.log(
      this.state.filteredContactData[dotColorIndex].color,
      dotColors[dotColorIndex],
    );
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    this.setState({verifiedNum: flake});
    var inviteFriend = `Hey there! I found a new app to chat, store notes and keep my files safe.${'\n'}${'\n'}Here, we can chat directly without a server listening in.${'\n'}${'\n'}Download newauth and join me here!`;
    SendSMS.send(
      {
        // Message body
        body: inviteFriend, // userGraph["@value"][2]['@value'].properties["message"]['@value']+userGraph["@value"][2]['@value'].id["@value"],
        // Recipients Number
        recipients: [this.state.contactToInvite.phoneNumber],
        // An array of types
        // "completed" response when using android
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        if (completed) {
          console.log('SMS Sent Completed');
          console.log(reqpacket);
          xhr.open(
            'POST',
            'https://newauth.io/newauth/api/invite/externalbyphoneemail',
          );
          xhr.withCredentials = true;
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(reqpacket);
        } else if (cancelled) {
          console.log('SMS Sent Cancelled');
          // console.log(reqpacket)
          xhr.open(
            'POST',
            'https://newauth.io/newauth/api/invite/externalbyphoneemail',
          );
          xhr.withCredentials = true;
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(reqpacket);
        } else if (error) {
          console.log('Some error occured');
        }
      },
    );
    xhr.onreadystatechange = () => {
      console.log('send invite', xhr.readyState, xhr.status);
      this.setState({
        systemInviteMessage1: 'Inviting ' + this.state.contactToInvite.name,
      });
      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 208)) {
        let timeago = '';
        try {
          let x = [];
          let obj = {
            phoneNumber:
              this.state.filteredContactData[dotColorIndex].phoneNumber,
            color: this.state.filteredContactData[dotColorIndex].color,
            date: new Date(),
          };
          timeago = this.timeAgo(obj.date);
          // this.state.filteredContactData[dotColorIndex].tag = "invited";
          AsyncStorage.getItem('allContactDotColors').then(asyncStorage => {
            console.log('arrclrs:' + asyncStorage);
            if (asyncStorage != null) {
              let x = JSON.parse(asyncStorage).concat(obj);
              // We have data!!
              AsyncStorage.setItem('allContactDotColors', JSON.stringify(x));
              //   console.log(JSON.parse(myArray));
            } else {
              console.log('inside set');
              x = x.concat(obj);
              AsyncStorage.setItem(
                'allContactDotColors',
                JSON.stringify(x),
              ).then(asy => {
                console.log(asy);
              });
            }
          });
        } catch (error) {
          console.log('Error retrieving data');
          // alert(error)
        }
        this.setState({
          systemInviteMessage1:
            'You have invited ' +
            this.state.contactToInvite.name +
            ' ' +
            timeago,
          systemInviteMessage2:
            'Invite ' + this.state.contactToInvite.name + ' again',
          alreadyInvited: true,
        });
        var userGraph;
        var jsonres = xhr.responseText;
        if (!global.atob) {
          global.atob = require('base-64').decode;
          userGraph = global.atob(jsonres);
        }
      } else if (xhr.readyState == 4 && xhr.status == 500) {
        this.setState({
          systemInviteMessage1:
            'Ooops...something went wrong. Please try again.',
        });
        // alert("something went wrong! try again.")
      } else if (xhr.readyState == 4 && xhr.status == 400) {
        this.setState({
          systemInviteMessage1:
            'Ooops...something went wrong. Please try again.',
        });
      } else {
        this.setState({
          systemInviteMessage1: 'Inviting ' + this.state.contactToInvite.name,
        });
      }
    };
    var reqpacket = JSON.stringify({
      sender: {
        flake: flake,
        phones: {
          number: sndnum,
        },
      },
      receiver: {
        phones: {
          number: rcvnum, //this.state.contactsArray[num].phoneNumber
        },
      },
      message: 'Invited',
    });
    console.log('send invite:', reqpacket);
    // xhr.open('POST', 'https://newauth.io/newauth/api/invite/externalbyphoneemail');
    // xhr.withCredentials = true;
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(reqpacket);
  }
  loadvaultinflakepage = key => {
    if (originaldata != null && originaldata.length > 0) {
      console.log('data inside');
      console.log(originaldata);
      let x = this.state.isModalVisible;
      this.setState({isModalVisible: !x});
      this.setState({usersitedata: originaldata, filteredData: originaldata});
      this.displayvaultdataasdots(originaldata);
    } else {
      let xhr = new XMLHttpRequest();
      let url = BASE_URL + '/secure/getuserdata';
      xhr.open('POST', url); // needs to be synchronous false means synchronous
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        console.log(
          'getuserdatafromdb returned status ' +
            xhr.status +
            ' ' +
            xhr.readyState,
        );
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log(
            'vault data:',
            xhr.responseText,
            typeof xhr.responseText,
            xhr.responseText.length,
          );
          if (xhr.responseText != null && xhr.responseText.length > 0) {
            //alert('data in user vault for seq ' + sequence + ' ' + xhr.responseText);
            var udobj = JSON.parse(xhr.responseText);
            console.log('uobj:', udobj);
            // originaldata = 'ERROR';
            try {
              //alert('vaultkey ' + vaultkey);
              console.log('original data');
              parseddata = JSON.parse(decrypt(key, udobj.data));
              console.log(parseddata);
              originaldata = parseddata.reduce((r, o) => {
                var url = '';
                if (this.isCompleteURL(o.siteUrl)) {
                  url = new URL(o.siteUrl);
                } else {
                  url = new URL(`https://${o.siteUrl}`);
                }
                const hostname = url.hostname.split('.').slice(-2).join('.');
                (r[hostname.toLowerCase()] =
                  r[hostname.toLowerCase()] || []).push(o);
                return r;
              }, {});
              originaldata = Object.keys(originaldata).map(key => [
                key,
                originaldata[key],
              ]);
              console.log(originaldata);
              if (originaldata[0][0] != 'undefined') {
                let x = this.state.isModalVisible;
                this.setState({isModalVisible: false});
                setTimeout(() => {
                  // this.setState({displayFlake:true,showView:false})
                }, 100);
                this.setState({
                  usersitedata: originaldata,
                  filteredData: originaldata,
                });
                this.displayvaultdataasdots(originaldata);
              } else {
              }
            } catch (e) {
              console.log("can't decrypt data");
              this.setState({isModalVisible: true});
              this.setState({invalidKeyText: 'flex'});
              this.setState({
                invalidKeyTextData: 'Invalid Vault key. Please try again',
              });
              //alert('Could not decrypt payload based on vault key. Error > ' + e);
              //throw e;
              // if (document.getElementById('newauth-notification') != null) {
              //     document.getElementById('newauth-notification').innerHTML = '';
              //     document.getElementById('newauth-notification').innerHTML = 'Invalid Vault key. Please try again';
              // }
              // setTimeout( function(){
              //     createVaultKeyInputOnForeGroundDiv(udobj.data);
              // }, 1500);
            }
            rndsalt = udobj.salt;
            rnditer = udobj.iterations;
            rndseq = udobj.sequence;
            rndcrdate = udobj.createdate;
            //alert('decrypted content recd from db: ' + JSON.parse(originaldata));
            //alert('about to return originaldata ' + originaldata);
          } else if (xhr.responseText.length == 0) {
            this.setState({invalidKeyTextData: 'Your vault is empty.'});
            this.setState({invalidKeyText: 'flex'});
            setTimeout(() => {
              this.setState({isModalVisible: false});
            }, 1000);
            // this.setState({ isModalVisible: true })
            // alert('no data in sequence 0 .. will generate fresh keys');
            // alert('ERROR');
          }
        } else if (xhr.readyState == 4 && xhr.status == 500) {
          this.setState({
            flashopacity: true,
            flashMessage: `Server error. Please try again later.`,
            flashColor: 'lightgray',
            flashPosition: '50%',
            textcolor: '#D21F3C',
          });
          setTimeout(() => {
            this.setState({flashopacity: false});
          }, 3500);
        }
      };
      //		console.log('fetching credentials');
      xhr.send(
        JSON.stringify({
          sequence: 1,
        }),
      );
    }
  };
  displayvaultdataasdots = async data => {
    console.log(data);
    this.setState({
      flakepageheader: this.state.userGiveOut,
      vaulticon: 'flex',
      vaultcenter: 'none',
    });
    //   console.log(data);
    //alert(data);
    var filter = 'facebook';
    var vltdata = [];
    vltdata = data;
    var creds = [];
    var filter = 'facebook';
    //var vaultkey = "bottom-right"
    //vltdata = JSON.parse(decrypt(vaultkey, vlt[0].data))
    //console.log(vltdata)
    //console.log(vltdata.length)
    for (var i = 0; i < vltdata.length; i++) {
      var existing = creds.find(o => o.name === vltdata[i].siteUrl);
      if (existing != null) {
        existing.description.push(vltdata[i].siteuser);
      } else {
        var pst = {
          name: vltdata[i].siteUrl,
          description: [vltdata[i].siteuser],
          text: vltdata[i].siteuser,
          relevance: this.getRandomIntInclusive(0, 10),
        };
        // if (filter != null && filter.length > 0) {
        //     //console.log(filter + ' ' + vltdata[i].siteUrl + ' ' + vltdata[i].siteuser + ' ' + vltdata[i].sitepwd + ' ' + vltdata[i].siteUrl.toLowerCase().indexOf(filter.toLowerCase()));
        //     if (vltdata[i].siteUrl.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        //         || vltdata[i].siteuser.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        //         || vltdata[i].sitepwd.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        //     ) {
        //         creds.push(pst);
        //         console.log(vltdata[i].siteUrl + ' added');
        //         continue;
        //     } else {
        //         continue;
        //     }
        // }
        if (pst.name != undefined) {
          creds.push(pst);
        }
      }
    }
    console.log('creds');
    console.log(creds);
    // this.renderdataasdots(creds);
    let centerdotsize = (screenwidth * 30) / 100; //150;
    // Minimum radius
    let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
    vaultPosArray = await this.displayRadialText(
      data,
      'vault',
      centerdotsize,
      true,
      'large',
    );
    this.setState({showicons: true});
    this.forceUpdate();
  };
  renderContactsAsDots = calldata => {
    var indata = [];
    for (let i = 0; i < calldata.length; i++) {
      var data = {
        name: calldata[i].name,
        phoneNumber: calldata[i].phoneNumber,
        relevance: this.getRandomIntInclusive(0, 10),
      };
      indata.push(data);
    }
    console.log(indata);
    var suggesteddotsize = Math.sqrt(
      parseInt(screenwidth * ((screenheight * 90) / 100)) / Math.max(20, 5),
    );
    var startsize = parseInt(suggesteddotsize) / 9; //parseInt(suggesteddotsize)/9;
    var maxdotsize = parseInt(suggesteddotsize) / 4; // parseInt(suggesteddotsize)/3;
    var wh = parseInt(Math.min(2 * startsize, maxdotsize));
    if (indata == null || indata.length == 0) return;
    function relevance(item) {
      if (
        typeof item.relevance === 'undefined' ||
        item.relevance == null ||
        item.relevance == ''
      )
        item.relevance = 1;
      return item.relevance;
    }
    function sum(prev, next) {
      return prev + next;
    }
    function percentile(arr, n) {
      var count, percent;
      count = 0;
      for (var j = 0; j < arr.length; j++) {
        if (arr[n] > arr[j]) {
          count++;
        }
      }
      percent = (count * 100) / (arr.length - 1);
      return parseInt(percent);
    }
    var totalrelevance = indata.map(relevance).reduce(sum);
    // console.log("totalrelevance:" + totalrelevance)
    // console.log('[data-name="' + indata[0].name + '"]')
    for (var i = 0; i < indata.length; i++) {
      // console.log('i=' + i)
      var maxshifts = 0;
      var ww = Math.min(2 * startsize, maxdotsize);
      this.state.dotwidth[i] = new Animated.Value(ww);
      var perc = percentile(indata.map(relevance), i);
      // console.log(indata.map(relevance), i)
      // console.log("perc:" + perc)
      if (perc >= 80) {
        this.state.dotwidth[i] = new Animated.Value(maxdotsize);
      }
      if (perc <= 50) {
        this.state.dotwidth[i] = new Animated.Value(startsize);
      }
      // console.log('value:' + i + ' ' + indata[i].relevance + ' ' + perc);
      //     //dot.classList.add('pulsate');
      //     //dot.style.opacity = '0.1';
      //     //dot.style.transform = "scale(1.2)";
      //     //attachtransitionstyles(dot, 1);
      var digest_sha256;
      var randtop;
      var randleft;
      var bitArray;
      if (indata[i].name.length + indata[i].phoneNumber.length > 1000) {
        bitArray = sjcl.hash.sha256.hash(
          (indata[i].name + indata[i].phoneNumber).substring(0, 1000),
        );
        //console.log(indata[i].name  + ' length more than 1000');
      } else {
        bitArray = sjcl.hash.sha256.hash(
          indata[i].name + indata[i].phoneNumber,
        );
        //console.log(indata[i].name   );
      }
      digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
      //     //dot.style.backgroundColor = '#' + digest_sha256.substring(0, 6); //b3b3b3';
      //    // dot.style.boxShadow = "0px 0px 2px " + "#" + digest_sha256.substring(0, 6);
      var hashasnum = '000000000000000000000000000000000000000000000';
      if (digest_sha256 != null)
        hashasnum = parseInt(
          digest_sha256.substring(
            digest_sha256.length - 15,
            digest_sha256.length,
          ),
          16,
        );
      //console.log(indata[i].description + ' ' + digest_sha256 + ' ' + hashasnum);
      // var xpercent = parseFloat(hashasnum.toString().substring(0, 2) + '.' + hashasnum.toString().substring(2, 5));
      // var ypercent = parseFloat(hashasnum.toString().substring(5, 7) + '.' + hashasnum.toString().substring(7, 10));
      var ypercent = Math.random() * 100;
      var xpercent = Math.random() * 100;
      // console.log(xpercent, ypercent, width, height + "xyper")
      randtop = parseInt((((screenheight * 90) / 100) * ypercent) / 100);
      randleft = parseInt((screenwidth * xpercent) / 100);
      var quad = '';
      if (randtop < (screenheight * 90) / 100 / 2) quad += 'N';
      else quad += 'S';
      if (randleft < screenwidth / 2) quad += 'W';
      else quad += 'E';
      this.state.quad[i] = quad;
      // console.log('randtop, randleft, maxdotsize:' + randtop, randleft, maxdotsize)
      while (this.mindthegaps(randtop, randleft, maxdotsize)) {
        if (maxshifts > 5) {
          // alert('Done shifting this dot:' + i + ':' + randtop + ':' + randleft);
          break;
        }
        if (randtop < (screenheight * 90) / 100 / 2 && randtop > 50 + startsize)
          randtop -= startsize;
        else randtop += startsize;
        if (randleft < screenwidth / 2 && randleft > 0) randleft -= startsize;
        else randleft += startsize;
        maxshifts++;
      }
      if (randleft < 10) randleft += 10;
      if (randleft > screenwidth - maxdotsize - 10) randleft -= 3 * maxdotsize;
      if (randtop < 60) randtop += 60;
      if (randtop > (screenheight * 90) / 100 - maxdotsize - 10)
        randtop -= maxdotsize + 10;
      if (i <= 2) console.log('randleft ' + randleft + ' randtop ' + randtop);
      this.state.dotheight[i] = this.state.dotwidth[i];
      let wpercent = parseInt((this.state.dotwidth[i] / screenwidth) * 100);
      let hpercent = parseInt((this.state.dotheight[i] / screenheight) * 100);
      //  console.log('wh:' + this.state.dotwidth, this.state.dotheight)
      this.state.dottop[i] = new Animated.Value(parseInt(randtop));
      this.state.dotleft[i] = new Animated.Value(parseInt(randleft));
      // console.log('tl:' + this.state.dottop, this.state.dotleft)
      let tpercent = parseInt((randtop * 100) / parseInt(screenheight));
      let lpercent = parseInt((randleft * 100) / parseInt(screenwidth));
      // console.log("whtl:" + wpercent, hpercent, tpercent, lpercent)
      checkPosArray.push({
        top: this.state.dottop[i],
        left: this.state.dotleft[i],
        bottom: Animated.add(
          parseInt(this.state.dottop[i], this.state.dotheight[i]),
        ),
        right: Animated.add(
          parseInt(this.state.dotleft[i], this.state.dotwidth[i]),
        ),
        quad: this.state.quad[i],
      });
      // console.log(checkPosArray)
      // console.log('checkPosArray length:' + checkPosArray.length)
    }
    //this.setvaultpagebehaviour();
  };
  renderExtraDots = (calldata, startIndex, lenn, ll) => {
    try {
      var indata = [];
      if (lenn == 1) {
        console.log(this.state.filteredContactData[ll]);
        indata = [this.state.filteredContactData[startIndex]];
      } else {
        for (let i = startIndex; i < startIndex + lenn - 1; i++) {
          var data = {
            name: calldata[i].name,
            phoneNumber: calldata[i].phoneNumber,
            relevance: this.getRandomIntInclusive(0, 10),
          };
          indata.push(data);
        }
      }
      console.log('indata:', indata);
      var suggesteddotsize = Math.sqrt(
        parseInt(screenwidth * ((screenheight * 90) / 100)) / Math.max(20, 5),
      );
      var startsize = parseInt(suggesteddotsize) / 9; //parseInt(suggesteddotsize)/9;
      var maxdotsize = parseInt(suggesteddotsize) / 4; // parseInt(suggesteddotsize)/3;
      var wh = parseInt(Math.min(2 * startsize, maxdotsize));
      if (indata == null || indata.length == 0) return;
      function relevance(item) {
        if (
          typeof item.relevance === 'undefined' ||
          item.relevance == null ||
          item.relevance == ''
        )
          item.relevance = 1;
        return item.relevance;
      }
      function sum(prev, next) {
        return prev + next;
      }
      function percentile(arr, n) {
        var count, percent;
        count = 0;
        for (var j = 0; j < arr.length; j++) {
          if (arr[n] > arr[j]) {
            count++;
          }
        }
        percent = (count * 100) / (arr.length - 1);
        return parseInt(percent);
      }
      var totalrelevance = indata.map(relevance).reduce(sum);
      // console.log("totalrelevance:" + totalrelevance)
      // console.log('[data-name="' + indata[0].name + '"]')
      for (var i = 0; i < indata.length; i++) {
        var maxshifts = 0;
        var ww = Math.min(2 * startsize, maxdotsize);
        this.state.dotwidth[startIndex + i] = new Animated.Value(ww);
        var perc = percentile(indata.map(relevance), i);
        if (perc >= 80) {
          this.state.dotwidth[startIndex + i] = new Animated.Value(maxdotsize);
        }
        if (perc <= 50) {
          this.state.dotwidth[startIndex + i] = new Animated.Value(startsize);
        }
        var digest_sha256;
        var randtop;
        var randleft;
        var bitArray;
        if (indata[i].name.length + indata[i].phoneNumber.length > 1000) {
          bitArray = sjcl.hash.sha256.hash(
            (indata[i].name + indata[i].phoneNumber).substring(0, 1000),
          );
        } else {
          bitArray = sjcl.hash.sha256.hash(
            indata[i].name + indata[i].phoneNumber,
          );
        }
        digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
        var hashasnum = '000000000000000000000000000000000000000000000';
        if (digest_sha256 != null)
          hashasnum = parseInt(
            digest_sha256.substring(
              digest_sha256.length - 15,
              digest_sha256.length,
            ),
            16,
          );
        //console.log(indata[i].description + ' ' + digest_sha256 + ' ' + hashasnum);
        let dotbackgroundColor = '#' + digest_sha256.substring(0, 6); //b3b3b3';
        let dotboxShadow = '0px 0px 2px ' + '#' + digest_sha256.substring(0, 6);
        // console.log('previous contact color:',dotbackgroundColor);
        dotbackgroundColor = this.getpastelcolor(dotbackgroundColor);
        // console.log('new contact color:',dotbackgroundColor);
        let clrs = {
          color: dotbackgroundColor,
          shadow: dotboxShadow,
        };
        dotColors[startIndex + i] = clrs;
        this.state.filteredContactData[startIndex + i].color =
          dotbackgroundColor;
        // var xpercent = parseFloat(hashasnum.toString().substring(0, 2) + '.' + hashasnum.toString().substring(2, 5));
        // var ypercent = parseFloat(hashasnum.toString().substring(5, 7) + '.' + hashasnum.toString().substring(7, 10));
        var ypercent = Math.random() * 100;
        var xpercent = Math.random() * 100;
        // console.log(xpercent, ypercent, width, height + "xyper")
        randtop = parseInt((((screenheight * 90) / 100) * ypercent) / 100);
        randleft = parseInt((screenwidth * xpercent) / 100);
        var quad = '';
        if (randtop < (screenheight * 90) / 100 / 2) quad += 'N';
        else quad += 'S';
        if (randleft < screenwidth / 2) quad += 'W';
        else quad += 'E';
        this.state.quad[startIndex + i] = quad;
        // console.log('randtop, randleft, maxdotsize:' + randtop, randleft, maxdotsize)
        console.log(this.state.quad);
        while (this.mindthegaps(randtop, randleft, maxdotsize)) {
          if (maxshifts > 5) {
            // alert('Done shifting this dot:' + i + ':' + randtop + ':' + randleft);
            break;
          }
          if (
            randtop < (screenheight * 90) / 100 / 2 &&
            randtop > 50 + startsize
          )
            randtop -= startsize;
          else randtop += startsize;
          if (randleft < screenwidth / 2 && randleft > 0) randleft -= startsize;
          else randleft += startsize;
          maxshifts++;
        }
        if (randleft < 10) randleft += 10;
        if (randleft > screenwidth - maxdotsize - 10)
          randleft -= 3 * maxdotsize;
        if (randtop < 60) randtop += 60;
        if (randtop > (screenheight * 90) / 100 - maxdotsize - 10)
          randtop -= maxdotsize + 10;
        if (i <= 2) console.log('randleft ' + randleft + ' randtop ' + randtop);
        this.state.dotheight[startIndex + i] =
          this.state.dotwidth[startIndex + i];
        let wpercent = parseInt(
          (this.state.dotwidth[startIndex + i] / screenwidth) * 100,
        );
        let hpercent = parseInt(
          (this.state.dotheight[startIndex + i] / screenheight) * 100,
        );
        //  console.log('wh:' + this.state.dotwidth, this.state.dotheight)
        this.state.dottop[startIndex + i] = new Animated.Value(
          parseInt(randtop),
        );
        this.state.dotleft[startIndex + i] = new Animated.Value(
          parseInt(randleft),
        );
        // console.log('tl:' + this.state.dottop, this.state.dotleft)
        let tpercent = parseInt((randtop * 100) / parseInt(screenheight));
        let lpercent = parseInt((randleft * 100) / parseInt(screenwidth));
        // console.log("whtl:" + wpercent, hpercent, tpercent, lpercent)
        checkPosArray.push({
          top: this.state.dottop[startIndex + i],
          left: this.state.dotleft[startIndex + i],
          bottom: Animated.add(
            parseInt(
              this.state.dottop[startIndex + i],
              this.state.dotheight[startIndex + i],
            ),
          ),
          right: Animated.add(
            parseInt(
              this.state.dotleft[startIndex + i],
              this.state.dotwidth[startIndex + i],
            ),
          ),
          quad: this.state.quad[i],
        });
        console.log(checkPosArray);
        if (i == indata.length - 1) {
          // this.state.dotheight[20] = new Animated.Value(25)
          // this.state.dotwidth[20] = new Animated.Value(25)
          for (
            let j = startIndex;
            j < this.state.filteredContactData.length;
            j++
          ) {
            // this.state.dotheight[j] = new Animated.Value(25)
            // this.state.dotwidth[j] = new Animated.Value(25)
            setTimeout(() => {
              Animated.timing(this.state.filteredContactData[j].opacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false,
              }).start();
              console.log(this.state.filteredContactData[j]);
              setTimeout(() => {
                Animated.timing(this.state.dotheight[20], {
                  toValue: 50,
                  duration: 2000,
                  useNativeDriver: false,
                }).start();
                Animated.timing(this.state.dotwidth[20], {
                  toValue: 50,
                  duration: 2000,
                  useNativeDriver: false,
                }).start();
              }, 1000);
              setTimeout(() => {
                Animated.timing(this.state.dotheight[j], {
                  toValue: 25,
                  duration: 2000,
                  useNativeDriver: false,
                }).start();
                Animated.timing(this.state.dotwidth[j], {
                  toValue: 25,
                  duration: 2000,
                  useNativeDriver: false,
                }).start();
              }, 2000);
              setTimeout(() => {
                if (this.state.filteredContactData[j].status == false) {
                  this.state.filteredContactData[j].status = true;
                  this.state.filteredContactData[j].color = 'gray';
                }
              }, 4000);
            }, 5000);
          }
        }
      }
    } catch (e) {
      console.log('renderextradotsexception:', e);
    }
  };
  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };
  loadContactsOnManageContactsScreen = async () => {
    let NewLoadedContacts = [];
    let mergedcontats = this.state.filteredContactData.concat(
      this.state.allRecentContactsArray,
    );
    // RNFS.writeFile(RNFS.DownloadDirectoryPath + '/mrgd_cntct.txt', JSON.stringify(mergedcontats))
    console.log('allrcnt bfr:', this.state.allRecentContactsArray.length);
    try {
      if (Platform.OS === 'ios') {
        await check(PERMISSIONS.IOS.CONTACTS)
          .then(async result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log(
                  'This feature is not available (on this device / in this context)',
                );
                break;
              case RESULTS.DENIED:
                console.log(
                  'The permission has not been requested / is denied but requestable',
                );
                break;
              case RESULTS.LIMITED:
                console.log(
                  'The permission is limited: some actions are possible',
                );
                break;
              case RESULTS.GRANTED:
                console.log('The permission is granted');
                await Contacts.getAll()
                  .then(contacts => {
                    NewLoadedContacts = contacts;
                    console.log('allaioscontacts:', contacts.length);
                  })
                  .catch(e => {
                    console.log(e);
                    //this.setState({ loading: false });
                  });
                break;
              case RESULTS.BLOCKED:
                console.log(
                  'The permission is denied and not requestable anymore',
                );
                break;
            }
          })
          .catch(error => {
            // …
          });
      }
      if (Platform.OS === 'android') {
        await PermissionsAndroid.check('android.permission.READ_CONTACTS').then(
          async res => {
            // console.log("contacts:" + res)
            if (res == true) {
              await Contacts.getAll()
                .then(contacts => {
                  NewLoadedContacts = contacts;
                  // RNFS.writeFile(RNFS.DownloadDirectoryPath + '/all_cntct.txt', JSON.stringify(NewLoadedContacts))
                  console.log('allandroidcontacts:', contacts.length);
                })
                .catch(e => {
                  console.log(e);
                  //this.setState({ loading: false });
                });
            } else {
              console.log('contact permission not granted.');
            }
          },
        );
      }
      console.log('newcontacts:', NewLoadedContacts.length);
      if (NewLoadedContacts.length > 0) {
        for (let i = 0; i < NewLoadedContacts.length; i++) {
          // console.log("bfr check:",i,NewLoadedContacts[i].phoneNumbers.length,NewLoadedContacts[i].givenName)
          let indexAllRcnt = mergedcontats.findIndex(object => {
            // console.log(NewLoadedContacts[i].phoneNumbers,console.log(NewLoadedContacts[i].phoneNumbers.find(x => x.label === 'mobile')))
            if (object != null && NewLoadedContacts[i] != null) {
              if (NewLoadedContacts[i].phoneNumbers.length > 0) {
                if (
                  NewLoadedContacts[i].phoneNumbers.find(
                    x => x.label === 'mobile',
                  ) != undefined
                ) {
                  // console.log("aftr check")
                  // console.log("inside else:",i)
                  //  console.log(NewLoadedContacts.length,i,NewLoadedContacts[i].phoneNumbers.length)
                  let phoneToCheck = NewLoadedContacts[i].phoneNumbers
                    .find(x => x.label === 'mobile')
                    .number.replace(/[^0-9]/g, '');
                  if (
                    object.phoneNumber.replace(/[^0-9]/g, '').length > 0 &&
                    phoneToCheck.replace(/[^0-9]/g, '').length > 0
                  ) {
                    if (
                      object.phoneNumber.replace(/[^0-9]/g, '').length <=
                      phoneToCheck.length
                    ) {
                      if (
                        phoneToCheck.endsWith(
                          object.phoneNumber.replace(/[^0-9]/g, ''),
                        )
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    } else {
                      if (
                        object.phoneNumber
                          .replace(/[^0-9]/g, '')
                          .endsWith(phoneToCheck)
                      ) {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }
                }
              }
            }
          });
          // console.log(indexAllRcnt,NewLoadedContacts.length,i,NewLoadedContacts[i])
          if (
            NewLoadedContacts[i].phoneNumbers.find(x => x.label === 'mobile') !=
            undefined
          ) {
            if (indexAllRcnt == -1) {
              if (NewLoadedContacts[i].phoneNumbers.length > 0) {
                let obj = {
                  name:
                    NewLoadedContacts[i].givenName +
                    ' ' +
                    NewLoadedContacts[i].familyName,
                  phoneNumber: NewLoadedContacts[i].phoneNumbers.find(
                    x => x.label === 'mobile',
                  ).number,
                  color: 'gray',
                  display: 'flex',
                  tag: 'contact',
                  checked: false,
                  opacity: new Animated.Value(1),
                  scale: new Animated.Value(1),
                };
                this.state.allRecentContactsArray.push(obj);
              }
            } else {
            }
          }
        }
      }
      NewLoadedContacts = [];
      mergedcontats = [];
      this.setState({loadingContactsText: 'none'});
      console.log('allrcnt aftr:', this.state.allRecentContactsArray.length);
      // RNFS.writeFile(RNFS.DownloadDirectoryPath + '/loaded_cntct.txt', JSON.stringify(this.state.allRecentContactsArray))
    } catch (err) {
      // RNFS.writeFile(RNFS.DownloadDirectoryPath + '/err_file.txt', JSON.stringify(err))
      console.warn(err);
    }
  };
  loadContacts = () => {
    Contacts.getAll()
      .then(async contacts => {
        console.log('allandroidcontacts:', contacts.length);
        // RNFS.writeFile(RNFS.DownloadDirectoryPath + '/allloadedcntcts.txt', JSON.stringify(contacts))
        if (contacts.length > 0) {
          try {
            for (let i = 0; i < contacts.length; ) {
              if (contacts[i] != null) {
                if (contacts[i].phoneNumbers.length == 0) {
                  // console.log(contacts[i])
                  contacts.splice(i, 1);
                  i = i;
                } else if (contacts[i].phoneNumbers.length > 0) {
                  if (
                    contacts[i].phoneNumbers.find(x => x.label === 'mobile') ==
                    undefined
                  ) {
                    // console.log(contacts[i])
                    contacts.splice(i, 1);
                    i = i;
                  } else {
                    i++;
                  }
                } else {
                  i++;
                }
              } else {
                contacts.splice(i, 1);
                i = i;
              }
            }
            for (let k = 0; k < contacts.length; k++) {
              for (let j = k + 1; j < contacts.length; j++) {
                if (contacts[j] != null && contacts[k] != null) {
                  // console.log(contacts[k],contacts[j],k,j)
                  let k_number = contacts[k].phoneNumbers
                    .find(x => x.label === 'mobile')
                    .number.replace(/[^0-9]/g, '');
                  let j_number = contacts[j].phoneNumbers
                    .find(x => x.label === 'mobile')
                    .number.replace(/[^0-9]/g, '');
                  if (k_number.length <= j_number.length) {
                    if (j_number.endsWith(k_number)) {
                      contacts.splice(j, 1);
                      j--;
                    }
                  } else if (k_number.endsWith(j_number)) {
                    contacts.splice(j, 1);
                    j--;
                  }
                  // if (callArray[k].phoneNumber == callArray[j].phoneNumber) {
                  //     callArray.splice(j, 1);
                  //     j--;
                  // }
                }
              }
            }
            contacts = contacts.map(this.selectFewerProps);
            contacts.forEach(element => {
              element.color = 'gray';
              element.display = 'flex';
              element.tag = 'contact';
              element.checked = false;
              element.opacity = new Animated.Value(1);
              element.scale = new Animated.Value(1);
            });
            // console.log("lenn:", this.state.allAndroidContactsArray.length)
            // PermissionsAndroid.check('android.permission.READ_CALL_LOG').then(res => {
            //     if (res == false) {
            console.log('contacts length:', contacts.length);
            this.displayRecentContacts(contacts);
            //     }
            // });
            // console.log(this.state.filteredContactData)
            // for(let i=0;i<this.state.allAndroidContactsArray.length;i++){
            //     let indexFcd = this.state.filteredContactData.findIndex(object => object.phoneNumber === this.state.allAndroidContactsArray[i].phoneNumber);
            //     let indexAllRcnt = this.state.allRecentContactsArray.findIndex(object => object.phoneNumber === this.state.allAndroidContactsArray[i].phoneNumber);
            //    console.log(this.state.allAndroidContactsArray[i])
            //    console.log(this.state.filteredContactData[i])
            //    console.log(this.state.allRecentContactsArray[i])
            //     if(indexFcd == -1 && indexAllRcnt == -1){
            //       this.state.allRecentContactsArray.push(
            //         this.state.allAndroidContactsArray[i]
            //       )
            //       this.state.allAndroidContactsArray.splice(i, 1);
            //       console.log("this is not user's mostly contacted person.",this.state.allAndroidContactsArray.length,this.state.allRecentContactsArray.length,i)
            //     }
            //     else{
            //         console.log("this is user's mostly contacted person.",this.state.allAndroidContactsArray.length,this.state.allRecentContactsArray.length,i)
            //     }
            // }
          } catch (e) {
            console.log(e);
            alert(e);
            //    await RNFetchBlob.fs.writeFile(RNFetchBlob.fs.dirs.DownloadDir + '/loaderror.txt', JSON.stringify(e))
          }
        }
      })
      .catch(e => {
        console.log(e);
        //this.setState({ loading: false });
      });
    Contacts.checkPermission();
  };
  authviaflake = async (flake, forceauth) => {
    newtooldflakeconverter['NEWFLAKE'] = flake;
    //alert(flake)
    let xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    let url = BASE_URL + 'vn/auththroughflake';
    xhr.onreadystatechange = async () => {
      console.log(xhr.status, xhr.readyState);
      if (xhr.readyState == 4 && xhr.status == 200) {
        // alert(xhr.responseText);
        let respjsonobj = JSON.parse(xhr.responseText);
        console.log(respjsonobj);
        if (respjsonobj.newChallenge != null) {
          // this.setState({ showLoader: 'none', showView: false, showPic: true })
          imgsLength = respjsonobj.newChallenge.images.length;
          let tmpPaths = [];
          let tmpImgSize = [];
          for (let i = 0; i < respjsonobj.newChallenge.images.length; i++) {
            tmpImgSize[i] = respjsonobj.newChallenge.images[i];
          }
          this.setState({
            source: tmpImgSize,
            img: setImgurl + tmpImgSize[0].imageid,
          });
          console.log('tmpppath');
          console.log(this.state.source);
          var ttmp = this.state.source;
          console.log(ttmp);
          resImgArray = ttmp;
          console.log(this.state.source);
          var wh = this.getnewimagesize(tmpImgSize[0]);
          console.log(wh);
          this.setState({
            imgSize: tmpImgSize,
            imgDisplayTop: wh.top,
            imgDisplayHeight: wh.height,
            imgDisplayWidth: wh.width,
            originalimagewidth: wh.width,
            originalimageheight: wh.height,
            originalimageleft: new Animated.Value(0),
            originalimagetop: new Animated.Value(0),
          }); //cmntd
          tmpImgSize = [];
          this.showimagesonoverlay(resImgArray);
          // setTimeout(() => {
          //     console.log(ttmp)
          //     this.showimagesonoverlay(ttmp);
          //     //console.log(respjsonobj.newChallenge)
          // }, 10000);
        } else if (respjsonobj.flakejson != null) {
          this.setState({
            userLoggedin: 'flex',
            showLoader: 'none',
            homepage: 'flex',
            showView: true,
            isFlakeActive: 'flex',
          });
          AsyncStorage.setItem('loggedin', this.state.userLoggedin);
          // AsyncStorage.setItem("disableuserbox", 'none');
          authenticateduser = JSON.parse(respjsonobj.flakejson);
          console.log(authenticateduser.giveout);
          AsyncStorage.setItem('flakeondevice', authenticateduser.flake);
          AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
            console.log('flakeondevice:' + asyncStorageRes);
            this.setState({deviceflake: asyncStorageRes});
          });
          flakesondevice = this.state.deviceflake;
          this.setState({
            flakepageheader: authenticateduser.giveout,
            userGiveOut: authenticateduser.giveout,
            userFlake: authenticateduser.flake,
            userCrtime: authenticateduser.crtime,
          });
          // this.setState({ showView: false, displayFlake: true })
          // oldtonewflakeconverter[flake] = authenticateduser.flake;
          // newtooldflakeconverter[authenticateduser.flake] = flake;
          if (flakesondevice != null) {
            for (var i = 0; i < flakesondevice.length; i++) {
              //alert(flakesondevice[i].flake + ' ' + flake);
              //if (flakesondevice[i].flake == authenticateduser.flake) {
              if (
                flakesondevice[i].flake ==
                newtooldflakeconverter[authenticateduser.flake]
              ) {
                // do not want to compare with flake that came in.. because it will be different
                //alert(flakesondevice[i].extIds)
                authenticateduser.extIds = flakesondevice[i].extIds;
              }
            }
          }
          //displayflakeonverlay(authenticateduser);
          //setTimeout(close, 800);
          //setTimeout(configurations['onAuthCallback'], 1200);
        }
      } else if (xhr.readyState == 4 && xhr.status == 500) {
        if (this.state.showLoader == 'flex') {
          this.setState({
            flashopacity: true,
            flashMessage: `Server error. Please try again.`,
            flashColor: 'lightgray',
            flashPosition: '50%',
            textcolor: '#D21F3C',
          });
          setTimeout(() => {
            this.setState({flashopacity: false});
          }, 3500);
        }
      }
    };
    xhr.open('POST', url);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    let reqpacket = JSON.stringify({
      userflake: flake,
      forceauth: forceauth,
      screenwidth: parseInt(width),
      screenheight: parseInt(height),
    });
    console.log(reqpacket);
    if (flake != null) {
      xhr.send(reqpacket);
      if (forceauth == true)
        setTimeout(() => {
          if (resImgArray.length == 0) {
            this.setState({
              flashopacity: true,
              flashMessage: `Unable to connect to network. Please check your internet connection.`,
              flashColor: 'lightgray',
              flashPosition: '50%',
              textcolor: '#D21F3C',
            });
            setTimeout(() => {
              this.setState({flashopacity: false});
            }, 3500);
          }
        }, 25000);
    } else {
      this.setState({
        userLoggedin: 'flex',
        showLoader: 'none',
        homepage: 'flex',
        showView: true,
      });
      this.setState({
        flashopacity: true,
        flashMessage: `Please login with username`,
        flashColor: 'lightgray',
        flashPosition: '50%',
        textcolor: 'black',
      });
      setTimeout(() => {
        this.setState({flashopacity: false});
      }, 3500);
    }
  };
  dotfunction = () => {
    var xy = '';
    if (this.state.userLoggedin == 'flex') {
      if (loggedInuserType == 'phone') {
        this.setState({
          flashopacity: true,
          flashMessage: `Can not log in with image. Please enter your username.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      } else {
        AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
          console.log(asyncStorageRes);
          xy = asyncStorageRes;
          this.setState({homepage: 'none', showLoader: 'flex'});
          this.authviaflake(xy, false);
        });
      }
    } else {
    }
    console.log(xy);
  };
  changeValue = async () => {
    dismissKeyboard();
    this.setState({
      img: null,
      imgSize: [],
      authImages: [],
      source: [],
      showLoader: 'none',
      source: [],
    });
    var vall = this.state.username;
    console.log(vall);
    if (vall.length < 6) {
      this.setState({unameBrdrClr: 'red'});
    } else {
      console.log('started');
      this.setState({homepage: 'none'});
      this.setState({showLoader: 'flex'});
      let x = this.state.username;
      console.log('username: ' + x);
      let y = this.hashUserForAuthentication(x);
      console.log('hashed username: ' + y);
      this.changeAuth(y);
    }
  };
  hashUserForAuthentication = user => {
    var saltBits = sjcl.codec.base64.toBits('sugar');
    var derivedKey1000 = sjcl.misc.pbkdf2(user, saltBits, 1000, 256);
    var key1000 = sjcl.codec.base64.fromBits(derivedKey1000);
    var salt = sjcl.codec.base64.fromBits(saltBits);
    console.log('Hashed username: ' + key1000);
    var newValue = key1000;
    return key1000;
  };
  changeAuth = y => {
    console.log('auth:' + y);
    this.authviausername(y);
  };
  authviausername(usernamehash) {
    console.log('auth started');
    let xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    //console.log('xhr: '+xhr)
    let url = BASE_URL + 'vn/auththroughusername';
    // console.log('url: '+url)
    xhr.onreadystatechange = async () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // alert(xhr.responseText);
        let respjsonobj = JSON.parse(xhr.responseText);
        console.log(respjsonobj);
        console.log(
          'success status:' + xhr.status + 'ready status:' + xhr.readyState,
        );
        console.log('images:', respjsonobj.newChallenge.images.length);
        if (respjsonobj.newChallenge != null) {
          console.log('method1 called');
          let tmpPaths = [];
          let tmpImgSize = [];
          imgsLength = respjsonobj.newChallenge.images.length;
          for (let i = 0; i < respjsonobj.newChallenge.images.length; i++) {
            tmpImgSize[i] = respjsonobj.newChallenge.images[i];
          }
          // new  code from here
          let newsImageUrl = [];
          //to here
          this.setState({
            source: tmpImgSize,
            img: setImgurl + tmpImgSize[0].imageid,
          });
          console.log('tmpppath');
          console.log(this.state.source);
          var ttmp = this.state.source;
          console.log(ttmp);
          resImgArray = ttmp;
          console.log(this.state.source);
          var wh = this.getnewimagesize(tmpImgSize[0]);
          console.log(wh);
          this.setState({
            imgSize: tmpImgSize,
            imgDisplayTop: wh.top,
            imgDisplayHeight: wh.height,
            imgDisplayWidth: wh.width,
            originalimagewidth: wh.width,
            originalimageheight: wh.height,
            originalimageleft: new Animated.Value(0),
            originalimagetop: new Animated.Value(0),
          }); //cmntd
          tmpImgSize = [];
          this.showimagesonoverlay(resImgArray);
        } else if (respjsonobj.flakejson != null) {
          this.setState({userLoggedin: 'flex'});
          AsyncStorage.setItem('loggedin', this.state.userLoggedin);
          console.log('method2 called');
          authenticateduser = JSON.parse(respjsonobj.flakejson);
          AsyncStorage.setItem('flakeondevice', authenticateduser.flake);
          AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
            console.log('flakeondevice:' + asyncStorageRes);
            this.setState({deviceflake: asyncStorageRes});
          });
          flakesondevice = this.state.deviceflake;
          console.log(JSON.stringify(authenticateduser));
          this.setState({
            flakepageheader: authenticateduser.giveout,
            userGiveOut: authenticateduser.giveout,
            userFlake: authenticateduser.flake,
            userCrtime: authenticateduser.crtime,
          });
          this.setState({showView: false, displayFlake: true});
          console.log(
            authenticateduser.giveout,
            authenticateduser.flake,
            authenticateduser.crtime,
          );
          if (flakesondevice != null) {
            console.log('method3 called');
            console.log('FLK:' + flakesondevice);
            for (var i = 0; i < flakesondevice.length; i++) {
              //alert(flakesondevice[i].flake + ' ' + flake);
              //if (flakesondevice[i].flake == authenticateduser.flake) {
              if (
                flakesondevice[i].flake ==
                newtooldflakeconverter[authenticateduser.flake]
              ) {
                // do not want to compare with flake that came in.. because it will be different
                //alert(flakesondevice[i].extIds)
                // authenticateduser.extIds = flakesondevice[i].extIds;
                // console.log('NN:' + authenticateduser.extIds)
              }
            }
          }
          // this.displayflakeonverlay(authenticateduser);
          //setTimeout(close, 800);
          setTimeout(configurations['onAuthCallback'], 1200);
          // setTimeout(()=>{
          //       this.setState({showTimeoutModal:true})
          // },1200);
        }
      } else if (xhr.readyState == 4 && xhr.status == 500) {
        if (this.state.showLoader == 'flex') {
          this.setState({
            flashopacity: true,
            flashMessage: `Server error. Please try again.`,
            flashColor: 'lightgray',
            flashPosition: '50%',
            textcolor: '#D21F3C',
          });
          setTimeout(() => {
            this.setState({flashopacity: false});
          }, 3500);
        }
      }
    };
    xhr.open('POST', url);
    console.log(url);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };
    let reqpacket = JSON.stringify({
      username: usernamehash,
      screenwidth: parseInt(Dimensions.get('window').width),
      screenheight: parseInt(Dimensions.get('window').height),
    });
    console.log('request packet:' + reqpacket);
    console.log('ready state: ' + xhr.readyState + ' status: ' + xhr.status);
    xhr.send(reqpacket);
    setTimeout(() => {
      if (resImgArray.length == 0) {
        this.setState({
          flashopacity: true,
          flashMessage: `Unable to connect to network. Please check your internet connection.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      }
    }, 25000);
    //console.log(xhr.send(reqpacket));
  }
  downloadImagesInParallel = async (url, path) => {
    const dirs = RNFetchBlob.fs.dirs;
    console.log('downloadImagesInParallel', url);
    await RNFS.downloadFile({
      fromUrl: setImgurl + url,
      toFile: path,
    }).promise.then(res => {
      console.log('res : ', res);
      resArray.push(res);
      console.log(resArray.length);
      if (resArray.length == imgsLength) {
        this.setState({showLoader: 'none', showView: false, showPic: true});
        this.showimagesonoverlay(resImgArray);
      }
      // this.loadFile(path)
    });
  };
  showimagesonoverlay = respjsonobj => {
    dismissKeyboard();
    //  this.setState({ showView:false})
    //  this.setState({ showPic: true,visibleSCreen:'flex' })
    console.log('showimgoverlay started:', this.state.img);
    console.log(respjsonobj);
    console.log('img length:' + respjsonobj.length, respjsonobj);
    if (respjsonobj.length == 0) {
      alert(
        'This Newauth profile is not setup properly. Please set it up first',
      );
    } else {
      this.setState({
        authImages: [...respjsonobj],
        displayImgIndex: 0,
        zoomCount: 0,
        sendData: [],
        // img: tmpImgs[0],
        showView: false,
        showPic: true,
        visibleSCreen: 'flex',
      });
      console.log(this.state.authImages);
      let clickdata = [];
    }
  };
  postimageclickdata = async imdata => {
    console.log('inside post image click data');
    let xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    let url = BASE_URL + 'vn/postclickdataforauth';
    xhr.onreadystatechange = async () => {
      console.log('post image:', xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        //alert(xhr.responseText);
        console.log(xhr.status);
        let respjsonobj = JSON.parse(xhr.responseText);
        console.log('resp:', respjsonobj);
        if (respjsonobj.newChallenge != null) {
          imgsLength = respjsonobj.newChallenge.images.length;
          resArray = [];
          resImgArray = [];
          //adding new logic
          this.state.authImages = [];
          //till here
          if (configurations['onAuthFailCallback']) {
            configurations['onAuthFailCallback']();
          }
          setTimeout(async () => {
            console.log('timeout called');
            // this.setState({ img: null, imgSize: [], authImages: [], source: [] })
            let tmpPaths = [];
            let tmpImgSize = [];
            for (let i = 0; i < respjsonobj.newChallenge.images.length; i++) {
              tmpImgSize[i] = respjsonobj.newChallenge.images[i];
            }
            var wh = this.getnewimagesize(tmpImgSize[0]);
            console.log(wh);
            this.setState({
              imgSize: tmpImgSize,
              imgDisplayTop: wh.top,
              imgDisplayHeight: wh.height,
              imgDisplayWidth: wh.width,
              originalimagewidth: wh.width,
              originalimageheight: wh.height,
              originalimageleft: new Animated.Value(0),
              originalimagetop: new Animated.Value(0),
            }); //cmntd
            this.setState({
              source: tmpImgSize,
              img: setImgurl + tmpImgSize[0].imageid,
            });
            console.log(
              'tmpppath:',
              this.state.imgDisplayWidth,
              this.state.imgDisplayHeight,
            );
            // console.log(this.state.source)
            var ttmp = this.state.source;
            // console.log(ttmp)
            resImgArray = ttmp;
            // console.log(this.state.source)
            tmpImgSize = [];
            this.showimagesonoverlay(resImgArray);
            this.setState({
              flashopacity: true,
              flashMessage: `Authentication failed.`,
              flashColor: 'lightgray',
              flashPosition: '50%',
              textcolor: '#D21F3C',
            });
            setTimeout(() => {
              this.setState({flashopacity: false});
            }, 3500);
            this.setState({isFlakeActive: 'none'});
            // Alert.alert('could not authenticate. Please try again.')
            // setTimeout(() => {
            //     // this.setState({ showLoader: 'none', showView: false, showPic: true })
            //     this.showimagesonoverlay(ttmp);
            // }, 10000);
          }, 400);
          //}
        } else {
          if (respjsonobj.flakejson != null) {
            this.setState({userLoggedin: 'flex'});
            if (this.state.username != '') {
              this.state.vaultvalue = this.state.username;
            }
            AsyncStorage.setItem('loggedin', this.state.userLoggedin);
            AsyncStorage.setItem('disableuserbox', 'none');
            this.setState({
              updateUIState: false,
              displayUserBox: 'none',
              isFlakeActive: 'flex',
            });
            authenticateduser = JSON.parse(respjsonobj.flakejson);
            confusername = authenticateduser.flake;
            loggedInuserType = 'flake';
            this.getSession(confusername);
            AsyncStorage.setItem('flakeondevice', authenticateduser.flake);
            AsyncStorage.setItem('devicegiveout', authenticateduser.giveout);
            // AsyncStorage.getItem('devicegiveout').then(asyncStorageRes => {
            //     console.log("devicegiveout:" + asyncStorageRes)
            //     this.setState({ userGiveOut: asyncStorageRes })
            // });
            AsyncStorage.getItem('flakeondevice').then(asyncStorageRes => {
              console.log('flakeondevice:' + asyncStorageRes);
              this.setState({deviceflake: asyncStorageRes});
            });
            flakesondevice = this.state.deviceflake;
            console.log(flakesondevice);
            oldtonewflakeconverter[newtooldflakeconverter['NEWFLAKE']] =
              authenticateduser.flake;
            newtooldflakeconverter[authenticateduser.flake] =
              newtooldflakeconverter['NEWFLAKE'];
            console.log(authenticateduser);
            this.setState({
              flakepageheader: authenticateduser.giveout,
              userGiveOut: authenticateduser.giveout,
              userFlake: authenticateduser.flake,
              userCrtime: authenticateduser.crtime,
            });
            setTimeout(() => {
              // this.setState({ showLoader: 'none', showView: false, showPic: false, displayFlake: true })
              this.setState({
                showLoader: 'none',
                homepage: 'flex',
                showView: true,
                showPic: false,
              });
              this.setState({
                flashopacity: true,
                flashMessage: `Authentication successful.`,
                flashColor: 'lightgray',
                flashPosition: '50%',
                textcolor: 'green',
              });
              setTimeout(() => {
                this.setState({flashopacity: false});
              }, 3500);
              this.getUserInviteConnections();
            }, 100);
            // alert(flakesondevice[0].extIds)
            // authenticateduser.extIds = flakesondevice[i].extIds;
            if (flakesondevice != null) {
              console.log('flakesondevice is not null');
              console.log(flakesondevice);
              for (var i = 0; i < flakesondevice.length; i++) {
                if (
                  flakesondevice[i].flake ==
                  newtooldflakeconverter[authenticateduser.flake]
                ) {
                  //alert(flakesondevice[i].extIds)
                  // authenticateduser.extIds = flakesondevice[i].extIds;
                }
              }
            }
            console.log('flake json response');
            console.log(JSON.parse(respjsonobj.flakejson));
            //this.displayflakeonverlay(JSON.parse(respjsonobj.flakejson));
            //setTimeout(close, 800);
            //setTimeout(configurations['onAuthCallback'], 1200);
          }
        }
      } else if (xhr.readyState == 4 && xhr.status == 500) {
        if (this.state.showLoader == 'flex') {
          this.setState({
            flashopacity: true,
            flashMessage: `Server error. Please try again.`,
            flashColor: 'lightgray',
            flashPosition: '50%',
            textcolor: '#D21F3C',
          });
          setTimeout(() => {
            this.setState({flashopacity: false});
          }, 3500);
        }
      }
    };
    xhr.open('POST', url);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    let reqpacket = JSON.stringify(imdata);
    //this.showmessageonoverlay('... Authenticating');
    console.log('...Authenticating');
    console.log('pckt' + reqpacket);
    xhr.send(reqpacket);
    setTimeout(() => {
      if (this.state.showLoader == 'flex') {
        this.setState({
          flashopacity: true,
          flashMessage: `Unable to connect to network. Please check your internet connection.`,
          flashColor: 'lightgray',
          flashPosition: '50%',
          textcolor: '#D21F3C',
        });
        setTimeout(() => {
          this.setState({flashopacity: false});
        }, 3500);
      }
    }, 25000);
  };
  onLayout(event) {
    this._picRef.measureInWindow((left, top, width, height) => {
      // console.log("measureinwindow:",left, top, width, height);
      this.state.picDimensions = {left, top, width, height};
    });
    const layout = event.nativeEvent.layout;
    this.setState({
      imgWidth: layout.width,
      imgHeight: layout.height,
      imgleft: layout.x,
      imgtop: layout.y,
    });
    //  console.log('values:' + layout.width, layout.height, layout.x, layout.y)
    let tmpImgs = this.state.authImages;
    let tmpp = this.state.imgSize;
    // console.log(tmpp[0].imageid)
    //this.setState({ img:tmpImgs[0]})
  }
  getnewimagesize = img => {
    var newwidth = img.imagewidth;
    var newheight = img.imageheight;
    //console.log('app dims ' + document.getElementById('app').width + ' ' + document.getElementById('app').height);
    var arwin = (width - 12) / (height - 94);
    var arimg = img.imagewidth / img.imageheight;
    if (arwin <= arimg) {
      //console.log("came in image ar bigger or equal");
      if (width < img.imagewidth) {
        newwidth = width - 12;
        newheight = newwidth / arimg;
      }
    } else {
      //console.log("came in image ar smaller : win " + window.innerHeight + " img " + img.height);
      if (height - 94 < img.imageheight) {
        newheight = height - 94;
        newwidth = newheight * arimg;
      }
    }
    console.log(
      'original img ' +
        img.imagewidth +
        ' ' +
        img.imageheight +
        ' new image size' +
        newwidth.toFixed(2),
      newwidth,
    );
    var out = {
      width: new Animated.Value(newwidth),
      height: new Animated.Value(newheight),
      top: new Animated.Value((screenheight - newheight) / 2),
    };
    console.log(
      'original img ' +
        img.imagewidth +
        ' ' +
        img.imageheight +
        ' new image size' +
        JSON.stringify(out),
    );
    console.log(out);
    return out;
  };
  calculateImageSize(evt) {
    if (currentzoom == 0) {
      startImageClickTime = Date.now();
    }
    let {
      imgWidth,
      imgHeight,
      authImages,
      displayImgIndex,
      zoomCount,
      sendData,
      imgSize,
    } = this.state;
    let {imagewidth, imageheight, imageseq, imageid} = imgSize[imagecounter];
    console.log('displayindex:' + imagecounter, evt.nativeEvent);
    console.log(imgSize);
    console.log('w:' + imagewidth);
    console.log('h:' + imageheight);
    let clickx = parseInt(
      evt.nativeEvent.pageX - this.state.picDimensions.left,
    );
    let clicky = parseInt(evt.nativeEvent.pageY - this.state.picDimensions.top);
    console.log('clickx,y:' + clickx, clicky);
    let rect = [];
    rect = this.state.picDimensions;
    console.log(rect);
    //let x = Math.round((clickx - rect.left) / ((rect.left + rect.width) - rect.left) * rect.width);
    //let y = Math.round((clicky - rect.top) / ((rect.top + rect.height) - rect.top) * rect.height);
    let x = clickx;
    let y = clicky;
    let mousePos2 = {x, y};
    console.log('clickedX:' + x, 'clickedY:' + y);
    let index = -1;
    if (x > rect.width / 2 && y > rect.height / 2) {
      index = 3;
    } else if (x > rect.width / 2) {
      if (y > rect.height / 2) {
        index = 3;
      } else index = 1;
    } else {
      if (y > rect.height / 2) {
        index = 2;
      } else index = 0;
    }
    console.log(imgWidth, imgHeight, imagewidth, imageheight);
    console.log(authImages);
    console.log('x:' + x, 'y:' + y);
    let coords = this.calculateImageCoord(x, y);
    console.log(coords);
    console.log('imgg:' + this.state.img);
    if (width < 600) {
      console.log('currentzoom zoomfurther ' + currentzoom + ' ' + zoomfurther);
      if (currentzoom < maxzoom && zoomfurther) {
        //var imgcanv = document.getElementById("imgholder");
        var xdiv = 0;
        var ydiv = 0;
        var gridclicked = this.getgridclicked(
          x,
          y,
          rect.width,
          rect.height,
          gridSize,
        );
        console.log(gridclicked);
        console.log('index:' + index);
        console.log(
          'zoom count ' +
            currentzoom +
            ' zooming on grid location' +
            JSON.stringify(gridclicked) +
            ' x, y ' +
            x +
            ', ' +
            y,
        );
        if (currentzoom > 0) {
          xdiv =
            collagex + mousePos2.x / Math.pow(gridSize, currentzoom) - impliedx;
          ydiv =
            collagey + mousePos2.y / Math.pow(gridSize, currentzoom) - impliedy;
          console.log(currentzoom + ' divergences x , y ' + xdiv + ', ' + ydiv);
        }
        impliedx = collagex + mousePos2.x / Math.pow(gridSize, currentzoom);
        impliedy = collagey + mousePos2.y / Math.pow(gridSize, currentzoom);
        console.log(
          currentzoom + ' impliedx , impliedy ' + impliedx + ', ' + impliedy,
        );
        console.log('collagex , collagey ' + collagex + ', ' + collagey);
        if (
          currentzoom == 0 ||
          Math.abs(xdiv) > rect.width * 0.1 ||
          Math.abs(ydiv) > rect.height * 0.1
        ) {
          //if (currentzoom == 0)
          console.log('First click... zoom further');
          //else
          console.log('divergence exists... zoom further');
          collagex +=
            (rect.width * (gridclicked.col - 1)) /
            Math.pow(gridSize, currentzoom + 1);
          collagey +=
            (rect.height * (gridclicked.row - 1)) /
            Math.pow(gridSize, currentzoom + 1);
          console.log('collagex,y:' + collagex, collagey);
          if (currentzoom == 0) {
            // this.split_4(imagewidth, imageheight, index, rect.width, rect.height);
            this.split_4(
              rect.width * 2,
              rect.height * 2,
              index,
              rect.width,
              rect.height,
            );
          } else {
            // this.split_4(imagewidth, imageheight, index, rect.width*2, rect.height*2);
            this.split_8(
              rect.width,
              rect.height,
              index,
              rect.width * 2,
              rect.height * 2,
            );
          }
          return;
        } else {
          //  displayImgIndex++;
          // this.setState({img:authImages[displayImgIndex]})
          zoomfurther = false;
          console.log('zoom false');
          //drawGridOverImage( imgcanv, gridSize);
          //zoomimagegrid(gridclicked, imgs[imagecounter],imgcanv);
          //return;
        }
      }
    }
    if (width < 600) {
      console.log('inside other if');
      //console.log("collagex,  currentzoom, x, gridSize " + collagex + ", " + currentzoom + "," + x + "," + gridSize);
      x = collagex + mousePos2.x / Math.pow(gridSize, currentzoom);
      y = collagey + mousePos2.y / Math.pow(gridSize, currentzoom);
      console.log(currentzoom + ' impliedx , impliedy ' + x + ', ' + y);
      collagex = 0;
      collagey = 0;
      collageimagesloaded = 0;
      currentzoom = 0;
      //     if(imagecounter<imgSize.length-1){
      //     imagecounter++;
      console.log('imagecounter:' + imagecounter);
      console.log('x,y:' + x, y);
      //     this.setState({img:authImages[imagecounter],imgDisplayHeight:parseInt(imgSize[imagecounter].imageheight/imgSize[imagecounter].imagewidth*348)})
      //     console.log(this.state.imgDisplayHeight);
      // }
    }
    if (
      parseInt(x) >= 0 &&
      parseInt(x) <= rect.width &&
      parseInt(y) >= 0 &&
      parseInt(y) <= rect.height
    ) {
      console.log('inside push data');
      var indivresponse = {
        imgID: imageid,
        delay: Date.now() - startImageClickTime,
        clickX: parseInt(x),
        clickY: parseInt(y),
        imgWidth: parseInt(rect.width),
        imgHeight: parseInt(rect.height),
        imageseq: imageseq,
      };
      responsedata.push(indivresponse);
      console.log(indivresponse);
      // else{
      //     imagecounter++;
      //     //currentzoom=0;
      //     this.setState({img:authImages[imagecounter]})
      // }
      if (imagecounter < imgSize.length - 1) {
        this.setState({visibleSCreen: 'none'});
        console.log('imagecounter before:' + imagecounter);
        // this.setState({ img: null});
        imagecounter++;
        console.log('imagecounter after:' + imagecounter);
        this.setState({img: setImgurl + imgSize[imagecounter].imageid});
        var out = this.getnewimagesize(imgSize[imagecounter]);
        this.setState({
          imgDisplayWidth: out.width,
          imgDisplayHeight: out.height,
          imgDisplayTop: out.top,
          originalimagewidth: out.width,
          originalimageheight: out.height,
          originalimageleft: new Animated.Value(0),
          originalimagetop: new Animated.Value(0),
          visibleSCreen: 'flex',
        });
        console.log('increamented:', this.state.img);
        currentzoom = 0;
        zoomfurther = true;
        startImageClickTime = 1234;
      } else if (imagecounter == imgSize.length - 1) {
        console.log('sending data');
        console.log(responsedata);
        //displayImgIndex=0;
        this.setState({showPic: false, showView: true, showLoader: 'flex'});
        this.postimageclickdata(responsedata);
        imagecounter = 0;
        this.setState({img: null, imgSize: [], source: []});
        collageimagesloaded = 0;
        currentzoom = 0;
        zoomfurther = true;
        responsedata = [];
        console.log(
          'after post:',
          this.state.img,
          this.state.imgSize,
          this.state.authImages,
          this.state.source,
        );
        startImageClickTime = 1234;
      }
    }
  }
  calculateImageCoord(x, y) {
    console.log('inside coords');
    let {imgWidth, imgHeight, authImages, displayImgIndex, imgSize} =
      this.state;
    let {imagewidth, imageheight} = imgSize[displayImgIndex];
    let newX = 0;
    let newY = 0;
    let x1, y1, x2, y2;
    let ratioW = imagewidth / imgWidth;
    let ratioH = imageheight / imgHeight;
    console.log(ratioW, ratioH, 'hh');
    if (this.state.count == 1) {
      x1 = (x * ratioW) / 2;
      y1 = (y * ratioH) / 2;
      newX = x1;
      newY = y1;
      this.setState({initialX: x1, initialY: y1, count: 2});
      console.log(newX, newY);
    } else if (this.state.count == 2) {
      x2 = (x * ratioW) / 2;
      y2 = (y * ratioH) / 2;
      newX = this.state.initialX + x2;
      newY = this.state.initialY + y2;
      console.log(newX, newY);
      this.setState({count: 1, initialX: 0, initialY: 0});
    }
    // if (x <= 5 && y <= 5) {
    //     console.log('if 1')
    //     newX = 0;
    //     newY = 0;
    // }
    // else if (x <= 5 && y >= 395) {
    //     console.log('if 2')
    //     newX = 0;
    //     newY = y * ratioH;
    // }
    // else if (x >= 315 && y <= 5) {
    //     console.log('if 3')
    //     newX = x * ratioW;
    //     newY = 0;
    // }
    // else if (x >= 315 && y >= 395) {
    //     console.log('if 4')
    //     newX = x * ratioW;
    //     newY = y * ratioH;
    // }
    // else {
    //     newX = x * ratioW;
    //     newY = y * ratioH;
    // }
    // else {
    //     if (this.state.count == 1) {
    //         console.log('if 5')
    //         x1 = x * ratioW / 2;
    //         y1 = x * ratioH / 2;
    //         newX = x1;
    //         newY = y1;
    //         this.setState({ initialX: x1, initialY: y1, count: 2 })
    //         console.log(newX, newY)
    //     }
    //     else if (this.state.count == 2) {
    //         console.log('if 6')
    //         x2 = x * ratioW / 2;
    //         y2 = x * ratioH / 2;
    //         newX = this.state.initialX + x2;
    //         newY = this.state.initialY + y2;
    //         console.log(newX, newY)
    //         this.setState({ count: 1, initialX: 0, initialY: 0 })
    //     }
    // }
    // if (imagewidth > imgWidth) {
    //     let widthDiff = imagewidth - imgWidth;
    //     newX = x + widthDiff;
    // } else {
    //     let widthDiff = imgWidth - imagewidth;
    //     newX = x - widthDiff;
    // }
    // if (imageheight > imgHeight) {
    //     let heightDiff = imageheight - imgHeight;
    //     newY = y + heightDiff;
    // } else {
    //     let heightDiff = imgHeight - imageheight;
    //     newY = y - heightDiff;
    // }
    console.log(imagewidth, imageheight, imgWidth, imgHeight, newX, newY);
    return {xcoord: newX, ycoord: newY};
  }
  split_4(width, height, index, rectW, rectH) {
    let {zoomCount} = this.state;
    let imgs = [];
    let w2 = width / 2;
    let h2 = height / 2;
    console.log('h2 ', h2, index);
    if (index == 0) {
      let item = {
        x: 0,
        y: 0,
        width: w2,
        height: h2,
        left: 0,
        top: (screenheight - rectH) / 2,
        orgwidth: rectW,
        orgheight: rectH,
        index: index,
      };
      imgs.push(item);
    } else if (index == 1) {
      let item = {
        x: w2,
        y: 0,
        width: w2,
        height: h2,
        left: w2 / 2,
        top: (screenheight - rectH) / 2,
        orgwidth: rectW,
        orgheight: rectH,
        index: index,
      };
      imgs.push(item);
    } else if (index == 2) {
      let item = {
        x: 0,
        y: h2,
        width: w2,
        height: h2,
        left: 0,
        top: (screenheight - rectH) / 2 + rectH / 2,
        orgwidth: rectW,
        orgheight: rectH,
        index: index,
      };
      imgs.push(item);
    } else if (index == 3) {
      let item = {
        x: w2,
        y: h2,
        width: w2,
        height: h2,
        left: w2 / 2,
        top: (screenheight - rectH) / 2 + rectH / 2,
        orgwidth: rectW,
        orgheight: rectH,
        index: index,
      };
      imgs.push(item);
    } else {
      alert('no index matched');
    }
    this.setState({zoomCount: zoomCount + 1});
    console.log(imgs);
    mainimageindex = index;
    this.cropImagee(imgs[0]);
    imgs = [];
    console.log(imgs);
  }
  split_8(width, height, index, rectW, rectH) {
    let {zoomCount} = this.state;
    let imgs = [];
    if (mainimageindex == 0) {
      if (index == 0) {
        let item = {
          x: 0,
          y: 0,
          width: width,
          height: height,
          left: 0,
          top: (screenheight - rectH) / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 1) {
        let item = {
          x: width,
          y: 0,
          width: width,
          height: height,
          left: width / 2,
          top: (screenheight - rectH) / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 2) {
        let item = {
          x: 0,
          y: height,
          width: width,
          height: height,
          left: 0,
          top: (screenheight - rectH) / 2 + rectH / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 3) {
        let item = {
          x: width,
          y: height,
          width: width,
          height: height,
          left: width / 2,
          top: (screenheight - rectH) / 2 + rectH / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else {
        console.log('no index matched');
      }
    } else if (mainimageindex == 1) {
      if (index == 0) {
        let item = {
          x: width * 2,
          y: 0,
          width: width,
          height: height,
          left: 0,
          top: (screenheight - rectH) / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 1) {
        let item = {
          x: width * 3,
          y: 0,
          width: width,
          height: height,
          left: width / 2,
          top: (screenheight - rectH) / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 2) {
        let item = {
          x: width * 2,
          y: height,
          width: width,
          height: height,
          left: 0,
          top: (screenheight - rectH) / 2 + rectH / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 3) {
        let item = {
          x: width * 3,
          y: height,
          width: width,
          height: height,
          left: width / 2,
          top: (screenheight - rectH) / 2 + rectH / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else {
        console.log('no index matched');
      }
    } else if (mainimageindex == 2) {
      if (index == 0) {
        let item = {
          x: 0,
          y: height * 2,
          width: width,
          height: height,
          left: 0,
          top: (screenheight - rectH) / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 1) {
        let item = {
          x: width,
          y: height * 2,
          width: width,
          height: height,
          left: width / 2,
          top: (screenheight - rectH) / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 2) {
        let item = {
          x: 0,
          y: height * 3,
          width: width,
          height: height,
          left: 0,
          top: (screenheight - rectH) / 2 + rectH / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 3) {
        let item = {
          x: width,
          y: height * 3,
          width: width,
          height: height,
          left: width / 2,
          top: (screenheight - rectH) / 2 + rectH / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else {
        console.log('no index matched');
      }
    } else if (mainimageindex == 3) {
      if (index == 0) {
        let item = {
          x: width * 2,
          y: height * 2,
          width: width,
          height: height,
          left: 0,
          top: (screenheight - rectH) / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 1) {
        let item = {
          x: width * 3,
          y: height * 2,
          width: width,
          height: height,
          left: width / 2,
          top: (screenheight - rectH) / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 2) {
        let item = {
          x: width * 2,
          y: height * 3,
          width: width,
          height: height,
          left: 0,
          top: (screenheight - rectH) / 2 + rectH / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else if (index == 3) {
        let item = {
          x: width * 3,
          y: height * 3,
          width: width,
          height: height,
          left: width / 2,
          top: (screenheight - rectH) / 2 + rectH / 2,
          orgwidth: rectW,
          orgheight: rectH,
          index: index,
        };
        imgs.push(item);
      } else {
        console.log('no index matched');
      }
    }
    this.setState({zoomCount: zoomCount + 1});
    console.log(imgs);
    this.cropImagee(imgs[0]);
    imgs = [];
    console.log(imgs);
  }
  async cropImagee(item) {
    console.log('inside  crop image:', this.state.img);
    this.setState({croppedImageUri: null});
    this.setState({displayLines: 'flex'});
    // Construct a crop data object.
    let cropData = {
      offset: {x: item.x, y: item.y},
      size: {width: item.width, height: item.height},
      //displaySize: { width: item.width*2, height: item.height*2},// THESE 2 ARE OPTIONAL.
      resizeMode: 'contain',
    };
    console.log(cropData);
    setTimeout(() => {
      // Crop the image.
      try {
        console.log('inside try block');
        // ImageEditor.cropImage(this.state.img, cropData).then(url => {
        //     console.log("Cropped image uri", url);
        this.setState({
          imagecan: 'flex',
          cropWidth: item.width,
          cropHeight: item.height,
        });
        let ww = Number.parseFloat(JSON.stringify(this.state.imgDisplayWidth));
        let hh = Number.parseFloat(JSON.stringify(this.state.imgDisplayHeight));
        this.state.imgDisplayWidth = new Animated.Value(ww / 2);
        this.state.imgDisplayHeight = new Animated.Value(hh / 2);
        this.state.imgDisplayLeft = new Animated.Value(item.left);
        this.state.originalimagewidth = new Animated.Value(item.orgwidth * 2);
        this.state.originalimageheight = new Animated.Value(item.orgheight * 2);
        this.state.originalimageleft = new Animated.Value(-item.x);
        this.state.originalimagetop = new Animated.Value(-item.y);
        this.setState({displayLines: 'none'});
        Animated.timing(this.state.imgDisplayLeft, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }).start();
        if (item.index == 2 || item.index == 3) {
          this.state.imgDisplayTop = new Animated.Value(item.top);
          Animated.timing(this.state.imgDisplayTop, {
            toValue: (screenheight - hh) / 2,
            duration: 600,
            useNativeDriver: false,
          }).start();
        }
        // setTimeout(() => {
        Animated.timing(this.state.imgDisplayWidth, {
          toValue: ww,
          duration: 600,
          useNativeDriver: false,
        }).start();
        Animated.timing(this.state.imgDisplayHeight, {
          toValue: hh,
          duration: 600,
          useNativeDriver: false,
        }).start();
        // }, 1000);
        this.setState({croppedImageUri: null, imagecan: 'none'});
        // })
      } catch (error) {
        console.log('Error caught in this.cropImage:', error);
      }
    }, 100);
    currentzoom++;
  }
  getTextInputValue = val => {
    this.setState({username: val});
    //console.log(this.state.username)
  };
  showUserPost = () => {
    this.setState({imgVisible: 'none', postVisible: 'flex'});
  };
  loadFile(path) {
    this.setState({source: path});
    console.log('img path : ', this.state.source);
  }
  async getCookies(uri, path) {
    console.log(uri);
    CookieManager.get(BASE_URL).then(async res => {
      let jsessionID = res.JSESSIONID;
      let token = res['newauth-token'];
      // console.log('token => ', token);
      this.setState({jsessionID: jsessionID});
      console.log('CookieManager.get => ');
      await this.downloadFile(uri, path, jsessionID, token);
    });
  }
  downloadFile = async (uri, path, jsessionID, token) => {
    var options = {
      Cookie: `JSESSIONID=${jsessionID}; newauth-token=${token};`,
    };
    console.log('cookie:');
    try {
      await RNFS.downloadFile({
        fromUrl: uri,
        toFile: path,
        headers: options,
      }).promise.then(res => {
        console.log('res : ', res);
        resArray.push(res);
        console.log(resArray.length);
        if (resArray.length == 1) {
          this.setState({showLoader: 'none', showView: false, showPic: true});
          console.log('displayed:', this.state.img);
          this.showimagesonoverlay(resImgArray);
        }
        this.loadFile(path);
      });
    } catch (e) {
      console.log(e);
    }
  };
  fade = () => {
    // this.fadeAnimation();
  };
  fadeAnimation = () => {
    Animated.timing(this.state.fadeInOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.fadeInUsernameBox, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  // handleclickauth = (evt) => {
  //     let { imgWidth, imgHeight, authImages, displayImgIndex, zoomCount, sendData, imgSize } = this.state;
  //     let { imagewidth, imageheight, imageseq, imageid } = imgSize[displayImgIndex];
  //     let clickx = parseInt(evt.nativeEvent.locationX)
  //     let clicky = parseInt(evt.nativeEvent.locationY);
  //     let rect = [];
  //     rect = this.state.picDimensions;
  //     console.log(rect)
  //     //var imgelem = imgSize[imagecounter];
  //     // console.log('imagecounter:' + imagecounter)
  //     // console.log('imgszie length:' + imgSize.length)
  //     let x = Math.round((clickx - rect.left) / ((rect.left + rect.width) - rect.left) * imagewidth);
  //     let y = Math.round((clicky - rect.top) / ((rect.top + rect.height) - rect.top) * imageheight);
  //     let mousePos2 = { x, y };
  //     console.log('clickedX:' + x, "clickedY:" + y)
  //     console.log(width, height)
  //     if (width < 600) {
  //         //console.log('currentzoom zoomfurther ' + currentzoom + ' ' + zoomfurther);
  //         if (currentzoom < maxzoom && zoomfurther) {
  //             //var imgcanv = document.getElementById("imgholder");
  //             var xdiv = 0;
  //             var ydiv = 0;
  //             var gridclicked = this.getgridclicked(x, y, imagewidth, imageheight, gridSize);
  //             console.log("zoom count " + currentzoom + " zooming on grid location" + JSON.stringify(gridclicked) + " x, y " + x + ", " + y);
  //             if (currentzoom > 0) {
  //                 xdiv = (collagex + (mousePos2.x) / Math.pow(gridSize, currentzoom)) - impliedx;
  //                 ydiv = (collagey + (mousePos2.y) / Math.pow(gridSize, currentzoom)) - impliedy;
  //                 console.log(currentzoom + " divergences x , y " + xdiv + ", " + ydiv);
  //                 //imgelem=imgSize[imagecounter+1]
  //             }
  //             impliedx = collagex + (mousePos2.x) / Math.pow(gridSize, currentzoom);
  //             impliedy = collagey + (mousePos2.y) / Math.pow(gridSize, currentzoom);
  //             console.log(currentzoom + " impliedx , impliedy " + impliedx + ", " + impliedy);
  //             console.log("collagex , collagey " + collagex + ", " + collagey);
  //             if (currentzoom == 0 || (Math.abs(xdiv) > imagewidth * 0.1 || Math.abs(ydiv) > imageheight * 0.1)) {
  //                 //if (currentzoom == 0)
  //                 console.log('First click... zoom further');
  //                 //else
  //                 console.log('divergence exists... zoom further');
  //                 collagex += (imagewidth * (gridclicked.col - 1) / Math.pow(gridSize, currentzoom + 1));
  //                 collagey += (imageheight * (gridclicked.row - 1) / Math.pow(gridSize, currentzoom + 1));
  //                 console.log("collagex,y:" + collagex, collagey)
  //                 // let imgs=[];
  //                 // let item={x:x,y:y,width:imagewidth,height:imageheight}
  //                 // imgs.push(item)
  //                 //this.cropImagee(gridclicked,)
  //                 // this.split_4(imagewidth,imageheight,2)
  //                 //this.drawGridOverImage( this._inputRef, gridSize);
  //                 // this.zoomimagegrid(gridclicked, imgSize[imagecounter], this._inputRef);
  //                 currentzoom++;
  //                 return;
  //             } else {
  //                 zoomfurther = false;
  //                 //drawGridOverImage( imgcanv, gridSize);
  //                 //zoomimagegrid(gridclicked, imgs[imagecounter],imgcanv);
  //                 //return;
  //             }
  //         }
  //     }
  //     //intervalid = setInterval("DrawCircle()", 100);
  //     // if (debugappui) console.log('after mouse position ' + message2);
  //     if (width < 600) {
  //         console.log('inside other if')
  //         //console.log("collagex,  currentzoom, x, gridSize " + collagex + ", " + currentzoom + "," + x + "," + gridSize);
  //         x = collagex + mousePos2.x / Math.pow(gridSize, currentzoom);
  //         y = collagey + mousePos2.y / Math.pow(gridSize, currentzoom);
  //         console.log(currentzoom + " impliedx , impliedy " + x + ", " + y);
  //         collagex = 0;
  //         collagey = 0;
  //         collageimagesloaded = 0;
  //     }
  //     if (parseInt(x) >= 0 && parseInt(x) <= imagewidth
  //         && parseInt(y) >= 0 && parseInt(y) <= imageheight) {
  //         console.log('inside push data')
  //         var indivresponse = JSON.stringify({
  //             imgID: imgelem.imageid,
  //             delay: 1234,
  //             clickX: parseInt(x),
  //             clickY: parseInt(y),
  //             imgWidth: imagewidth,
  //             imgHeight: imageheight,
  //             imageseq: imageseq
  //         });
  //         responsedata.push(indivresponse);
  //         // if(imagecounter=imgSize.length-1){
  //         //     console.log('sending data')
  //         //     console.log(JSON.stringify(responsedata))
  //         //     imagecounter=0;
  //         //     this.postimageclickdata(JSON.stringify(responsedata))
  //         // }
  //         // else{
  //         //     imagecounter++;
  //         //     //currentzoom=0;
  //         //     this.setState({img:authImages[imagecounter]})
  //         // }
  //         console.log(JSON.stringify({ responsedata }))
  //         // var img=document.getElementsByClassName("auth-image-main");
  //         //   img[imagecounter].style.display='none';
  //         //   var info = document.getElementById("imdata"+imagecounter);
  //         //alert('info is ' + 	info);
  //         // if (info != null) {
  //         //     info.style.display='none';
  //         // }
  //         //if (debugappui) console.log('showing image ' + (imagecounter+1) + ' out of ' + img.length);
  //         //console.log('showing image ' + (imagecounter+1) + ' out of ' + imgs.length);
  //         if (imagecounter < imgSize.length - 1) {
  //             console.log('imagecounter:' + imagecounter)
  //             imagecounter++;
  //             console.log('imagecounter:' + imagecounter)
  //             //img[imagecounter].style.display='block';
  //             //drawimgbyindex(imgs, imagecounter);
  //             //$(".auth-image-main:eq(" + imagecounter + ")").fadeIn(400);
  //             currentzoom = 0;
  //             zoomfurther = true;
  //             // restartTimer();
  //         } else {
  //             //   if (attemptdiv) {
  //             //       //alert('attemptdiv html length' + attemptdiv.innerHTML.length);
  //             //       attemptdiv.classList.remove("animated");
  //             //     attemptdiv.classList.remove("flash");
  //             //       attemptdiv.innerHTML = '';
  //             //   }
  //             //   if (document.getElementById('imgholder') != null) {
  //             //       //alert('clearing imgholder');
  //             //       //$("#imgholder").fadeOut(200);
  //             //       document.getElementById('imgholder').style.display = 'none';
  //             //       cleardiv(document.getElementById('imgholder'));
  //             //   }
  //             //displayauthenticatingicon();
  //             //document.getElementById('authResponseForm').responsedata.value = '['+ responsedata + ']';
  //             //removing because this seems to be failing after refresh
  //             // authimagecontainerdivelem.removeEventListener('click', handleauthimgclickevent , true);
  //             // alert(responsedata);
  //             //document.forms[0].submit();
  //             // console.log('submitting auth form. counter ' + imagecounter + ' length ' + imgSize.length);
  //             //submitFormAjax('/newauth/postAuthClickData', 'authResponseForm');
  //             collageimagesloaded = 0;
  //             currentzoom = 0;
  //             zoomfurther = true;
  //             //document.forms[0].responsedata.value = []; // clear the responsedata field
  //             responsedata = [];
  //             // clear content also.. because it may be used later
  //             //img = [];
  //         }
  //     }
  //     evt.stopPropagation();
  // }
  getMousePos2(imgelem, evt) {
    let clickx = parseInt(evt.nativeEvent.locationX);
    let clicky = parseInt(evt.nativeEvent.locationY);
    let {imgleft, imgtop} = this.state;
    let imgright = imgleft + imgelem.imagewidth;
    let imgbottom = imgtop + imgelem.imageheight;
    return {
      x: Math.round((clickx / (imgright - imgleft)) * imgelem.imagewidth),
      y: Math.round((clicky / (imgbottom - imgtop)) * imgelem.imageheight),
    };
  }
  getgridclicked(x, y, imgwidth, imgheight, gridsize) {
    console.log(x, y, imgwidth, imgheight, gridsize);
    if (gridsize == null) gridsize = 4;
    var gridloc = {};
    gridloc['col'] = parseInt(((x - 1) * gridsize) / imgwidth + 1);
    gridloc['row'] = parseInt(((y - 1) * gridsize) / imgheight + 1);
    gridloc['size'] = gridsize;
    return gridloc;
  }
  zoomimagegrid = (grid, image, can) => {
    var wd = image.imagewidth,
      ht = image.imageheight;
    console.log('wd,ht' + wd, ht);
    var clipsx = parseInt((wd / grid.size) * (grid.col - 1));
    if (clipsx > 2) clipsx = clipsx - 2;
    var clipsy = parseInt((ht / grid.size) * (grid.row - 1));
    if (clipsy > 2) clipsy = clipsy - 2;
    // convert canvas locations into image locations
    clipsx = parseInt(collagex * (image.imagewidth / wd));
    clipsy = parseInt(collagey * (image.imageheight / ht));
    var clipwd = parseInt(image.imagewidth / (grid.size * (currentzoom + 1)));
    var clipht = parseInt(image.imageheight / (grid.size * (currentzoom + 1)));
    var redrawtimer = setTimeout(() => {
      /*var tmpcan = document.createElement("CANVAS");
            tmpcan.width = wd;
            tmpcan.height = ht;
            tmpcan.getContext('2d').putImageData(image, 0, 0);*/
      //console.log("gridcol, gridrow, clipsx, clipsy, clipwd, clipht, wd, ht" + grid.col + "," + grid.row + "," + clipsx + "," + clipsy+ "," + clipwd+ "," + clipht+ "," + wd+ "," +ht);
      console.log(grid, clipsx, clipsy, clipwd, clipht, 15);
      console.log('currentzoom:' + currentzoom);
      this.zoomimagecliponcanvasinsteps(
        image,
        can,
        grid,
        clipsx,
        clipsy,
        clipwd,
        clipht,
        15,
      ); // 5 steps
      //context.clearRect(0,0,wd, ht);
      //context.drawImage(image, clipsx, clipsy, clipwd, clipht, 0,0,wd, ht);
      currentzoom++;
      console.log('currentzoom:' + currentzoom);
      //console.log ("after image draw on new cnvas");
    }, 200);
  };
  async zoomimagecliponcanvasinsteps(
    image,
    can,
    gridclicked,
    clipsx,
    clipsy,
    clipwd,
    clipht,
    steps,
  ) {
    var wd = image.imagewidth,
      ht = image.imageheight;
    for (var s = 0; s < steps; s++) {
      var scl = 1 + (s + 1) / steps;
      //context.scale(scl, scl);
      var canx = 0;
      var cany = 0;
      var canwd = (wd * scl) / 2;
      var canht = (ht * scl) / 2;
      if (gridclicked.col > 1) {
        canx = (wd * (1 - (s + 1) / steps)) / 2;
        //canwd = wd;
      }
      if (gridclicked.row > 1) {
        cany = (ht * (1 - (s + 1) / steps)) / 2;
        //canht = ht;
      }
      console.log(
        'clipsx, clipsy, clipwd, clipht, canx, cany' +
          clipsx +
          ',' +
          clipsy +
          ',' +
          clipwd +
          ',' +
          clipht +
          ',' +
          canx +
          ',' +
          cany,
      );
      //context.drawImage(can, clipsx, clipsy, clipwd, clipht, canx, cany, canwd, canht);
      //this.cropImagee(image)
      this.split_4(wd, ht, 3);
      var date = new Date();
      var tm = date.getTime();
      //console.log('done zooming to scale '+ scl + ' ' + tm);
      //await sleep(parseInt(600/steps));
    }
  }
  drawGridOverImage = (cnvs, gridsize) => {
    console.log('enter');
    if (!(cnvs instanceof Canvas)) {
      console.log('no');
      return;
    }
    if (gridsize == null) gridsize = 4;
    var xslice = gridsize;
    var yslice = gridsize;
    var ctx = cnvs.getContext('2d');
    ctx.strokeStyle = '#dddddd';
    for (var i = 0; i < xslice; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, i * (400 / xslice));
      ctx.lineTo(320, i * (400 / xslice));
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
    for (var j = 0; j < yslice; j++) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(j * (320 / yslice), 0);
      ctx.lineTo(j * (320 / yslice), 400);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
    //alert('after creating grid');
  };
  renderItemModal1 = ({item}) => (
    // <Item title={item}/>
    <View
      style={{
        ...(item.tag === 'conversation'
          ? {backgroundColor: '#f4f4f4'}
          : {backgroundColor: 'lightgray'}),
        height: 50,
        borderTopWidth: 0,
        borderTopColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{height: '100%', flexDirection: 'column'}}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            {
              ...(item.tag === 'conversation'
                ? {color: '#898988'}
                : {color: '#626262'}),
            },
            {fontSize: 15, paddingLeft: 5},
          ]}>
          {item.name.length < 25
            ? `${item.name}`
            : `${item.name.substring(0, 25)}...`}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            {
              ...(item.tag === 'conversation'
                ? {color: '#898988'}
                : {color: '#626262'}),
            },
            {fontSize: 10, paddingLeft: 5},
          ]}>
          {item.phoneNumber}
        </Text>
      </View>
      <CheckBox
        style={{width: 30, height: 30, top: 10, borderWidth: 1}}
        value={!item.checked}
        tintColors={{false: 'black'}}
        boxType="square"
        //   disabled={false}
        onChange={() => {
          item.checked = !item.checked;
          this.forceUpdate();
          this.handleCheckBoxChange(item);
          // if (item.checked === false) {
          //     switchcolorcounter += 1;
          //     this.setState({ changeSwitchColor: true, addMoreContactsToggleSwitch: false })
          // }
          // else if (item.checked === true) {
          //     switchcolorcounter -= 1;
          //     if (switchcolorcounter == 0) {
          //         this.setState({ changeSwitchColor: false, addMoreContactsToggleSwitch: true })
          //     }
          // }
        }}
      />
    </View>
  );
  handleCheckBoxChange = item => {
    if (item.checked === false) {
      switchcolorcounter += 1;
      this.setState({
        changeSwitchColor: true,
        addMoreContactsToggleSwitch: false,
      });
    } else if (item.checked === true) {
      switchcolorcounter -= 1;
      if (switchcolorcounter == 0) {
        this.setState({
          changeSwitchColor: false,
          addMoreContactsToggleSwitch: true,
        });
      }
    }
  };
  renderItemModal2 = ({item}) => (
    // <Item title={item}/>
    <View
      style={{
        height: 50,
        borderTopWidth: 0,
        borderTopColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: item.display,
      }}>
      <View style={{height: '100%', flexDirection: 'column'}}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{color: 'black', fontSize: 15, paddingLeft: 5}}>
          {item.name.length < 25
            ? `${item.name}`
            : `${item.name.substring(0, 25)}...`}
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{color: '#343434', fontSize: 10, paddingLeft: 5}}>
          {item.phoneNumber}
        </Text>
      </View>
      {item.display == 'flex' ? (
        <CheckBox
          style={{
            width: 30,
            height: 30,
            top: 10,
            borderWidth: 1,
            display: item.display,
          }}
          value={item.checked}
          tintColors={{false: item.display == 'none' ? 'blue' : 'black'}}
          boxType="square"
          //   disabled={false}
          onValueChange={() => {
            if (switchingcounter > 0) {
              item.checked = !item.checked;
              this.forceUpdate();
              if (item.checked == true) {
                switchingcounter -= 1;
              } else {
                switchingcounter += 1;
              }
              if (switchingcounter == 0) {
                //   alert('stop here')
                this.setState({
                  showLoader: 'flex',
                  homepage: 'none',
                  manageContactsModal2: false,
                  searchmanagecontact: '',
                });
                // this.state.allRecentContactsArray = JSON.parse(JSON.stringify(this.state.usermanagecontactdata))
                this.switchContactsModal2(this.state.allRecentContactsArray);
                // item.checked = false
              }
            } else {
              // this.setState({manageContactsModal2:false})
              console.log('can not proceed further.');
            }
          }}
          //   style={styles.checkbox}
        />
      ) : null}
    </View>
  );
  renderItemModal3 = ({item}) => (
    // <Item title={item}/>
    <Text
      adjustsFontSizeToFit
      numberOfLines={1}
      style={{color: '#A1a1a1', height: 30, fontSize: 10}}>
      {item.tag === 'conversation' ? 'Conversation' : 'Invite'} from {item.name}
    </Text>
  );
  renderItemModal4 = ({item}) => (
    // <Item title={item}/>
    <View
      style={[
        // {...item.tag==="conversation"?{backgroundColor:'#EFEFEF'}:{backgroundColor:'#EFEFEF'}},
        {height: 20, flexDirection: 'row', justifyContent: 'space-between'},
      ]}>
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            {
              ...(item.tag === 'conversation'
                ? {color: '#898988'}
                : {color: '#626262'}),
            },
            {paddingLeft: 5},
          ]}>
          {item.name.length < 25
            ? `${item.name}`
            : `${item.name.substring(0, 25)}...`}
        </Text>
        <View
          style={{
            width: 16,
            height: 16,
            marginTop: 2,
            backgroundColor: item.color,
            borderRadius: 50,
            marginRight: 10,
          }}></View>
      </View>
    </View>
  );
  renderMiniAppsModal = ({item}) => (
    <View
      style={[
        {
          width: '90%',
          height: 70,
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 15,
        },
      ]}>
      {/* <View style={{height:'100%',justifyContent:'space-between',flexDirection:'row'}}> */}
      <Text
        style={{
          color: 'white',
          backgroundColor: '#4682B4',
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          padding: 3,
          marginRight: 15,
          fontSize: 20,
        }}>
        {item.name.substring(0, 1)}
      </Text>
      <View style={{flexDirection: 'column', width: '80%'}}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{paddingLeft: 0, color: '#787878', fontSize: 17}}>
          {item.name}
        </Text>
        <Text
          numberOfLines={3}
          style={{paddingLeft: 0, color: '#a5a5a5', fontSize: 11}}>
          {item.desc}
        </Text>
      </View>
      <CheckBox
        value={item.ischecked}
        tintColors={{false: 'black'}}
        style={{
          borderRadius: 50,
          padding: 0,
          ...(item.name == 'Stack' ? {opacity: 0} : {}),
        }}
        onValueChange={() => {
          item.ischecked = !item.ischecked;
          if (item.ischecked == true) {
            if (item.name == 'Notes') {
              this.setState({displaynotesapp: 'flex'});
              AsyncStorage.setItem('isnotesappenabled', 'flex');
            } else if (item.name == 'Food mood') {
              this.setState({displayfoodapp: 'flex'});
              AsyncStorage.setItem('isfoodappenabled', 'flex');
            }
          } else if (item.ischecked == false) {
            if (item.name == 'Notes') {
              this.setState({displaynotesapp: 'none'});
              AsyncStorage.setItem('isnotesappenabled', 'none');
            } else if (item.name == 'Food mood') {
              this.setState({displayfoodapp: 'none'});
              AsyncStorage.setItem('isfoodappenabled', 'none');
            }
          }
          this.setState({updateUIState: false});
        }}
      />
      {/* </View> */}
    </View>
  );
  renderSiteDetails = ({item, index}) => (
    <View style={{marginTop: 5, zIndex: 4}}>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={{color: 'gray', alignItems: 'center', left: '5%', top: 0}}>
        {item.siteuser}
      </Text>
      <TouchableOpacity
        onPress={() => Clipboard.setString(item.sitepwd)}
        style={{width: 20, height: 20, position: 'absolute', left: '70%'}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../Screens/copyicon.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => this.showPasswordDialog(index)}
        style={{width: 20, height: 20, position: 'absolute', left: '85%'}}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../Screens/eye.png')}
        />
      </TouchableOpacity>
      <Animated.Text
        style={{
          color: 'gray',
          opacity: item.showpassword,
          alignItems: 'center',
          backgroundColor: 'white',
          textAlignVertical: 'center',
          width: '60%',
          left: '60%',
        }}>
        {item.sitepwd}
      </Animated.Text>
    </View>
  );
  removingNotificationDialog = () => {
    this.setState({notificationDialogModal: false});
    this.forceUpdate();
    // setTimeout(() => {
    //     this.state.filteredContactData.forEach((element) => {
    //         if (element.tag === "contact") {
    //             Animated.timing(element.opacity, {
    //                 toValue: 0.3,
    //                 duration: 1000,
    //                 useNativeDriver: false,
    //             }).start();
    //             element.color = "gray"
    //         }
    //     });
    // }, 1000);
    // setTimeout(() => {
    //     this.state.filteredContactData.forEach((element) => {
    //         element.color = "gray"
    //      });
    // }, 2000);
    // setTimeout(() => {
    //     this.state.filteredContactData.forEach((element) => {
    //         Animated.timing(element.opacity, {
    //             toValue: 1,
    //             duration: 2000,
    //             useNativeDriver: false,
    //         }).start();
    //     });
    // }, 3000);
  };
  pressingIn = () => {
    // setTimeout(() => {
    this.state.filteredContactData.forEach((element, index) => {
      // Animated.timing(element.opacity, {
      //     toValue: 0.3,
      //     duration: 1000,
      //     useNativeDriver: false,
      // }).start();
      element.color = dotColors[index];
      this.forceUpdate();
    });
    // }, 1000);
    // setTimeout(() => {
    //     this.state.filteredContactData.forEach((element) => {
    //         Animated.timing(element.opacity, {
    //             toValue: 1,
    //             duration: 2000,
    //             useNativeDriver: false,
    //         }).start();
    //     });
    // }, 3000);
  };
  pressingOut = () => {
    setTimeout(() => {
      this.state.filteredContactData.forEach((element, index) => {
        if (element.convid != undefined) {
          console.log(element.name, element.color);
          let tmpIndex = this.state.tempMsgArr.findIndex(
            object => object.key === element.convid,
          );
          if (
            pendingmessagesnotificationarray.map(e => e.index).indexOf(index) !=
            -1
          ) {
            element.color = this.state.dotColorLocation[index].col;
            // console.log("2")
            this.forceUpdate();
          } else if (tmpIndex != -1) {
            if (this.state.tempMsgArr[tmpIndex].data.length == 0) {
              element.color = 'gray';
              // console.log("1")
              this.forceUpdate();
            }
          } else {
            element.color = 'gray';
            this.forceUpdate();
          }
        } else if (element.tag == 'invitation') {
        } else {
          element.color = 'gray';
          this.forceUpdate();
        }
        // console.log(element.name,element.color)
      });
      // setTimeout(() => {
      //     this.state.filteredContactData.forEach((element) => {
      //         // element.color = "gray"
      //         Animated.timing(element.opacity, {
      //             toValue: 1,
      //             duration: 1000,
      //             useNativeDriver: false,
      //         }).start();
      //     });
      // }, 1500);
    }, 2000);
  };
  deleteAllInvites = async list => {
    if (list.length > 0) {
      this.setState({removingContactsView: 'flex'});
      for (const prop of list) {
        await this.denyInvite(prop);
      }
    } else {
      return new Promise(resolve => {
        resolve(console.log(`invite null`));
      });
    }
  };
  removeContactsModal1 = async contactarray => {
    let convarr = [];
    let invtarr = [];
    contactsToRemove = [];
    contactsToAdd = [];
    try {
      if (this.state.addMoreContactsToggleSwitch == true) {
        switchingcounter =
          this.state.CanAddContacts - this.state.AlreadyAddedContacts;
        // switchingcounter = 20;
        console.log('please either switch or add more contacts at one time.');
      } else {
        switchingcounter = 0;
        console.log(contactarray);
        console.log('switch counter0:', switchingcounter);
        for (let i = 0; i < contactarray.length; i++) {
          if (
            contactarray[i].checked == false &&
            contactarray[i].tag == 'contact'
          ) {
            contactsToRemove.push(i);
            switchingcounter += 1;
          } else if (
            contactarray[i].checked == false &&
            contactarray[i].tag == 'conversation'
          ) {
            convarr.push(contactarray[i].convid);
            dltvals.push(contactarray[i]);
            this.state.filteredContactData.splice(i, 1);
            // arr.splice(i, 1);
            // this.setState({removingContactsView:true})
            switchcolorcounter -= 1;
            if (switchcolorcounter == 0) {
              this.setState({changeSwitchColor: false});
            }
            //    this.deleteUserFromGraph(contactarray[i].convid,confusername)
            //    this.state.filteredContactData.splice(i,1);
            //    arr.splice(i,1);
            //    this.setState({updateUIState:false})
          } else if (
            contactarray[i].checked == false &&
            contactarray[i].tag == 'invitation'
          ) {
            invtarr.push(contactarray[i].relId);
            dltvals.push(contactarray[i]);
            this.state.filteredContactData.splice(i, 1);
            // arr.splice(i, 1);
            // this.setState({removingContactsView:true})
            switchcolorcounter -= 1;
            if (switchcolorcounter == 0) {
              this.setState({changeSwitchColor: false});
            }
            // this.denyInvite(contactarray[i].relId)
          }
        }
        console.log(
          'switch counter1:',
          switchingcounter,
          contactsToRemove,
          this.state.addMoreContactsToggleSwitch,
        );
        //   if(switchingcounter>0){
        await this.deleteAllInvites(invtarr);
        await this.deleteUserFromGraph(convarr, confusername, dltvals);
      }
      setTimeout(() => {
        this.setState({removingContactsView: 'none'});
        console.log('changing modal');
        dltvals = [];
        convarr = [];
        invtarr = [];
        // if(switchingcounter>0){
        // if(this.state.addMoreContactsToggleSwitch == true){
        //     switchingcounter+=20;
        // }
        console.log('changing modal');
        if (switchingcounter > 0) {
          this.setState({
            manageContactsModal1: false,
            manageContactsModal2: true,
          });
          this.loadContactsOnManageContactsScreen();
          // this.setState({ addMoreContactsToggleSwitch: true })
        } else {
          this.setState({manageContactsModal1: false});
          this.setState({addMoreContactsToggleSwitch: true});
        }
        // }
      }, 500);
      //   }
      //   else{
      //     //   alert('please select contacts to remove.')
      //   }
    } catch (e) {
      console.log('removecontacts error:', e);
    }
  };
  switchContactsModal2 = async contactarray => {
    var newlen = 0,
      prelen = 0;
    console.log('inside method');
    try {
      if (this.state.addMoreContactsToggleSwitch == true) {
        prelen = this.state.filteredContactData.length;
        newlen = this.state.filteredContactData.length;
        newlen = await this.selectMoreContactsToRecents(contactarray);
      } else {
        for (let i = 0; i < contactarray.length; i++) {
          if (contactarray[i].checked == true) {
            contactsToAdd.push(i);
          }
        }
        console.log('switch counter2:', switchingcounter, contactsToAdd);
        for (let j = 0; j < contactsToRemove.length; j++) {
          let remove = contactsToRemove[j];
          let add = contactsToAdd[j];
          let temp = this.state.filteredContactData[remove];
          this.state.filteredContactData[remove] =
            this.state.allRecentContactsArray[add];
          this.state.filteredContactData[remove].checked = true;
          this.state.filteredContactData[remove].scale = new Animated.Value(1);
          this.state.allRecentContactsArray[add] = temp;
          this.state.allRecentContactsArray[add].checked = false;
          console.log(this.state.filteredContactData[remove]);
          try {
          } catch (e) {
            console.log(e);
          }
        }
        // console.log("contacts switched", arr[7])
        this.state.allRecentContactsArray.forEach(elm => {
          elm.display = 'flex';
        });
        this.setState({addMoreContactsToggleSwitch: true});
        this.setState({updateUIState: false});
      }
      setTimeout(async () => {
        let updatedList = [];
        this.setState({
          manageContactsModal2: false,
          manageContactsModal1: false,
          showLoader: 'none',
          homepage: 'flex',
        });
        // this.state.filteredContactData.forEach((elmnt) => {
        //     if (elmnt.tag === "contact") {
        //         updatedList.push(elmnt)
        //     }
        // })
        await AsyncStorage.setItem(
          'updatedContactList',
          JSON.stringify(this.state.filteredContactData),
        );
        await AsyncStorage.setItem(
          'availabledots',
          JSON.stringify(
            this.state.CanAddContacts - this.state.AlreadyAddedContacts,
          ),
        );
        //add code to animate contacts
        for (let j = 0; j < contactsToRemove.length; j++) {
          console.log(
            'remove:',
            contactsToRemove,
            contactsToRemove[j],
            this.state.filteredContactData[contactsToRemove[j]],
          );
          Animated.timing(
            this.state.filteredContactData[contactsToRemove[j]].scale,
            {
              toValue: 2,
              duration: 500,
              useNativeDriver: false,
            },
          ).start();
          setTimeout(async () => {
            Animated.timing(
              this.state.filteredContactData[contactsToRemove[j]].scale,
              {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
              },
            ).start();
            if (j == contactsToRemove.length - 1) {
              setTimeout(() => {
                // contactsToRemove = [];
              }, 2000);
            }
          }, 500);
        }
        if (newlen > prelen) {
          for (let j = prelen; j < newlen; j++) {
            Animated.timing(this.state.filteredContactData[j].scale, {
              toValue: 2,
              duration: 500,
              useNativeDriver: false,
            }).start();
            setTimeout(async () => {
              Animated.timing(this.state.filteredContactData[j].scale, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
              }).start(() => {
                if (j == newlen - 1) {
                  (prelen = 0), (newlen = 0);
                }
              });
            }, 500);
          }
        }
        switchcolorcounter = 0;
        if (switchcolorcounter == 0) {
          this.setState({changeSwitchColor: false});
        }
        contactsToAdd = [];
        // contactsToRemove = [];
        console.log(
          'contacts switched.',
          this.state.filteredContactData.length,
        );
      }, 1500);
    } catch (e) {
      console.log('switchcontacts error:', e);
    }
  };
  SearchManageContactsFilter = text => {
    console.log(text, this.state.searchmanagecontact, typeof text);
    if (copymanagearray == true) {
      this.state.usermanagecontactdata = JSON.parse(
        JSON.stringify(this.state.allRecentContactsArray),
      );
      console.log(
        'copying array',
        text,
        this.state.searchmanagecontact,
        this.state.allRecentContactsArray.length,
        this.state.usermanagecontactdata.length,
      );
      copymanagearray = false;
    }
    try {
      var cropedarray = [];
      if (text) {
        const newData = this.state.usermanagecontactdata.filter(function (
          item,
        ) {
          //    console.log("item:",item)
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const itemDataNew = item.phoneNumber ? item.phoneNumber : '';
          const textData = text.toUpperCase();
          if (itemData.indexOf(textData) > -1) {
            // return itemData.indexOf(textData) > -1
            item.display = 'flex';
            return item;
          } else if (itemDataNew.indexOf(textData) > -1) {
            // return itemDataNew.indexOf(textData) > -1
            item.display = 'flex';
            return item;
          } else {
            item.display = 'none';
            return item;
          }
        });
        this.setState({
          allRecentContactsArray: newData,
          searchmanagecontact: text,
        });
        this.forceUpdate();
        console.log(
          this.state.allRecentContactsArray.length,
          this.state.usermanagecontactdata.length,
        );
      } else {
        console.log('inside else');
        console.log(
          this.state.allRecentContactsArray.length,
          this.state.usermanagecontactdata.length,
        );
        copymanagearray = true;
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        this.setState({
          allRecentContactsArray: this.state.usermanagecontactdata,
          searchmanagecontact: text,
        });
        this.state.allRecentContactsArray.forEach(elm => {
          elm.display = 'flex';
        });
        this.forceUpdate();
      }
    } catch (e) {
      console.log(e);
    }
  };
  selectMoreContactsToRecents = async contactarray => {
    console.log('contactarray:', contactarray.length);
    try {
      for (let i = 0; i < contactarray.length; ) {
        // console.log("checked:", contactarray[i].checked, i, contactarray[i].name)
        if (contactarray[i].checked == true) {
          this.state.filteredContactData.push(contactarray[i]);
          let index = this.state.filteredContactData.length - 1;
          this.state.AlreadyAddedContacts = this.state.AlreadyAddedContacts + 1;
          this.state.allRecentContactsArray.splice(i, 1);
          console.log(
            'fcd,allrcnt:',
            this.state.filteredContactData.length,
            this.state.allRecentContactsArray.length,
          );
          this.state.dataDrag.push('');
          this.pan = this.state.dataDrag.map(() => new Animated.ValueXY());
          i = i;
        } else {
          i++;
        }
      }
      let startIndex = this.state.dotColorLocation.length;
      console.log(
        'fcd,startindex:',
        this.state.filteredContactData.length,
        startIndex,
      );
      //    await this.getlocation(this.state.filteredContactData,startIndex);
      let centerdotsize = (screenwidth * 60) / 100; //150;
      // Minimum radius
      let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
      this.state.dotColorLocation = await this.displayRadialText(
        this.state.filteredContactData,
        'contacts',
        centerdotsize,
        true,
        'large',
      );
      this.forceUpdate();
      for (let i = 0; i < this.state.filteredContactData.length; i++) {
        this.state.filteredContactData[i].color = JSON.parse(
          JSON.stringify(this.state.dotColorLocation[i].col),
        );
        dotColors[i] = JSON.parse(
          JSON.stringify(this.state.dotColorLocation[i].col),
        );
        if (this.state.dotColorLocation.length > 3) {
          await this.increasedotsize(
            Number.parseInt(
              JSON.stringify(this.state.dotColorLocation[i].width),
            ),
            i,
            this.state.dotColorLocation.length,
            this.state.dotColorLocation,
          );
        }
      }
      return this.state.filteredContactData.length;
      //   setTimeout(async() => {
      //            let updatedList = [];
      //         this.setState({manageContactsModal1:true,showLoader:'none',homepage:'flex'})
      //         switchcolorcounter=0;
      //                 if(switchcolorcounter==0){
      //                     this.setState({changeSwitchColor:false})
      //                 }
      //        await this.state.filteredContactData.forEach((elmnt)=>{
      //             if(elmnt.tag==="contact"){
      //                 updatedList.push(elmnt)
      //             }
      //         })
      //        }, 1500);
    } catch (e) {
      console.log('addcontacts error:', e);
    }
  };
  SlideMiniAppsBack = () => {
    this.setState({showDelete: 'none', FoodAppCount: 0, NoteAppCount: 0});
    if (this.state.searchcontact == '') {
      this.setState({showSearchBar: 'none'});
    }
    Animated.timing(this.state.noteappleft, {
      toValue: (screenwidth * 93) / 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.noteappwidth, {
      toValue: (screenheight * 7) / 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    this.setState({noteapptitle: 'N'});
    Animated.timing(this.state.foodappleft, {
      toValue: (screenwidth * 93) / 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.foodappwidth, {
      toValue: (screenheight * 7) / 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    this.setState({foodapptitle: 'F'});
  };
  AnimateNewAddedApps = async () => {
    this.setState({miniAppsModal: false});
    Animated.timing(this.state.noteappleft, {
      toValue: (screenwidth * 65) / 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.noteappwidth, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
    this.setState({noteapptitle: 'Notes'});
    Animated.timing(this.state.foodappleft, {
      toValue: (screenwidth * 65) / 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(this.state.foodappwidth, {
      toValue: 200,
      duration: 500,
      useNativeDriver: false,
    }).start();
    this.setState({foodapptitle: 'Food mood'});
    setTimeout(() => {
      Animated.timing(this.state.noteappleft, {
        toValue: (screenwidth * 93) / 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(this.state.noteappwidth, {
        toValue: (screenheight * 7) / 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
      this.setState({noteapptitle: 'N'});
      Animated.timing(this.state.foodappleft, {
        toValue: (screenwidth * 93) / 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(this.state.foodappwidth, {
        toValue: (screenheight * 7) / 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
      this.setState({foodapptitle: 'F'});
    }, 500);
  };
  AnimateMiniAppView = async app => {
    if (app == 'notes') {
      this.state.NotesAppData = [];
      NotesAppMappedData = [];
      this.setState({NoteDetails: ''});
      this.state.NoteAppCount += 1;
      if (this.state.NoteAppCount == 1) {
        Animated.timing(this.state.noteappleft, {
          toValue: (screenwidth * 65) / 100,
          duration: 500,
          useNativeDriver: false,
        }).start();
        Animated.timing(this.state.noteappwidth, {
          toValue: 200,
          duration: 500,
          useNativeDriver: false,
        }).start();
        this.setState({noteapptitle: 'Notes'});
      } else if (this.state.NoteAppCount == 2) {
        this.state.NoteAppCount = 0;
        setTimeout(async () => {
          this.setState({NotesAppScreen: true, showView: false});
          let path;
          if (Platform.OS == 'ios') {
            path = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/notes/';
          } else {
            path = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/notes/';
          }
          try {
            let isNotes = await RNFetchBlob.fs.isDir(path);
            if (isNotes == true) {
              let isFile = await RNFetchBlob.fs
                .ls(path)
                .then(async files => {
                  console.log(files.length);
                  if (files.length > 0) {
                    for (let i = 0; i < files.length; ) {
                      await RNFetchBlob.fs
                        .readFile(path + '/' + files[i], 'utf8')
                        .then(async data => {
                          console.log('notes:', data);
                          let notesdata = JSON.parse(data);
                          let noteexpired = await this.isNotesExpired(
                            notesdata.savingdate,
                            JSON.parse(notesdata.expiretime),
                          );
                          if (noteexpired[0] == 'expired') {
                            console.log('deleting expired notes');
                            await RNFetchBlob.fs.unlink(path + '/' + files[i]);
                            files.splice(i, 1);
                            i = i;
                          } else {
                            if (noteexpired[0] == 'expiring') {
                              notesdata.opacity = 0.7;
                            }
                            this.state.dataDragNote.push('');
                            this.pannote = this.state.dataDragNote.map(
                              () => new Animated.ValueXY(),
                            );
                            this.state.NotesAppData.push(notesdata);
                            NotesAppMappedData.push(
                              <TouchableWithoutFeedback
                                onLongPress={() =>
                                  this.setState({showDeleteNote: 'flex'})
                                }
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}
                                ref={rf => (this._refNotes = rf)}
                                key={NotesAppMappedData.length}>
                                <Text
                                  numberOfLines={1}
                                  adjustsFontSizeToFit
                                  key={NotesAppMappedData.length}
                                  style={{
                                    ...Platform.select({
                                      ios: {lineHeight: 25},
                                      android: {},
                                    }),
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    color: '#EFEFEF',
                                    opacity: 0.5,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                  }}>
                                  {this.state.NotesAppData[
                                    NotesAppMappedData.length
                                  ].note.substring(0, 1)}
                                </Text>
                              </TouchableWithoutFeedback>,
                            );
                            i++;
                          }
                          console.log(this.state.NotesAppData);
                        });
                      if (i === files.length) {
                        console.log('calling locations:', i);
                        await this.getNotesLocations(
                          this.state.NotesAppData,
                          0,
                        );
                        this.setState({updateUIState: false});
                      }
                    }
                  } else {
                    console.log('no previous notes file exist.');
                  }
                  return files.length;
                })
                .catch(error => console.log(error));
              console.log('isFile:', isFile);
            }
          } catch (e) {
            console.log('startpeerchaterror:', e);
          }
          Animated.timing(this.state.noteappleft, {
            toValue: (screenwidth * 93) / 100,
            duration: 500,
            useNativeDriver: false,
          }).start();
          Animated.timing(this.state.noteappwidth, {
            toValue: (screenheight * 7) / 100,
            duration: 500,
            useNativeDriver: false,
          }).start();
          this.setState({noteapptitle: 'N'});
        }, 500);
      }
    } else if (app == 'food') {
      this.state.FoodsAppData = [];
      FoodsAppMappedData = [];
      this.setState({FoodDetails: ''});
      this.state.FoodAppCount += 1;
      if (this.state.FoodAppCount == 1) {
        Animated.timing(this.state.foodappleft, {
          toValue: (screenwidth * 65) / 100,
          duration: 500,
          useNativeDriver: false,
        }).start();
        Animated.timing(this.state.foodappwidth, {
          toValue: 200,
          duration: 500,
          useNativeDriver: false,
        }).start();
        this.setState({foodapptitle: 'Food mood'});
      } else if (this.state.FoodAppCount == 2) {
        this.state.FoodAppCount = 0;
        setTimeout(async () => {
          this.setState({FoodsAppScreen: true, showView: false});
          let path;
          if (Platform.OS == 'ios') {
            path = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/foods/';
          } else {
            path = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/foods/';
          }
          try {
            let isFoods = await RNFetchBlob.fs.isDir(path);
            if (isFoods == true) {
              let isFile = await RNFetchBlob.fs
                .ls(path)
                .then(async files => {
                  console.log(files.length);
                  if (files.length > 0) {
                    for (let i = 0; i < files.length; ) {
                      await RNFetchBlob.fs
                        .readFile(path + '/' + files[i], 'utf8')
                        .then(async data => {
                          //    console.log("foods:",data);
                          let foodsdata = JSON.parse(data);
                          let foodexpired = this.isNotesExpired(
                            foodsdata.savingdate,
                            50000,
                          );
                          if (foodexpired[0] == 'expired') {
                            await RNFetchBlob.fs.unlink(path + '/' + files[i]);
                            files.splice(i, 1);
                            i = i;
                          } else {
                            if (foodexpired[0] == 'expiring') {
                              foodsdata.opacity = 0.7;
                            }
                            // this.state.dataDragNote.push("");
                            // this.pannote = this.state.dataDragNote.map(() => new Animated.ValueXY());
                            this.state.FoodsAppData.push(foodsdata);
                            FoodsAppMappedData.push(
                              <TouchableWithoutFeedback
                                style={{
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  height: '100%',
                                  width: '100%',
                                }}
                                ref={rf => (this._refFoods = rf)}
                                key={FoodsAppMappedData.length}>
                                <Text
                                  numberOfLines={1}
                                  adjustsFontSizeToFit
                                  key={FoodsAppMappedData.length}
                                  style={{
                                    ...Platform.select({
                                      ios: {lineHeight: 25},
                                      android: {},
                                    }),
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    color: '#EFEFEF',
                                    opacity: 0.5,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                  }}>
                                  {this.state.FoodsAppData[
                                    FoodsAppMappedData.length
                                  ].food.substring(0, 1)}
                                </Text>
                              </TouchableWithoutFeedback>,
                            );
                            i++;
                          }
                          //    console.log("base64:",this.state.FoodsAppData[i]gth)
                        });
                      if (i === files.length) {
                        console.log('calling locations:', i);
                        //    await  RNFetchBlob.fs.writeFile(RNFetchBlob.fs.dirs.DownloadDir+'/foodfile.txt', JSON.stringify(this.state.FoodsAppData), 'utf8');
                        await this.getFoodsLocations(
                          this.state.FoodsAppData,
                          0,
                        );
                        this.setState({updateUIState: false});
                      }
                    }
                  } else {
                    console.log('no previous notes file exist.');
                  }
                  return files.length;
                })
                .catch(error => console.log(error));
              console.log('isFile:', isFile);
            }
          } catch (e) {
            console.log('startpeerchaterror:', e);
          }
          Animated.timing(this.state.foodappleft, {
            toValue: (screenwidth * 93) / 100,
            duration: 500,
            useNativeDriver: false,
          }).start();
          Animated.timing(this.state.foodappwidth, {
            toValue: (screenheight * 7) / 100,
            duration: 500,
            useNativeDriver: false,
          }).start();
          this.setState({foodapptitle: 'F'});
        }, 500);
      }
    }
  };
  AnimateNotesView = async i => {
    if (this.state.NotesAppData[i].expiretime == '50000') {
      this.setState({NoteExpiringIn: 'Never Expires'});
    } else {
      let daysdiff = await this.isNotesExpired(
        this.state.NotesAppData[i].savingdate,
        JSON.parse(this.state.NotesAppData[i].expiretime),
      );
      console.log('pressed note:', daysdiff);
      this.setState({
        NoteExpiringIn: `Expiring in ${parseInt(daysdiff[1])} days`,
      });
    }
    let topp = Number.parseInt(
      JSON.stringify(this.state.NotesDotsLocations[i].zpc),
    );
    console.log(topp, screenheight);
    if (topp + 180 > screenheight) {
      let x = topp + 180 - screenheight;
      console.log('if', x, topp - x);
      this.setState({NoteDotTop: topp - x});
    } else {
      console.log('else');
      this.setState({NoteDotTop: topp + 40});
    }
    this.setState({
      NoteDotLeft: Number.parseInt(
        JSON.stringify(this.state.NotesDotsLocations[i].ypc),
      ),
      // NoteDotTop: Number.parseInt(JSON.stringify(this.state.NotesDotsLocations[i].zpc)),
      NoteDetails: this.state.NotesAppData[i].note,
      NoteDetailModal: true,
    });
  };
  AnimateFoodsView = async i => {
    this.setState({
      FoodDotLeft: Number.parseInt(
        JSON.stringify(this.state.FoodsDotsLocations[i].ypc),
      ),
      FoodDetails: this.state.FoodsAppData[i].food,
      FoodDetailModal: true,
      FoodDetailsAvgScore: this.state.FoodsAppData[i].avgscore,
      FoodDetailsImage: this.state.FoodsAppData[i].foodimage,
      AddFeelingIndex: i,
    });
    let topp = Number.parseInt(
      JSON.stringify(this.state.FoodsDotsLocations[i].zpc),
    );
    console.log(topp, screenheight);
    if (topp + 200 > screenheight) {
      let x = topp + 250 - screenheight;
      console.log('if', x, topp - x);
      this.setState({FoodDotTop: topp - x});
    } else {
      console.log('else');
      this.setState({FoodDotTop: topp + 30});
    }
    // console.log(this.state.FoodDetailsImage,this.state.FoodsAppData[i].foodimage.length)
  };
  SaveNotesOnDevice = async text => {
    if (text.length > 0) {
      const {config, fs} = RNFetchBlob;
      let chatFolder;
      if (Platform.OS === 'ios') {
        chatFolder = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/notes/';
      } else {
        chatFolder = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/notes/';
      }
      var ispermission = false;
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ispermission = true;
            console.log('storage permission granted');
          } else {
            ispermission = true;
          }
        } else if (Platform.OS === 'ios') {
          ispermission = true;
        }
        if (ispermission == true) {
          let isChat = await RNFetchBlob.fs.isDir(chatFolder);
          console.log('folder exist:', isChat, chatFolder);
          if (isChat == false) {
            RNFetchBlob.fs.mkdir(chatFolder).catch(e => console.log('er:', e));
          }
          let noOfFiles = this.state.NotesAppData.length + 1; //await fs.ls(chatFolder).then(res => { return res }).catch(e => console.log(e));
          console.log('no of notes files:', noOfFiles);
          //      if (noOfFiles.length > 0) {
          //          let fileNumbering =parseInt(noOfFiles[noOfFiles.length-1])
          //          let dirs = chatFolder + fileNumbering
          //         fs.readFile(dirs, 'utf8').then(async(data) => {
          //        let fileData = data
          //       if (fileData.length < 100) {
          //         console.log("inside if",dirs)
          //         if(text.length>100){
          //             console.log("inside if",dirs)
          //             await  fs.writeFile(dirs, text, 'utf8');
          //             // text.splice(0,100);
          //             let newdir = chatFolder +  (fileNumbering + 1)
          //             await  fs.writeFile(newdir, text, 'utf8');
          //          }
          //          else{
          //             console.log("inside else",dirs)
          //             await  fs.writeFile(dirs, text, 'utf8');
          //          }
          //        }
          //     else {
          //         let dirs = chatFolder + (fileNumbering + 1)
          //       await  fs.writeFile(dirs, text, 'utf8');
          //     }
          // });
          //       }
          //        else if (noOfFiles.length == 0) {
          //         console.log("inside else")
          let dirs = chatFolder + new Date().getTime().toString();
          let noteobj = {
            note: text,
            expiretime: this.state.ExpireNotesValue,
            savingdate: new Date(),
            display: 'flex',
            opacity: 1,
          };
          //    console.log("inside else:",dirs)
          await fs.writeFile(dirs, JSON.stringify(noteobj), 'utf8');
          // }
          this.state.dataDragNote.push('');
          this.pannote = this.state.dataDragNote.map(
            () => new Animated.ValueXY(),
          );
          this.state.NotesAppData.push(noteobj);
          await this.getNotesLocations(
            this.state.NotesAppData,
            this.state.NotesAppData.length - 1,
          );
          NotesAppMappedData.push(
            <TouchableWithoutFeedback
              onLongPress={() => this.setState({showDeleteNote: 'flex'})}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
              }}
              ref={rf => (this._refNotes = rf)}
              key={NotesAppMappedData.length}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                key={NotesAppMappedData.length}
                style={{
                  ...Platform.select({ios: {lineHeight: 25}, android: {}}),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  color: '#EFEFEF',
                  opacity: 0.5,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                {this.state.NotesAppData[
                  NotesAppMappedData.length
                ].note.substring(0, 1)}
              </Text>
            </TouchableWithoutFeedback>,
          );
          this.setState({DisplayAddNoteDialog: 'none'});
          this.setState({UserNotes: ''});
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  getNotesLocations = async (indata, startIndex) => {
    console.log('inside getnoteslocations:', indata.length, startIndex);
    // {note:text,expiretime:this.state.ExpireNotesValue}
    // for (let i = startIndex; i < indata.length; i++) {
    //     let data1 = this.state.NotesAppData[i].note;
    //     let data2 = this.state.NotesAppData[i].expiretime;
    //     this.state.NotesDotsLocations[i] =  this.getcolorandlocationbasedondata(data1, data2,i,this.state.NotesAppData.length);
    // }
    let centerdotsize = 100; //150;
    // Minimum radius
    let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
    //  this.state.NotesDotsLocations = await this.displayRadialText(indata,"notes",minRadius, true);
    await this.SortNotesBasedOnDate(this.state.NotesAppData);
    //   for(let i=0;i<this.state.NotesAppData.length;i++){
    //     this.state.filteredContactData[i].color = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
    //     dotColors[i] = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
    // this.increasedotsize(Number.parseInt(JSON.stringify(this.state.NotesDotsLocations[i].width)),i,this.state.NotesDotsLocations.length,this.state.NotesDotsLocations);
    //   }
  };
  SortNotesBasedOnDate = async notes => {
    try {
      if (notes.length > 3) {
        for (let i = 0; i < notes.length; i++) {
          let daysdiff = await this.isNotesExpired(
            notes[i].savingdate,
            JSON.parse(notes[i].expiretime),
          );
          notes[i].daysdiff = daysdiff[1];
          console.log(daysdiff, notes[i]);
        }
        let sortedarray = await notes.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          if (b.daysdiff > a.daysdiff) {
            return a.daysdiff - b.daysdiff;
          } else if (b.daysdiff < a.daysdiff) {
            return a.daysdiff - b.daysdiff;
          }
          // else if(b.daysdiff == b.daysdiff){
          //   return new Date(b.time) - new Date(a.time);
          //   // return b.id - a.id;
          // }
          else {
            return a.daysdiff - b.daysdiff;
          }
        });
        this.setState({updateUIState: false});
        console.log('sorted notes:', this.state.NotesAppData);
        let centerdotsize = 100; //150;
        // Minimum radius
        let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
        this.state.NotesDotsLocations = await this.displayRadialText(
          sortedarray,
          'notes',
          centerdotsize,
          true,
          'small',
        );
        for (let i = 0; i < notes.length; i++) {
          await this.increasenotessize(
            Number.parseInt(
              JSON.stringify(this.state.NotesDotsLocations[i].width),
            ),
            i,
            this.state.NotesAppData,
            this.state.NotesDotsLocations,
          );
        }
        this.setState({updateUIState: false});
      } else {
        let centerdotsize = 100; //150;
        // Minimum radius
        let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
        this.state.NotesDotsLocations = await this.displayRadialText(
          notes,
          'notes',
          centerdotsize,
          true,
          'small',
        );
        this.setState({updateUIState: false});
      }
    } catch (e) {
      console.log('sortnotesexception:', e);
    }
  };
  async increasenotessize(size, index, notes, array) {
    // console.log(parseInt(length*20/100),parseInt(length*30/100),parseInt(length*50/100))
    let prcnt = (notes.length * 10) / 100;
    if (notes[index].expiretime == '7') {
      //index < parseInt(prcnt * 2)
      console.log('top 20:', index, prcnt * 2);
      array[index].width = new Animated.Value(size * 2);
      array[index].height = new Animated.Value(size * 2);
    } else if (notes[index].expiretime == '30') {
      //parseInt(prcnt * 2) <= index && index < parseInt(prcnt * 7)
      // array[index].width = new Animated.Value(size * 1.618)
      // array[index].height = new Animated.Value(size * 1.618)
      console.log('top 50:', index, prcnt * 5);
    } else {
      array[index].width = new Animated.Value(size * 1.618);
      array[index].height = new Animated.Value(size * 1.618);
      console.log('bottom 50:', index);
    }
    this.setState({updateUIState: false});
  }
  isNotesExpired = async (savedtime, days) => {
    const currenttime = new Date();
    console.log(savedtime, currenttime);
    let flakecreattime = new Date(savedtime);
    flakecreattime.setHours(flakecreattime.getHours());
    const diffInMs = Math.abs(currenttime - flakecreattime) / 6e4;
    console.log('diff:', parseInt(diffInMs / 60), diffInMs);
    console.log('diff:', diffInMs / 60 / 24);
    if (diffInMs / 60 / 24 > days) {
      console.log('note expired');
      return ['expired', days - diffInMs / 60 / 24];
    } else if (diffInMs / 60 / 24 > days - 1) {
      console.log('note expiring');
      return ['expiring', days - diffInMs / 60 / 24];
    } else {
      console.log('note not expired');
      return ['active', days - diffInMs / 60 / 24];
    }
  };
  SaveFoodsOnDevice = async text => {
    if (text.length > 0 || this.state.UserFoodImage != null) {
      const {config, fs} = RNFetchBlob;
      let chatFolder;
      if (Platform.OS === 'ios') {
        chatFolder = RNFetchBlob.fs.dirs.DocumentDir + '/Newauth/foods/';
      } else {
        chatFolder = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/foods/';
      }
      var ispermission = false;
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ispermission = true;
            console.log('storage permission granted');
          } else {
            ispermission = true;
          }
        } else if (Platform.OS === 'ios') {
          ispermission = true;
        }
        if (ispermission == true) {
          let isChat = await RNFetchBlob.fs.isDir(chatFolder);
          console.log('folder exist:', isChat, chatFolder, Platform.OS);
          if (isChat == false) {
            RNFetchBlob.fs.mkdir(chatFolder).catch(e => console.log('er:', e));
          }
          let noOfFiles = this.state.FoodsAppData.length + 1; //await fs.ls(chatFolder).then(res => { return res }).catch(e => console.log(e));
          console.log('no of notes files:', noOfFiles);
          let dirs = chatFolder + new Date().getTime().toString();
          let foodobj = {
            food: text,
            foodimage: this.state.UserFoodImage,
            feelings: [],
            savingdate: new Date(),
            display: 'flex',
            opacity: 1,
          };
          //    console.log("inside else:",dirs)
          await fs.writeFile(dirs, JSON.stringify(foodobj), 'utf8');
          // }
          // this.state.dataDragNote.push("");
          // this.pannote = this.state.dataDragNote.map(() => new Animated.ValueXY());
          this.state.FoodsAppData.push(foodobj);
          await this.getFoodsLocations(
            this.state.FoodsAppData,
            this.state.FoodsAppData.length - 1,
          );
          FoodsAppMappedData.push(
            <TouchableWithoutFeedback
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
              }}
              ref={rf => (this._refFoods = rf)}
              key={FoodsAppMappedData.length}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                key={FoodsAppMappedData.length}
                style={{
                  ...Platform.select({ios: {lineHeight: 25}, android: {}}),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  color: '#EFEFEF',
                  opacity: 0.5,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                {this.state.FoodsAppData[
                  FoodsAppMappedData.length
                ].food.substring(0, 1)}
              </Text>
            </TouchableWithoutFeedback>,
          );
          this.setState({DisplayAddFoodDialog: 'none'});
          this.setState({UserFoods: '', UserFoodImage: null});
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setState({
        flashopacity: true,
        flashMessage: `Please add a food title or food image.`,
        flashColor: 'lightgray',
        flashPosition: '50%',
        textcolor: '#D21F3C',
      });
      setTimeout(() => {
        this.setState({flashopacity: false});
      }, 3500);
    }
  };
  AddFeelingsToFood = async (index, score) => {
    if (index != null) {
      this.setState({FoodDetailModal: false, FoodDetailsImage: null});
      let path = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/foods/';
      try {
        let isFoods = await RNFetchBlob.fs.isDir(path);
        if (isFoods == true) {
          let isFile = await RNFetchBlob.fs
            .ls(path)
            .then(async files => {
              console.log(files.length);
              if (files.length > 0) {
                await RNFetchBlob.fs
                  .readFile(path + '/' + files[index], 'utf8')
                  .then(async data => {
                    //    console.log("foods:",data);
                    let foodsdata = JSON.parse(data);
                    if (foodsdata.feelings.length > 0) {
                      let checkTimeout = this.isNotesExpired(
                        foodsdata.feelings[foodsdata.feelings.length - 1].time,
                        0.08,
                      );
                      if (checkTimeout[0] == 'expired') {
                        foodsdata.feelings.push({
                          time: new Date(),
                          score: score,
                        });
                        this.state.FoodsAppData[index].feelings.push({
                          time: new Date(),
                          score: score,
                        });
                        await this.calculateAverageFoodScore(
                          this.state.FoodsAppData[index].feelings,
                          index,
                        );
                        this.setState({
                          FoodDetailsAvgScore:
                            this.state.FoodsAppData[index].avgscore,
                        });
                        this.setState({FoodDetailModal: true});
                        this.forceUpdate();
                        //    let foodobj = {food:text,foodimage:this.state.UserFoodImage,feelings:[],savingdate:new Date(),display:'flex',opacity:1}
                        await RNFetchBlob.fs.writeFile(
                          path + '/' + files[index],
                          JSON.stringify(foodsdata),
                          'utf8',
                        );
                      } else {
                        this.setState({
                          flashopacity: true,
                          flashMessage: `You recently added a feeling entry for ${this.state.FoodDetails}. Please wait for two hours to add another entry.`,
                          flashColor: 'lightgray',
                          flashPosition: '50%',
                          textcolor: '#D21F3C',
                        });
                        setTimeout(() => {
                          this.setState({flashopacity: false});
                        }, 3500);
                      }
                    } else {
                      foodsdata.feelings.push({
                        time: new Date(),
                        score: score,
                      });
                      this.state.FoodsAppData[index].feelings.push({
                        time: new Date(),
                        score: score,
                      });
                      await this.calculateAverageFoodScore(
                        this.state.FoodsAppData[index].feelings,
                        index,
                      );
                      this.setState({
                        FoodDetailsAvgScore:
                          this.state.FoodsAppData[index].avgscore,
                      });
                      this.setState({FoodDetailModal: true});
                      this.forceUpdate();
                      await RNFetchBlob.fs.writeFile(
                        path + '/' + files[index],
                        JSON.stringify(foodsdata),
                        'utf8',
                      );
                    }
                  });
              } else {
                console.log('no previous notes file exist.');
              }
            })
            .catch(error => console.log(error));
        }
      } catch (e) {
        console.log('startpeerchaterror:', e);
      }
    }
  };
  calculateAverageFoodScore = async (feelings, index) => {
    var avgscore = 0;
    var totalscore = 0;
    if (feelings.length > 0) {
      for (let i = 0; i < feelings.length; i++) {
        totalscore += feelings[i].score;
      }
      avgscore = totalscore / feelings.length;
      this.state.FoodsAppData[index].avgscore = avgscore;
    } else {
      this.state.FoodsAppData[index].avgscore = 0;
    }
  };
  SortFoodsBasedOnScore = async foods => {
    try {
      if (foods.length > 3) {
        // console.log("sorted foods:",this.state.FoodsAppData)
        let sortedarray = await foods.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          if (b.avgscore > a.avgscore) {
            return b.avgscore - a.avgscore;
          } else if (b.avgscore < a.avgscore) {
            return b.avgscore - a.avgscore;
          } else if (b.avgscore == a.avgscore) {
            if (b.feelings.length > 0 && a.feelings.length > 0) {
              return (
                new Date(b.feelings[b.feelings.length - 1].time) -
                new Date(a.feelings[a.feelings.length - 1].time)
              );
            } else {
              return b.avgscore - a.avgscore;
            }
          } else {
            return b.avgscore - a.avgscore;
          }
        });
        let centerdotsize = 150; //150;
        // Minimum radius
        let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
        this.state.FoodsDotsLocations = await this.displayRadialText(
          foods,
          'foods',
          centerdotsize,
          true,
          'small',
        );
        for (let i = 0; i < foods.length; i++) {
          if (this.state.FoodsDotsLocations.length > 3) {
            this.increasefooddotsize(
              Number.parseInt(
                JSON.stringify(this.state.FoodsDotsLocations[i].width),
              ),
              i,
              this.state.FoodsDotsLocations.length,
              this.state.FoodsDotsLocations,
            );
          }
        }
      } else {
        let centerdotsize = 150; //150;
        // Minimum radius
        let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
        this.state.FoodsDotsLocations = await this.displayRadialText(
          foods,
          'foods',
          centerdotsize,
          true,
          'small',
        );
      }
    } catch (e) {
      console.log('calculatefoodavgexception:', e);
    }
  };
  getFoodsLocations = async (indata, startIndex) => {
    console.log('inside getfoodslocations:', indata.length, startIndex);
    // {note:text,expiretime:this.state.ExpireNotesValue}
    // for (let i = startIndex; i < indata.length; i++) {
    //     let data1 = this.state.FoodsAppData[i].food;
    //     let data2 = this.state.FoodsAppData[i].food;
    //     this.state.FoodsDotsLocations[i] =  this.getcolorandlocationbasedondata(data1, data2,i,this.state.FoodsAppData.length);
    //     await this.calculateAverageFoodScore(this.state.FoodsAppData[i].feelings,i)
    // }
    let centerdotsize = 150; //150;
    // Minimum radius
    let minRadius = centerdotsize / 2 + centerdotsize * 0.2;
    //  this.state.FoodsDotsLocations = await this.displayRadialText(indata,"foods",minRadius, true);
    for (let i = 0; i < this.state.FoodsAppData.length; i++) {
      // this.state.filteredContactData[i].color = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
      // dotColors[i] = JSON.parse(JSON.stringify(this.state.dotColorLocation[i].col));
      // this.increasedotsize(Number.parseInt(JSON.stringify(this.state.FoodsDotsLocations[i].width)),i,this.state.FoodsDotsLocations.length,this.state.FoodsDotsLocations);
      await this.calculateAverageFoodScore(
        this.state.FoodsAppData[i].feelings,
        i,
      );
    }
    await this.SortFoodsBasedOnScore(this.state.FoodsAppData);
  };
  clickFoodImage = async () => {
    try {
      var ispermission = false;
      var fileDate = [
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
      ].join('');
      var fileTime = [
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds(),
      ].join('');
      let file_path;
      if (Platform.OS === 'android') {
        file_path =
          RNFetchBlob.fs.dirs.DownloadDir +
          '/Newauth/foodmedia/IMG-' +
          fileDate +
          '-' +
          fileTime +
          '.png';
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          ispermission = true;
        } else {
          console.log('Camera permission denied');
          showMessage({
            style: {
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'lightgray',
              opacity: 0.8,
            },
            message: 'Please go to settings and allow camera permission.',
            // description:"could not authenticate. Please try again",
            type: 'info',
            color: 'black',
            animated: true,
            animationDuration: 300,
            duration: 3000,
          });
        }
      } else if (Platform.OS === 'ios') {
        file_path =
          RNFetchBlob.fs.dirs.DocumentDir +
          '/Newauth/foodmedia/IMG-' +
          fileDate +
          '-' +
          fileTime +
          '.png';
        const granted = await request(PERMISSIONS.IOS.CAMERA).then(result => {
          console.log('result:', result);
          return result;
        });
        console.log('res:', granted, typeof granted);
        if (granted === 'granted') {
          ispermission = true;
        } else {
          showMessage({
            style: {
              alignSelf: 'center',
              alignItems: 'center',
              backgroundColor: 'lightgray',
              opacity: 0.8,
            },
            message: 'Please go to settings and allow camera permission.',
            // description:"could not authenticate. Please try again",
            type: 'info',
            color: 'black',
            animated: true,
            animationDuration: 300,
            duration: 3000,
          });
        }
      }
      if (ispermission === true) {
        let options = {
          title: 'Video Picker',
          mediaType: 'photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchCamera(options, async response => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = {uri: response.uri};
            console.log('response', JSON.stringify(response), Platform.OS);
            try {
              var base64Img = response.assets[0].uri;
              var b64 = await RNFS.readFile(
                Platform.OS === 'android' ? base64Img.substring(7) : base64Img,
                'base64',
              ).then(res => {
                return res;
              });
              console.log(b64.substring(0, 7));
              // let file_path = RNFetchBlob.fs.dirs.DownloadDir + '/Newauth/foodmedia/IMG-' + fileDate + '-' + fileTime + '.png'
              await RNFetchBlob.fs
                .writeFile(file_path, b64, 'base64')
                .catch(e => console.log('save image error:', e));
              this.setState({UserFoodImage: `file://${file_path}`});
              this.forceUpdate();
              // this.setState({UserFoodImage:`data:image/png;base64,${b64}`})
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  showpurchasedialog = item => {
    this.populateitemdetailsinpaymentdialog(item);
    console.log('item data loaded');
    if (stripe == null) {
      var scriptfetch = document.createElement('script');
      scriptfetch.type = 'text/javascript';
      scriptfetch.setAttribute(
        'src',
        'https://polyfill.io/v3/polyfill.min.js?version=3.52.1&features=fetch',
      );
      var stripescript = document.createElement('script');
      stripescript.type = 'text/javascript';
      stripescript.setAttribute('src', 'https://js.stripe.com/v3/');
      document.body.appendChild(scriptfetch);
      document.body.appendChild(stripescript);
      stripescript.addEventListener(
        'load',
        () => {
          //if (nastripekey == null)
          //	nastripekey = "pk_test_ngbi1o6t13ZaBnCS6JMkgw5l00PvBaGMHm";
          stripe = Stripe(nastripekey);
          this.afterstripeloaded(item);
        },
        false,
      );
    } else {
      this.afterstripeloaded(item);
    }
  };
  /// YOU WILL PASS 'TEN-DOT-SUB' as the itemname
  populateitemdetailsinpaymentdialog = item => {
    this.setState({showLoader: 'flex'});
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = () => {
      console.log(xhr.readyState, xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var itemdata = JSON.parse(xhr.responseText);
        console.log(
          'itemdata:',
          itemdata,
          typeof itemdata.amount,
          Number.parseFloat(itemdata.amount.substring(1)) + 5,
        );
        if (typeof itemdata.amount !== 'undefined') {
          this.state.PaymentItemDetailsObject.amount =
            Number.parseFloat(itemdata.amount.substring(1)) *
            this.state.AmountToBePaid;
          this.setState({
            displaycardview: 'flex',
            showLoader: 'none',
            DisableCardButton: false,
          });
        }
        if (typeof itemdata.summary !== 'undefined') {
          this.state.PaymentItemDetailsObject.summary = `${
            Number.parseInt(itemdata.summary.substring(0, 2)) *
            this.state.AmountToBePaid
          } ${itemdata.summary.substring(2)}`;
        }
        if (typeof itemdata.description !== 'undefined') {
          this.state.PaymentItemDetailsObject.desc = itemdata.description;
        }
      }
    };
    xhr.open('POST', 'https://newauth.io/newauth/api/getitemdetail');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    var req = JSON.stringify({
      name: 'TEN-DOT-SUB',
    });
    console.log('reqpckt:', req);
    xhr.send(req);
  };
  afterstripeloaded = async item => {
    console.log('afterstriploaded');
    this.setState({DisableCardButton: true});
    var purchase = {
      // testTransaction: "Y",
      // items: [{ name: 'TEN-DOT-SUB'}]
      items: new Array(this.state.AmountToBePaid).fill({name: 'TEN-DOT-SUB'}),
    };
    console.log(purchase);
    await fetch('https://newauth.io/secure/paymentintent', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchase),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('data:', data, data.clientSecret);
        this.payWithCard(stripe, this.state.CardInput, data.clientSecret);
      })
      .catch(error => {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        throw error;
      });
    console.log('About to show pmt overlay');
    // $('#payment-overlay').show();
    console.log('about to show paymentoverlay');
    // $('#paymentOverlayModal').modal('show');
  };
  payWithCard = (stripe, card, clientSecret) => {
    // const { confirmPayment, loading } = useConfirmPayment();
    //   loading(true);
    console.log('card:', card);
    confirmPayment(clientSecret, {
      paymentMethodData: {
        card: card,
      },
      paymentMethodType: 'Card',
    }).then(result => {
      if (result.error) {
        // Show error to your customer
        console.log('error', result);
        this.showError(result.error.message);
      } else {
        // The payment succeeded!
        console.log('success', result);
        //   this.processorderinnewauth("TEN-DOT-SUB", result.paymentIntent.id);
        this.orderComplete(result.paymentIntent.id);
      }
    });
  };
  /* ------- UI helpers ------- */
  // Shows a success message when the payment is complete
  orderComplete = paymentIntentId => {
    console.log('paymentid:', paymentIntentId);
    //   loading(false);
    //  document
    //   .querySelector(".result-message a")
    //   .setAttribute(
    //     "href",
    //     "https://dashboard.stripe.com/test/payments/" + paymentIntentId
    //   );
    //   document.querySelector(".result-message").classList.remove("hidden");
    //   document.querySelector("button").disabled = true;
    this.processorderinnewauth('TEN-DOT-SUB', paymentIntentId);
  };
  // Show the customer the error from Stripe if their card fails to charge
  showError = errorMsgText => {
    console.log('errorMSgText:', errorMsgText);
    this._paymentflash.showMessage({
      style: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        opacity: 0.8,
      },
      message: errorMsgText,
      // description:"could not authenticate. Please try again",
      type: 'danger',
      color: 'red',
      animated: true,
      animationDuration: 300,
      duration: 3000,
    });
    this.setState({CardInput: {}, DisableCardButton: false});
    //   loading(false);
    //   var errorMsg = document.querySelector("#card-error");
    //   errorMsg.textContent = errorMsgText;
    //   setTimeout(function() {
    //     errorMsg.textContent = "";
    //   }, 4000);
  };
  // Show a spinner on payment submission
  loading = isLoading => {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector('button').disabled = true;
      document.querySelector('#spinner').classList.remove('hidden');
      document.querySelector('#button-text').classList.add('hidden');
    } else {
      document.querySelector('button').disabled = false;
      document.querySelector('#spinner').classList.add('hidden');
      document.querySelector('#button-text').classList.remove('hidden');
    }
  };
  processorderinnewauth = (itemname, paymentIntentId) => {
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = () => {
      console.log('xhr:', xhr.readyState, xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == 200) {
        // document.getElementById('img-sub-content').innerHTML = "";
        console.log(xhr.responseText);
        AsyncStorage.setItem(
          'dotspurchased',
          JSON.stringify({
            status: true,
            noofdots: this.state.AmountToBePaid * 10,
          }),
        );
        this.setState({
          PaymentDoneStatus: true,
          CanAddContacts: this.state.AmountToBePaid * 10,
          AlreadyAddedContacts: 0,
        });
        AsyncStorage.setItem(
          'availabledots',
          JSON.stringify(
            this.state.CanAddContacts - this.state.AlreadyAddedContacts,
          ),
        );
        // displaypersonalauthimages('img-sub-content');
        setTimeout(() => {
          this.setState({
            DisableCardButton: false,
            PaymentItemDetailsModal: false,
          });
          this.setState({
            flashopacity: true,
            flashMessage: `Payment successful`,
            flashColor: 'lightgray',
            flashPosition: '50%',
            textcolor: 'green',
          });
          setTimeout(() => {
            this.setState({flashopacity: false});
          }, 3500);
          setTimeout(() => {
            this.setState({PaymentScreen: false, showView: true});
          }, 1500);
          //alert('payment complete. will close dialog');
          // removejscssfile("/static/css/pymt-temp.css", "css");
          // document.querySelector(".result-message").classList.add("hidden");
          // $('#paymentOverlayModal').modal('hide');
        }, 2000);
      }
    };
    //var itemname = document.getElementById(item).value;
    xhr.open('POST', 'https://newauth.io/newauth/api/processorder');
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    var req = JSON.stringify({
      name: itemname,
      paymentintentid: paymentIntentId,
      flakeorphone: confusername,
      //  "testTransaction": "Y",
      amount: this.state.AmountToBePaid * 10,
    });
    console.log(req);
    xhr.send(req);
  };
  getAllNewauthOrders = async phone => {
    var xhr = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = () => {
      console.log('get all orders:', xhr.readyState, xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == 200) {
        let resp = JSON.parse(xhr.responseText);
        if (resp.length == 0) {
          this.setState({PaymentDoneStatus: false});
        } else {
          this.setState({PaymentDoneStatus: true});
          if (this.state.PaymentDoneStatus == true) {
            this.setState({
              CanAddContacts: resp[0].amount,
              AlreadyAddedContacts: 0,
            });
            AsyncStorage.setItem(
              'dotspurchased',
              JSON.stringify({status: true, noofdots: resp[0].amount}),
            );
            AsyncStorage.setItem(
              'availabledots',
              JSON.stringify(
                this.state.CanAddContacts - this.state.AlreadyAddedContacts,
              ),
            );
          }
        }
      } else if (xhr.status == 405) {
        xhr.send(null);
      } else if (xhr.status == 500) {
        xhr.send(null);
      }
    };
    xhr.open('GET', 'https://newauth.io/newauth/api/getallorders/' + phone);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(null);
    // alert("send")
  };
  moveToPurchaseScreen = () => {
    this.setState({
      showCreateAccountText: 'none',
      phoneButtonColor: '#4682B4',
      accountButtonColor: '#D0D0D0',
      paymentnotificationModal: false,
      showView: false,
    });
    setTimeout(() => {
      this.setState({PaymentScreen: true, PaymentItemDetailsModal: true});
    }, 100);
  };
  moveToVaultScreen = async () => {
    if (loggedInuserType == 'flake') {
      // if (this.state.filteredData.length == 0) {
      this.checkFlakeExpiration(confusername, 'vault');
      // this.setState({ displayFlake: true, showView: false })
      // this.toggleModalVisibility();
      // }
      // else {
      //     this.setState({ displayFlake: true, showView: false })
      // }
      // else{
      //     if(this.state.filteredData.length==0){
      //         this.setState({vaultvalue:this.state.username})
      //         this.setState({ displayFlake: true, showView: false })
      //         this.toggleModalVisibility(this.state.vaultvalue);
      //     }
      //     else{
      //       this.setState({ displayFlake: true, showView: false })
      //     }
      // }
      // this.checkFlakeExpiration(confusername,"vault");
    } else {
      this.setState({
        flashopacity: true,
        flashMessage: `You need to log in with a newauth account to access vault.`,
        flashColor: 'lightgray',
        flashPosition: '50%',
        textcolor: 'black',
      });
      setTimeout(() => {
        this.setState({flashopacity: false});
      }, 3500);
    }
  };
  render() {
    // const { navigate } = this.props.navigation;
    try {
      return (
        <View style={{flex: 1, opacity: 1, backgroundColor: '#EFEFEF'}}>
          <FlashMessage position={'center'} />
          {/* {this.state.flashopacity && <FlashMessages ref={rf => this.flsh = ((rf))}  message={this.state.flashMessage} backcolor={this.state.flashColor} position={this.state.flashPosition} textcolor={this.state.textcolor}/>} */}
          {this.state.showView ? (
            <SafeAreaView
              style={{
                backgroundColor: '#EFEFEF',
                flex: 1,
                width: screenwidth,
                height: screenheight,
                position: 'absolute',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  display: this.state.showLoader,
                  flex: 1,
                  backgroundColor: '#EFEFEF',
                  position: 'absolute',
                  alignSelf: 'center',
                  top: screenheight / 2,
                }}>
                <Loader />
              </View>
              <TouchableOpacity
                onPress={() => this.SlideMiniAppsBack()}
                activeOpacity={1}
                onPressIn={() => this.pressingIn()}
                onPressOut={() => this.pressingOut()}
                style={{
                  display: this.state.homepage,
                  width: screenwidth,
                  height: screenheight,
                  flex: 1,
                }}>
                {/* header texts */}
                {this.state.flashopacity && (
                  <FlashMessages
                    ref={rf => (this.flsh = rf)}
                    message={this.state.flashMessage}
                    backcolor={this.state.flashColor}
                    position={this.state.flashPosition}
                    textcolor={this.state.textcolor}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    width: screenwidth,
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                    zIndex: 7,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{width: 35, height: 35, marginTop: 0}}
                      source={require('./flake3.jpg')}
                    />
                    <Text
                      onPress={() =>
                        loggedInuserType == 'flake'
                          ? {
                              ...this.checkFlakeExpiration(
                                confusername,
                                'check',
                              ),
                            }
                          : {
                              ...showMessage({
                                message: 'Logged in: ' + confusername,
                                type: 'info',
                                color: 'black',
                                animated: true,
                                animationDuration: 300,
                                duration: 3000,
                                position: 'top',
                                hideOnPress: true,
                                style: {
                                  backgroundColor: 'lightgray',
                                  opacity: 0.8,
                                },
                              }),
                            }
                      }
                      style={[
                        {
                          ...(this.state.isFlakeActive === 'none'
                            ? loggedInuserType == 'flake'
                              ? {textDecorationLine: 'line-through'}
                              : {}
                            : {}),
                        },
                        {...styles.newauth},
                      ]}>
                      {loggedInuserType == 'flake'
                        ? confusername.substr(0, 4) + '...'
                        : loggedInuserType == 'phone'
                        ? '...' + confusername.substr(confusername.length - 4)
                        : ''}
                    </Text>
                  </View>
                  <View>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={{
                        marginRight: 7,
                        color: '#767676',
                        fontSize: 20,
                        marginTop: 7,
                      }}>
                      {this.state.addAppsToggleSwitch == true
                        ? 'Dots'
                        : 'Chats'}
                    </Text>
                  </View>
                </View>
                <View
                  onStartShouldSetResponder={() =>
                    this.state.searchcontact == ''
                      ? this.setState({showSearchBar: 'none'})
                      : {}
                  }
                  style={{
                    height: '100%',
                    width: screenwidth,
                    marginTop: '0%',
                    position: 'absolute',
                    justifyContent: 'center',
                  }}>
                  <Animated.Text
                    onPress={() => this.AnimateMiniAppView('notes')}
                    style={{
                      display: this.state.displaynotesapp,
                      position: 'absolute',
                      zIndex: 2,
                      color: 'white',
                      backgroundColor: '#4682B4',
                      width: this.state.noteappwidth,
                      height: this.state.noteappheight,
                      top: this.state.noteapptop,
                      left: this.state.noteappleft,
                      borderRadius: 500,
                      padding: 15,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {this.state.noteapptitle}
                  </Animated.Text>
                  <Animated.Text
                    onPress={() => this.AnimateMiniAppView('food')}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{
                      display: this.state.displayfoodapp,
                      position: 'absolute',
                      zIndex: 2,
                      color: 'white',
                      backgroundColor: '#4682B4',
                      width: this.state.foodappwidth,
                      height: this.state.foodappheight,
                      top: this.state.foodapptop,
                      left: this.state.foodappleft,
                      borderRadius: 500,
                      padding: 15,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {this.state.foodapptitle}
                  </Animated.Text>
                  <View
                    style={{
                      display: this.state.showDelete,
                      flexDirection: 'column',
                      height: 25,
                      width: 25,
                      position: 'absolute',
                      top: '90%',
                      left: '90%',
                    }} //step 13
                    onLayout={this.setDropZoneValues.bind(this)}>
                    {/* <Text numberOfLines={6} adjustsFontSizeToFit style={{ color: 'gray', alignSelf: 'center' }}>Delete</Text> */}
                    <Image
                      source={require('./deletegray.png')}
                      style={{
                        width: 25,
                        height: 25,
                        opacity: 0.5,
                        marginTop: 0,
                        alignSelf: 'center',
                        zIndex: 7,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      top: '1%',
                      zIndex: 8,
                      display: this.state.showSearchBar,
                      position: 'absolute',
                      borderWidth: 1,
                      borderColor: '#4682B4',
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      width: 200,
                      alignSelf: 'center',
                      justifyContent: 'flex-start',
                      alignContent: 'center',
                      height: 35,
                    }}>
                    <TextInput
                      style={{
                        width: 165,
                        marginLeft: 5,
                        height: 35,
                        fontSize: 12,
                        color: 'black',
                      }}
                      placeholder="Search"
                      placeholderTextColor={'black'}
                      value={this.state.searchcontact}
                      onChangeText={text => this.SearchContactsFilter(text)}
                    />
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        marginTop: 5,
                        opacity: 0.5,
                      }}
                      source={require('./search.png')}
                    />
                  </View>
                  {this.renderDraggable()}
                  <View
                    ref={rf => (this._refCntr = rf)}
                    onLayout={this.measureViewPosition}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60%',
                      aspectRatio: 3 / 2.5,
                      alignSelf: 'center',
                      position: 'absolute',
                    }}>
                    {/* plus icon */}
                    <View
                      style={{
                        zIndex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '0%',
                        left: '46%',
                        borderRadius: 80,
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        width: '10%',
                        aspectRatio: 1 / 1,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({inviteInternalUserModal: true})
                        }>
                        <Image
                          source={require('./plus.png')}
                          style={styles.plus}></Image>
                      </TouchableOpacity>
                    </View>
                    {/* vault icon */}
                    <View
                      style={{
                        zIndex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: '10%',
                        aspectRatio: 1 / 1,
                        top: '18%',
                        left: '13%',
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        borderRadius: 80,
                      }}>
                      <TouchableOpacity
                        onPress={() => this.moveToVaultScreen()}>
                        <Image
                          source={require('./vaultgray.png')}
                          style={styles.vault}></Image>
                      </TouchableOpacity>
                    </View>
                    {/* search icon */}
                    <View
                      style={{
                        zIndex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '10%',
                        aspectRatio: 1 / 1,
                        left: '6%',
                        top: '47%',
                        borderRadius: 80,
                        borderColor: 'gray',
                        borderWidth: 0.5,
                        position: 'absolute',
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setState({showSearchBar: 'flex'})}>
                        <Image
                          source={{
                            uri: 'https://newauth.io/static/icons/search-40.png',
                          }}
                          style={styles.search}></Image>
                      </TouchableOpacity>
                    </View>
                    {/* logo */}
                    <Animated.View
                      style={{
                        zIndex: 0,
                        opacity: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '64%',
                        aspectRatio: 1 / 1,
                        left: '18%',
                        top: '14%',
                        borderRadius: 150,
                        borderWidth: 5,
                        borderColor: 'white',
                        position: 'absolute',
                      }}>
                      {/* <Animated.View style={{opacity:this.state.fadeInOpacity}}> */}
                      <TouchableOpacity
                        onPress={this.dotfunction}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                        }}>
                        <Animatable.Image
                          animation="fadeIn"
                          duration={2000}
                          easing={Easing.linear}
                          iterationCount={1}
                          style={styles.logo}
                          source={{uri: this.state.imgLogo}}
                        />
                      </TouchableOpacity>
                      {/* <TouchableOpacity onPress={this.dotfunction} style={{ position: 'absolute', width: "100%", height: '100%' }}>
                                                    <Image style={{ position: 'absolute', display: this.state.isFlakeActive, width: '100%', height: '100%', borderRadius: 150, }}
                                                        source={require('./flakeimg.png')}
                                                    />
                                                </TouchableOpacity> */}
                      {/* username */}
                      <Animated.View
                        style={{
                          ...(this.state.displayUserBox == 'flex'
                            ? {opacity: this.state.fadeInUsernameBox}
                            : {opacity: 0}),
                          display: this.state.displayUserBox,
                          elevation: 5,
                          width: '110%',
                          left: '-5%',
                          aspectRatio: 5 / 1,
                          position: 'absolute',
                          shadowColor: '#d3d3d3',
                          borderRadius: 2,
                          shadowOpacity: 0.5,
                          borderColor: 'lightgray',
                          borderWidth: 2,
                          backgroundColor: 'lightgray',
                          alignSelf: 'center',
                        }}>
                        <TextInput
                          secureTextEntry={true}
                          placeholder="User name"
                          placeholderTextColor={'gray'}
                          style={{
                            padding: 5,
                            fontSize: 0.02 * screenwidth,
                            display: this.state.displayUserBox,
                            backgroundColor: 'white',
                            color: '#343434',
                            width: '100%',
                            aspectRatio: 6 / 1,
                            borderWidth: 1,
                            borderColor: this.state.unameBrdrClr,
                            position: 'absolute',
                          }}
                          onChangeText={val => this.getTextInputValue(val)}
                        />
                      </Animated.View>
                    </Animated.View>
                    {/* setting icon */}
                    <View
                      style={{
                        zIndex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '10%',
                        aspectRatio: 1 / 1,
                        top: '18%',
                        left: '77%',
                        borderRadius: 80,
                        borderColor: 'gray',
                        borderWidth: 0.5,
                        position: 'absolute',
                      }}>
                      <TouchableOpacity
                        onPress={() => this.setState({showSettingModal: true})}>
                        <Image
                          source={require('./setting.jpg')}
                          style={styles.comment}></Image>
                      </TouchableOpacity>
                    </View>
                    {/* enter icon */}
                    <View
                      style={{
                        zIndex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '10%',
                        aspectRatio: 1 / 1,
                        left: '84%',
                        top: '47%',
                        borderWidth: 0.5,
                        borderRadius: 80,
                        borderColor: 'gray',
                        position: 'absolute',
                      }}>
                      <TouchableOpacity onPress={this.changeValue}>
                        <Image
                          source={require('./enter.png')}
                          style={styles.enter}></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                closeOnHardwareBackPress={true}
                transparent={false}
                visible={this.state.showSettingModal}
                presentationStyle="formSheet"
                onRequestClose={() => this.setState({showSettingModal: false})}
                onDismiss={() => this.setState({showSettingModal: false})}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    position: 'absolute',
                    alignSelf: 'center',
                    height: screenheight,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      alignSelf: 'center',
                      backgroundColor: 'white',
                      color: 'black',
                      width: screenwidth,
                      height: 50,
                      borderBottomWidth: 1,
                      borderBottomColor: 'lightgray',
                    }}>
                    Settings
                  </Text>
                  <ScrollView>
                    <View
                      style={{
                        ...(loggedInuserType == 'phone'
                          ? {display: 'none'}
                          : {display: 'flex'}),
                        borderWidth: 0,
                        borderColor: 'lightgray',
                        marginTop: 30,
                        flexDirection: 'row',
                        width: screenwidth,
                        height: 70,
                        borderRadius: 0,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: '#808080',
                          height: 30,
                          fontSize: 16,
                          marginTop: 5,
                        }}>
                        Always show username input
                      </Text>
                      <Text
                        adjustsFontSizeToFit
                        numberOfLines={3}
                        style={{
                          paddingLeft: 10,
                          color: '#989898',
                          position: 'absolute',
                          width: '85%',
                          height: 40,
                          top: 30,
                          fontSize: 13,
                        }}>
                        When you want to change the newauth account you need to
                        log into.
                      </Text>
                      <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={this.state.isEnabled ? '#fffff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => this.inputBoxSwitch()}
                        value={this.state.inputBoxToggleSwitch}
                      />
                    </View>
                    <View
                      onStartShouldSetResponder={() => this.viewFlakeSwitch()}
                      style={{
                        borderWidth: 0,
                        borderColor: 'lightgray',
                        marginTop: 20,
                        flexDirection: 'row',
                        width: screenwidth,
                        height: 70,
                        borderRadius: 0,
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: '#808080',
                          height: 30,
                          fontSize: 16,
                          marginTop: 5,
                        }}>{`${this.state.viewFlakeTextValue} ${
                        loggedInuserType == 'phone' ? 'phone number' : 'flake'
                      }`}</Text>
                      <Text
                        adjustsFontSizeToFit
                        numberOfLines={3}
                        style={{
                          paddingLeft: 10,
                          color: '#989898',
                          position: 'absolute',
                          height: 40,
                          width: '85%',
                          top: 30,
                          fontSize: 13,
                        }}>
                        {loggedInuserType == 'phone'
                          ? `You have logged into the newauth app based on your phone number. Click to view and copy.`
                          : `Your latest flake, your dynamic ID. When you need to share it with someone.`}
                      </Text>
                      <Text
                        style={{
                          paddingRight: 10,
                          color: '#4682B4',
                          display: this.state.viewFlakeTextDisplay,
                          height: 30,
                        }}
                        onPress={() => {
                          Clipboard.setString(confusername);
                          Animated.timing(this.state.viewFlakeTextOpacity, {
                            toValue: 0.8,
                            duration: 1000,
                            useNativeDriver: false,
                          }).start();
                          setTimeout(() => {
                            Animated.timing(this.state.viewFlakeTextOpacity, {
                              toValue: 0,
                              duration: 1000,
                              useNativeDriver: false,
                            }).start();
                          }, 2000);
                        }}>
                        {confusername}
                      </Text>
                      {/* <Switch
                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                thumbColor={this.state.isEnabled ? "#fffff" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => this.viewFlakeSwitch()}
                                            value={this.state.viewFlakeToggleSwitch}
                                            /> */}
                    </View>
                    <View
                      onStartShouldSetResponder={() =>
                        this.setState({
                          showSettingModal: false,
                          manageContactsModal1: true,
                        })
                      }
                      style={{
                        borderWidth: 0,
                        borderColor: 'lightgray',
                        marginTop: 20,
                        flexDirection: 'row',
                        width: screenwidth,
                        height: 70,
                        borderRadius: 0,
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: '#808080',
                          height: 30,
                          fontSize: 16,
                          marginTop: 5,
                        }}>
                        Manage your dots
                      </Text>
                      <Text
                        adjustsFontSizeToFit
                        numberOfLines={3}
                        style={{
                          paddingLeft: 10,
                          color: '#989898',
                          position: 'absolute',
                          height: 40,
                          width: '85%',
                          top: 30,
                          fontSize: 13,
                        }}>
                        Add, remove contacts, invites and conversations on the
                        main screen.
                      </Text>
                    </View>
                    <View
                      onStartShouldSetResponder={() => this.lockToggleSwitch()}
                      style={{
                        borderWidth: 0,
                        borderColor: 'lightgray',
                        marginTop: 20,
                        flexDirection: 'row',
                        width: screenwidth,
                        height: 70,
                        borderRadius: 0,
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: '#808080',
                          height: 30,
                          fontSize: 16,
                          marginTop: 5,
                        }}>
                        Manage Lock-{' '}
                        {this.state.lockEnabledState == false
                          ? temp_password == ''
                            ? 'Enable'
                            : 'Complete set up'
                          : 'Disable'}
                      </Text>
                      <Text
                        adjustsFontSizeToFit
                        numberOfLines={3}
                        style={{
                          paddingLeft: 10,
                          color: '#989898',
                          position: 'absolute',
                          height: 40,
                          width: '85%',
                          top: 30,
                          fontSize: 13,
                        }}>
                        Secure your app with newauth security. Unlock with just
                        a few clicks.
                      </Text>
                      {/* <Switch
                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                thumbColor={this.state.isEnabled ? "#fffff" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={() => this.lockToggleSwitch()}
                                                value={this.state.lockEnabledState}
                                            /> */}
                    </View>
                    <View
                      onStartShouldSetResponder={() =>
                        this.addNewAppsToggleSwitch()
                      }
                      style={{
                        borderWidth: 0,
                        borderColor: 'lightgray',
                        marginTop: 20,
                        flexDirection: 'row',
                        width: screenwidth,
                        height: 70,
                        borderRadius: 0,
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          color: '#808080',
                          height: 30,
                          fontSize: 16,
                          marginTop: 5,
                        }}>
                        Manage Apps
                      </Text>
                      <Text
                        adjustsFontSizeToFit
                        numberOfLines={3}
                        style={{
                          paddingLeft: 10,
                          color: '#989898',
                          position: 'absolute',
                          height: 40,
                          width: '90%',
                          top: 30,
                          fontSize: 13,
                        }}>
                        Enhance newauth app by adding more capabilities like
                        notes adn more.
                      </Text>
                      {/* <Switch
                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                thumbColor={this.state.isEnabled ? "#fffff" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={() => this.addNewAppsToggleSwitch()}
                                                value={this.state.addAppsToggleSwitch}
                                            /> */}
                    </View>
                    {/* <View style={{ borderWidth: 0, borderColor: 'lightgray', marginTop: 0, flexDirection: 'row', width: screenwidth, height: 70, borderRadius: 0, backgroundColor: 'white', justifyContent: 'space-between' }}>
                                                <Text style={{ padding: 10, color: '#808080', fontSize: 16, marginTop: 5 }}>Enable Invite with phone number {'\n'}[PAID???]</Text>
                                                <Switch
                                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                    thumbColor={this.state.isEnabled ? "#fffff" : "#f4f3f4"}
                                                    ios_backgroundColor="#3e3e3e"
                                                // onValueChange={() => this.toggleSwitch()}
                                                // value={this.state.isEnabled}
                                                />
                                            </View>
                                            <View style={{ borderWidth: 0, borderColor: 'lightgray', marginTop: 0, flexDirection: 'row', width: screenwidth, height: 70, borderRadius: 0, backgroundColor: 'white', justifyContent: 'space-between' }}>
                                                <Text style={{ padding: 10, color: '#808080', fontSize: 16, marginTop: 5 }}>Set profile photo</Text>
                                                <Switch
                                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                    thumbColor={this.state.isEnabled ? "#fffff" : "#f4f3f4"}
                                                    ios_backgroundColor="#3e3e3e"
                                                // onValueChange={() => this.toggleSwitch()}
                                                // value={this.state.isEnabled}
                                                />
                                            </View> */}
                    <Animated.Text
                      style={{
                        top: '25%',
                        opacity: this.state.viewFlakeTextOpacity,
                        position: 'absolute',
                        alignSelf: 'center',
                        width: 150,
                        height: 50,
                        paddingTop: 15,
                        backgroundColor: '#cbcbcb',
                        borderRadius: 5,
                        textAlign: 'center',
                        color: '#565656',
                      }}>
                      Flake copied
                    </Animated.Text>
                  </ScrollView>
                </View>
              </Modal>
              <Modal
                closeOnHardwareBackPress={true}
                transparent={false}
                visible={this.state.enableLockProcessModal}
                presentationStyle="formSheet"
                animationType="slide"
                onRequestClose={() =>
                  this.setState({enableLockProcessModal: false})
                }
                onDismiss={() =>
                  this.setState({enableLockProcessModal: false})
                }>
                <SafeAreaView
                  style={{
                    flex: 1,
                    width: screenwidth,
                    height: screenheight,
                    backgroundColor: '#EFEFEF',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: '85%',
                      height: '50%',
                      alignSelf: 'center',
                      top: '25%',
                      position: 'absolute',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#4682B4',
                        fontWeight: 'bold',
                        marginTop: 5,
                      }}>
                      LOCK
                    </Text>
                    <StepIndicator
                      direction="vertical"
                      stepCount={3}
                      // onPress={(evt) => (this.checkcons.bind(this))(this.state.currentPosition, evt)}
                      customStyles={customStyles}
                      currentPosition={this.state.currentPosition}
                      labels={labels}
                      renderLabel={({
                        position,
                        stepStatus,
                        label,
                        currentPosition,
                      }) => {
                        return (
                          <View style={{width: screenwidth - 150}}>
                            <Text style={{color: '#4682B4'}}>
                              {label.title}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={{color: 'gray', fontSize: 13}}>
                              {label.body}
                            </Text>
                            <Text
                              numberOfLines={1}
                              onPress={() => {
                                this.ProceedToTestLock(position);
                              }}
                              style={{
                                ...(position === 0 || position === 1
                                  ? {display: 'flex'}
                                  : {display: 'flex'}),
                                alignSelf: 'flex-end',
                                marginTop: 5,
                                ...(position === 1
                                  ? temp_password === ''
                                    ? {
                                        color: 'white',
                                        backgroundColor: '#D0D0D0',
                                      }
                                    : {
                                        color: 'white',
                                        backgroundColor: '#4682B4',
                                      }
                                  : position === 2
                                  ? islockvalidated == false
                                    ? {
                                        color: 'white',
                                        backgroundColor: '#D0D0D0',
                                      }
                                    : {
                                        color: 'white',
                                        backgroundColor: '#4682B4',
                                      }
                                  : {
                                      color: 'white',
                                      backgroundColor: '#4682B4',
                                    }),
                                width: 50,
                                height: 30,
                                padding: 5,
                                textAlign: 'center',
                              }}>
                              GO
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </SafeAreaView>
              </Modal>
              <Modal
                closeOnHardwareBackPress={true}
                transparent={false}
                visible={this.state.lockWarningModal}
                presentationStyle="formSheet"
                animationType="slide"
                onRequestClose={() => this.setState({lockWarningModal: false})}
                onDismiss={() => this.setState({lockWarningModal: false})}>
                <SafeAreaView
                  style={{
                    flex: 1,
                    width: screenwidth,
                    height: screenheight,
                    backgroundColor: '#EFEFEF',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: '85%',
                      height: '50%',
                      alignSelf: 'center',
                      top: '25%',
                      position: 'absolute',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: 30,
                      }}>
                      Note
                    </Text>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: '#a5a5a5',
                        fontSize: 20,
                        marginTop: 50,
                        margin: 15,
                      }}>
                      We recommend that you create a newauth account to serve as
                      a backup for your lock. Without such a backup, after
                      multiple failed attempts, your newauth data will be
                      deleted.
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}>
                      <TouchableOpacity>
                        <Text
                          onPress={() => Linking.openURL('https://newauth.io')}
                          style={{
                            backgroundColor: '#4682B4',
                            color: 'white',
                            padding: 5,
                            margin: 15,
                            marginTop: 50,
                          }}>
                          Create user
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            lockWarningModal: false,
                            enableLockProcessModal: true,
                          })
                        }>
                        <Text
                          style={{
                            backgroundColor: '#4682B4',
                            color: 'white',
                            padding: 5,
                            margin: 15,
                            marginTop: 50,
                          }}>
                          I am fine with my data deleted
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </SafeAreaView>
              </Modal>
              <Modal
                animationType="slide"
                closeOnHardwareBackPress={true}
                onSwipeStart={() => console.log('hyy')}
                // customBackdrop={<View style={{ flex: 1,backgroundColor:"green" }} />}
                // presentationStyle="formSheet"
                transparent={true}
                visible={this.state.notificationDialogModal}
                onStartShouldSetResponder={false}
                onRequestClose={() => this.removingNotificationDialog()}
                onAccessibilityTap={false}
                onDismiss={() => this.removingNotificationDialog()}
                style={{
                  flex: 1,
                  position: 'absolute',
                  width: '80%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    shadowColor: 'gray',
                    elevation: 5,
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.9,
                    shadowRadius: 3,
                    borderWidth: 0,
                    borderColor: '#a5a5a5',
                    opacity: 0.95,
                    top: '25%',
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#EFEFEF',
                    width: '80%',
                    height: '50%',
                    alignSelf: 'center',
                    position: 'absolute',
                  }}>
                  <Text style={{color: 'gray', textAlign: 'center'}}>
                    {'\n'}Your connections in newauth are shown with colored
                    dots in the main screen. Newauth has randomly selected these
                    ten contacts from your contacts list.{'\n'}
                  </Text>
                  <FlatList
                    style={{paddingBottom: 40}}
                    nestedScrollEnabled
                    data={this.state.filteredContactData}
                    renderItem={this.renderItemModal4}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={5}
                  />
                  <Text style={{color: 'gray', textAlign: 'center'}}>
                    {'\n'}You can replace these contacts with your favorite
                    contacts by clicking the settings{' '}
                    {<Icon name="gear" size={15} color="gray" />} button and
                    then choosing Manage the dots option.{'\n'}
                  </Text>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#4682B4',
                      width: '40%',
                      height: 40,
                      left: '30%',
                      marginBottom: 10,
                    }}
                    onPress={() => this.removingNotificationDialog()}>
                    <Text style={{textAlign: 'center', color: 'white'}}>
                      Got it
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              <Modal
                closeOnHardwareBackPress={true}
                transparent={false}
                visible={this.state.miniAppsModal}
                presentationStyle="formSheet"
                animationType="none"
                onRequestClose={() => this.AnimateNewAddedApps()}
                onDismiss={() => this.AnimateNewAddedApps()}>
                <View
                  style={{
                    width: '90%',
                    height: 350,
                    justifyContent: 'space-between',
                    top: (screenheight - 350) / 2,
                    alignSelf: 'center',
                    backgroundColor: '#EFEFEF',
                  }}>
                  <Text
                    style={{
                      color: '#a5a5a5',
                      fontSize: 20,
                      alignSelf: 'center',
                      marginTop: 5,
                    }}>
                    Available apps
                  </Text>
                  <FlatList
                    style={{paddingBottom: 10, alignSelf: 'center'}}
                    nestedScrollEnabled
                    data={this.state.NewauthMiniApps}
                    renderItem={this.renderMiniAppsModal}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={5}
                  />
                  <TouchableOpacity onPress={() => this.AnimateNewAddedApps()}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        alignSelf: 'flex-end',
                        marginTop: 5,
                        marginRight: 10,
                        marginBottom: 10,
                        padding: 5,
                        backgroundColor: '#4682B4',
                      }}>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              <Modal
                animationType="slide"
                transparent={true}
                onSwipeStart={() => alert('hyy')}
                visible={this.state.paymentnotificationModal}
                onStartShouldSetResponder={() =>
                  this.setState({
                    paymentnotificationModal: false,
                    manageContactsModal1: true,
                  })
                }
                onRequestClose={() =>
                  this.setState({
                    paymentnotificationModal: false,
                    manageContactsModal1: true,
                  })
                }
                // onAccessibilityTap={false}
                onDismiss={() =>
                  this.setState({
                    paymentnotificationModal: false,
                    manageContactsModal1: true,
                  })
                }>
                <View
                  onStartShouldSetResponder={() =>
                    this.setState({
                      paymentnotificationModal: false,
                      manageContactsModal1: true,
                    })
                  }
                  style={{
                    width: screenwidth,
                    height: screenheight,
                    backgroundColor: 'rgba(256,256,256,0.6',
                  }}>
                  <View
                    style={{
                      elevation: 5,
                      flex: 1,
                      borderRadius: 5,
                      width: '80%',
                      top: '30%',
                      aspectRatio: 1 / 1,
                      backgroundColor: 'white',
                      alignSelf: 'center',
                      position: 'absolute',
                    }}>
                    <Text
                      numberOfLines={2}
                      style={{
                        alignSelf: 'center',
                        color: '#767676',
                        padding: 5,
                        textAlign: 'center',
                        fontSize: 20,
                      }}>
                      Running out of dots for your favorite people?{'\n'}
                    </Text>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={2}
                      style={{
                        alignSelf: 'center',
                        color: '#767676',
                        padding: 5,
                        textAlign: 'center',
                        fontSize: 15,
                      }}>
                      Get 20 dots free($20 value) by logging in with a newauth
                      account.
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: 20,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            showCreateAccountText: 'flex',
                            phoneButtonColor: '#D0D0D0',
                            accountButtonColor: '#4682B4',
                            showgrayblocks: 'none',
                          })
                        }>
                        <Text
                          adjustsFontSizeToFit
                          numberOfLines={1}
                          style={{
                            alignSelf: 'center',
                            backgroundColor: this.state.accountButtonColor,
                            color: 'white',
                            left: 10,
                            padding: 3,
                            textAlign: 'center',
                          }}>
                          Create account
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.moveToPurchaseScreen(),
                            this.populateitemdetailsinpaymentdialog();
                        }}>
                        <Text
                          adjustsFontSizeToFit
                          numberOfLines={1}
                          style={{
                            alignSelf: 'center',
                            backgroundColor: this.state.phoneButtonColor,
                            right: 10,
                            padding: 3,
                            textAlign: 'center',
                            color: 'white',
                          }}>
                          Purchase
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* <SkeletonPlaceholder borderRadius={4}> */}
                    {/* <SkeletonPlaceholder.Item flexDirection="row" alignItems="center"> */}
                    {/* <SkeletonPlaceholder.Item marginLeft={0} width={'100%'} display= {this.state.showgrayblocks} alignSelf="center"> */}
                    {/* <SkeletonPlaceholder.Item width={80} marginTop={10} height={30} marginLeft={0} alignSelf="center"/> */}
                    {/* <SkeletonPlaceholder.Item marginTop={6} width={180} height={40} alignSelf="center" /> */}
                    {/* </SkeletonPlaceholder.Item> */}
                    {/* </SkeletonPlaceholder.Item> */}
                    {/* </SkeletonPlaceholder> */}
                    <Text
                      style={{
                        position: 'absolute',
                        top: '55%',
                        ...(this.state.showCreateAccountText == 'flex'
                          ? {color: '#4682B4', backgroundColor: 'white'}
                          : {color: '#EFEFEF', backgroundColor: '#EFEFEF'}),
                        borderRadius: 5,
                        marginTop: 10,
                        fontSize: 25,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      {this.state.randomFlakeOnDevice.substring(0, 4)}
                    </Text>
                    <Text
                      adjustsFontSizeToFit
                      style={{
                        position: 'absolute',
                        top: '70%',
                        marginTop: 10,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        borderRadius: 5,
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        ...(this.state.showCreateAccountText == 'flex'
                          ? {color: 'gray', backgroundColor: 'white'}
                          : {color: '#EFEFEF', backgroundColor: '#EFEFEF'}),
                      }}>
                      Please use the above code to create a new account. You can
                      create an account by going to the newauth website at{' '}
                      {'\n'}
                      <Text
                        onPress={() => Linking.openURL('https://newauth.io/')}
                        style={{
                          ...(this.state.showCreateAccountText == 'flex'
                            ? {color: '#4682B4'}
                            : {color: '#EFEFEF'}),
                        }}>
                        https://newauth.io/
                      </Text>
                      {'\n'}works only from desktop devices.
                    </Text>
                  </View>
                </View>
              </Modal>
              <Modal
                animationType="slide"
                closeOnHardwareBackPress={true}
                transparent={false}
                visible={this.state.manageContactsModal1}
                presentationStyle="formSheet"
                // onRequestClose={() => this.setState({ manageContactsModal1: false })}
                onDismiss={() => this.setState({manageContactsModal1: false})}>
                <View
                  style={{
                    flex: 1,
                    width: screenwidth,
                    height: screenheight,
                    alignSelf: 'center',
                    backgroundColor: 'lightgray',
                  }}>
                  {this.state.flashopacity && (
                    <FlashMessages
                      ref={rf => (this.flsh = rf)}
                      message={this.state.flashMessage}
                      backcolor={this.state.flashColor}
                      position={this.state.flashPosition}
                      textcolor={this.state.textcolor}
                    />
                  )}
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#4682B4',
                      color: 'white',
                      width: screenwidth,
                      height: 50,
                    }}>
                    Manage your dots
                  </Text>
                  <Text
                    numberOfLines={3}
                    adjustsFontSizeToFit
                    style={{
                      fontSize: 10,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#4682B4',
                      color: 'white',
                      width: screenwidth,
                      height: 30,
                    }}>
                    Keep your favourite people as dots on the front page. Click
                    Done to close this screen.
                  </Text>
                  <Animated.Text
                    style={{
                      top: '50%',
                      zIndex: 5,
                      paddingTop: 15,
                      opacity: this.state.viewFlakeTextOpacity,
                      position: 'absolute',
                      alignSelf: 'center',
                      width: 150,
                      height: 50,
                      backgroundColor: 'red',
                      borderRadius: 5,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Please login first.
                  </Animated.Text>
                  <View
                    style={{
                      width: screenwidth,
                      height: 50,
                      backgroundColor: 'white',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: screenwidth,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => this.addMoreContactsToRecents()}>
                        <Text
                          disabled={
                            this.state.addMoreContactsToggleSwitch
                              ? false
                              : true
                          }
                          style={{
                            textAlignVertical: 'center',
                            ...(this.state.addMoreContactsToggleSwitch == true
                              ? {backgroundColor: '#4682B4'}
                              : {backgroundColor: '#D0D0D0'}),
                            height: 30,
                            top: 10,
                            width: 150,
                            textAlign: 'center',
                            marginLeft: 5,
                            color: 'white',
                            padding: 5,
                          }}>
                          {loggedInuserType == 'flake'
                            ? 'Add more dots'
                            : this.state.PaymentDoneStatus == true
                            ? 'Add more dots'
                            : 'Need more dots'}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: '#4682B4',
                          textAlignVertical: 'center',
                          paddingRight: 5,
                          top: 10,
                        }}>
                        {loggedInuserType == 'flake'
                          ? this.state.AlreadyAddedContacts +
                            '/' +
                            this.state.CanAddContacts
                          : this.state.PaymentDoneStatus == true
                          ? this.state.AlreadyAddedContacts +
                            '/' +
                            this.state.CanAddContacts
                          : ''}
                      </Text>
                    </View>
                    {/* <Text style={{textAlignVertical:'center',color:'#a5a5a5'}}>You can currently add with these many contacts.</Text> */}
                    {/* <Switch
                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                thumbColor={this.state.isEnabled ? "#fffff" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                            onValueChange={() => this.addMoreContactsToRecents()}
                                            value={this.state.addMoreContactsToggleSwitch}
                                            /> */}
                  </View>
                  {/* <ScrollView> */}
                  <FlatList
                    style={{paddingBottom: 40}}
                    // getItemLayout={this.getItemLayout}
                    nestedScrollEnabled
                    data={this.state.filteredContactData}
                    renderItem={item => this.renderItemModal1(item)}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={5}
                  />
                  {/* </ScrollView> */}
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: 50,
                      width: screenwidth,
                      borderTopWidth: 1,
                      borderTopColor: 'black',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 0,
                    }}>
                    <TouchableOpacity
                      disabled={this.state.changeSwitchColor ? false : true}
                      onPress={() =>
                        this.removeContactsModal1(
                          this.state.filteredContactData,
                        )
                      }
                      style={{padding: 10}}>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={[
                          {
                            ...(this.state.changeSwitchColor
                              ? {backgroundColor: '#4682B4'}
                              : {backgroundColor: '#E5E4E2'}),
                            left: 15,
                            width: 70,
                            height: 30,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            color: 'white',
                            fontSize: 15,
                            padding: 5,
                            alignSelf: 'center',
                          },
                        ]}>
                        Switch
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{padding: 10}}
                      onPress={() => {
                        switchingcounter = 0;
                        this.state.filteredContactData.forEach(element => {
                          element.checked = true;
                        });
                        this.setState({
                          manageContactsModal1: false,
                          changeSwitchColor: false,
                          showSettingModal: false,
                        });
                      }}>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={{
                          right: 15,
                          width: 70,
                          height: 30,
                          backgroundColor: '#4682B4',
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          color: 'white',
                          fontSize: 15,
                          padding: 5,
                          alignSelf: 'center',
                        }}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    aspectRatio: 1 / 1,
                    height: (screenheight * 50) / 100,
                    top: '25%',
                    alignSelf: 'center',
                    left: 50,
                    right: 50,
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: 'black',
                    display: this.state.removingContactsView,
                  }}>
                  <Text
                    style={{
                      color: '#4682B4',
                      alignSelf: 'center',
                      height: 50,
                      fontSize: 30,
                      marginTop: '10%',
                    }}>
                    Removing...
                  </Text>
                  {/* <Text style={{ color: '#A1a1a1',alignSelf: 'center',fontSize:10,marginTop:'5%' }}>Invitation from Test User</Text> */}
                  <FlatList
                    style={{marginTop: '10%', alignSelf: 'center'}}
                    nestedScrollEnabled
                    contentContainerStyle={{paddingBottom: 20}}
                    data={dltvals}
                    renderItem={this.renderItemModal3}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={5}
                  />
                </View>
              </Modal>
              <Modal
                animationType="slide"
                closeOnHardwareBackPress={true}
                transparent={false}
                visible={this.state.manageContactsModal2}
                presentationStyle="formSheet"
                onRequestClose={() => {
                  switchingcounter = 0;
                  this.state.filteredContactData.forEach(element => {
                    element.checked = true;
                  });
                  this.setState({
                    changeSwitchColor: false,
                    manageContactsModal2: false,
                    addMoreContactsToggleSwitch: true,
                  });
                }}
                onDismiss={() => {
                  switchingcounter = 0;
                  this.state.filteredContactData.forEach(element => {
                    element.checked = true;
                  });
                  this.setState({
                    changeSwitchColor: false,
                    manageContactsModal2: false,
                    addMoreContactsToggleSwitch: true,
                  });
                }}>
                <View
                  style={{
                    flex: 1,
                    width: screenwidth,
                    height: screenheight,
                    alignSelf: 'center',
                  }}>
                  {this.state.flashopacity && (
                    <FlashMessages
                      ref={rf => (this.flsh = rf)}
                      message={this.state.flashMessage}
                      backcolor={this.state.flashColor}
                      position={this.state.flashPosition}
                      textcolor={this.state.textcolor}
                    />
                  )}
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{
                      fontSize: 28,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#4682B4',
                      color: 'white',
                      width: screenwidth,
                      height: 70,
                    }}>
                    {this.state.addMoreContactsToggleSwitch == true
                      ? 'Adding Contacts '
                      : 'Switching Contacts '}
                    <Text style={{fontSize: 48, color: '#a5a5a5'}}>
                      {switchingcounter}
                    </Text>
                  </Text>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      alignSelf: 'center',
                      backgroundColor: '#4682B4',
                      color: 'white',
                      width: screenwidth,
                      fontSize: 13,
                      height: 30,
                      padding: 5,
                    }}>
                    Please select the contacts you want on your home screen
                  </Text>
                  <View style={{width: screenwidth, height: 50}}>
                    <TextInput
                      placeholder="Search"
                      placeholderTextColor="gray"
                      style={{
                        color: '#343434',
                        marginLeft: 5,
                        fontSize: 18,
                        top: 10,
                      }}
                      value={this.state.searchmanagecontact}
                      onChangeText={text =>
                        this.SearchManageContactsFilter(text)
                      }
                    />
                  </View>
                  {/* <ScrollView> */}
                  <FlatList
                    style={{backgroundColor: '#EFEFEF', paddingBottom: 40}}
                    nestedScrollEnabled
                    data={this.state.allRecentContactsArray}
                    renderItem={this.renderItemModal2}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={5}
                  />
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: 50,
                      width: screenwidth,
                      borderTopWidth: 1,
                      borderTopColor: 'black',
                      alignItems: 'center',
                      padding: 0,
                      bottom: 5,
                    }}>
                    <Text
                      onPress={() =>
                        this.switchContactsModal2(
                          this.state.allRecentContactsArray,
                        )
                      }
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={{
                        ...(this.state.addMoreContactsToggleSwitch == true
                          ? {display: 'flex'}
                          : {display: 'none'}),
                        backgroundColor: '#4682B4',
                        left: 0,
                        width: 90,
                        height: 30,
                        top: 10,
                        textAlign: 'center',
                        ...Platform.select({
                          ios: {lineHeight: 25},
                          android: {},
                        }),
                        textAlignVertical: 'center',
                        color: 'white',
                        fontSize: 15,
                        paddingLeft: 0,
                        alignSelf: 'center',
                      }}>
                      I am done
                    </Text>
                    {/* <Text onPress={() => this.setState({ manageContactsModal1: false })} numberOfLines={1} adjustsFontSizeToFit style={{right:15,width:70,height:30,backgroundColor:'#4682B4',textAlign:'center',textAlignVertical:'center',color:'white',fontSize:15,paddingRight:0,alignSelf:'center'}}>Done</Text> */}
                  </View>
                  <Text
                    style={{
                      display: this.state.loadingContactsText,
                      position: 'absolute',
                      top: '50%',
                      alignSelf: 'center',
                      color: 'black',
                    }}>
                    Loading contacts...
                  </Text>
                  {/* </ScrollView> */}
                  {/* <View style={{backgroundColor:'white',height:50,width:screenwidth,borderTopWidth:1,borderTopColor:'black',flexDirection:'row',justifyContent:'space-between',padding:0}}>
                                          <Text numberOfLines={1} adjustsFontSizeToFit style={{left:15,width:70,height:30,backgroundColor:'skyblue',textAlign:'center',textAlignVertical:'center',color:'white',fontSize:15,paddingLeft:0,alignSelf:'center'}}>Switch</Text>
                                          <Text numberOfLines={1} adjustsFontSizeToFit style={{right:15,width:70,height:30,backgroundColor:'skyblue',textAlign:'center',textAlignVertical:'center',color:'white',fontSize:15,paddingRight:0,alignSelf:'center'}}>Done</Text>
                                    </View> */}
                </View>
              </Modal>
              <Modal
                animationType="slide"
                closeOnHardwareBackPress={true}
                transparent={false}
                visible={this.state.isPhoneModalVisible}
                presentationStyle="formSheet"
                // onRequestClose={() => this.setState({ isPhoneModalVisible: false })}
                onDismiss={() => this.setState({isPhoneModalVisible: false})}>
                <View style={styles.viewWrapper}>
                  <View style={styles.modalView}>
                    {/* <Text style={{ color: 'white' }}>Please enter your {this.state.modalMsg}</Text> */}
                    <Text style={{color: 'gray', marginTop: 10, fontSize: 10}}>
                      Please enter your phone number
                    </Text>
                    {/* <TextInput placeholder={this.state.modalMsg}
                                            value={this.state.verifyNumber}
                                            onChangeText={(value) => this.setState({ verifyNumber: value })}
                                            style={{ width: 200, height: 30, marginTop: 35, marginBottom: 15, backgroundColor: 'white', padding: 5 }} /> */}
                    <PhoneInput
                      defaultCode="US"
                      //  placeholder='phone number'
                      //  value={this.state.verifyNumber}
                      containerStyle={{
                        height: 60,
                        width: '90%',
                        marginTop: 30,
                        marginBottom: 15,
                        borderRadius: 5,
                      }}
                      textInputStyle={{
                        paddingVertical: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      textContainerStyle={{
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                      }}
                      autoFocus={false}
                      withShadow={true}
                      onChangeFormattedText={num =>
                        this.setState({verifyNumber: num})
                      }
                    />
                    {/** This button is responsible to close the modal */}
                    <Button
                      title="Enter"
                      onPress={() => {
                        if (this.state.verifyNumber != null)
                          this.togglePhoneModalVisibility();
                      }}
                    />
                  </View>
                </View>
              </Modal>
              <View
                style={{
                  width: screenwidth,
                  height: screenheight + 5,
                  backgroundColor: 'black',
                  display: this.state.showOtpInput,
                  position: 'absolute',
                  alignSelf: 'center',
                  flex: 1,
                }}>
                {this.state.flashopacity && (
                  <FlashMessages
                    ref={rf => (this.flsh = rf)}
                    message={this.state.flashMessage}
                    backcolor={this.state.flashColor}
                    position={this.state.flashPosition}
                    textcolor={this.state.textcolor}
                  />
                )}
                <Text
                  style={{
                    color: '#a5a5a5',
                    position: 'absolute',
                    alignSelf: 'center',
                    marginTop: 20,
                    marginBottom: 10,
                    fontSize: 35,
                    display: this.state.displayOtpCounter,
                  }}>
                  {this.state.otpVerificationCounter}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    position: 'absolute',
                    alignSelf: 'center',
                    top: '10%',
                    fontSize: 16,
                  }}>
                  {this.state.verificationProcessText}
                </Text>
                <Text
                  style={{
                    ...(this.state.verificationProcessText.length > 50
                      ? {display: 'flex'}
                      : {display: 'none'}),
                    fontSize: 13,
                    alignSelf: 'center',
                    top: '18%',
                    padding: 5,
                    color: '#a5a5a5',
                  }}>
                  Code is case sensitive.
                </Text>
                <OTPInputView
                  style={{
                    width: screenwidth,
                    height: 50,
                    top: '40%',
                    position: 'absolute',
                  }}
                  pinCount={4}
                  editable={true}
                  code={this.state.verifyKeyInput}
                  onCodeChanged={code => {
                    this.setState({verifyKeyInput: code});
                  }}
                  autoFocusOnLoad={false}
                  keyboardType="default"
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                    this.getInviteSenderNum(
                      this.state.verifyNumber,
                      this.state.verifyKeyCode,
                      code,
                    );
                  }}></OTPInputView>
                <Text
                  onPress={() =>
                    this.getInviteSenderNum(this.state.verifyNumber, '', '')
                  }
                  style={{
                    color: '#4682B4',
                    alignSelf: 'flex-start',
                    display: this.state.displayResend,
                    position: 'absolute',
                    top: '50%',
                    padding: 5,
                  }}>
                  Resend OTP
                </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    display: this.state.showLoader,
                    backgroundColor: 'black',
                    position: 'absolute',
                    alignSelf: 'center',
                    top: screenheight / 2,
                  }}>
                  <Loader activeBackground="white" background="white" />
                </View>
              </View>
              <Modal
                animationType="slide"
                // transparent={true}
                backdropDismiss={false}
                visible={this.state.showInvitePopup}
                onRequestClose={() => this.setState({showInvitePopup: false})}
                onDismiss={() => this.setState({showInvitePopup: false})}
                presentationStyle="overFullScreen">
                <View
                  style={{flex: 1, backgroundColor: 'lightgray', opacity: 1}}>
                  <SafeAreaView
                    style={{
                      flex: 1,
                      backgroundColor: '#EFEFEF',
                      width: screenwidth,
                      height: screenheight,
                    }}>
                    <FlashMessage
                      position={'top'}
                      ref={rf => (this._refflash = rf)}
                    />
                    {this.state.flashopacity && (
                      <FlashMessages
                        ref={rf => (this.flsh = rf)}
                        message={this.state.flashMessage}
                        backcolor={this.state.flashColor}
                        position={this.state.flashPosition}
                        textcolor={this.state.textcolor}
                      />
                    )}
                    <Animatable.View
                      animation="pulse"
                      easing="ease-out"
                      iterationCount="infinite"
                      style={{
                        display: this.state.connectionOnlineFalse,
                        borderRadius: 1000,
                        position: 'absolute',
                        top: this.state.connectionOnlineTop,
                        left: this.state.connectionOnlineLeft,
                        opacity: this.state.connectionOnlineOpacity,
                        backgroundColor: this.state.connectionOnlineColor,
                        width: this.state.connectionOnlineWidth,
                        height: this.state.connectionOnlineHeight,
                      }}></Animatable.View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        width: screenwidth,
                        height: 50,
                        opacity: 1,
                        position: 'absolute',
                        zIndex: 3,
                      }}>
                      <Text
                        onPress={() => this.goToPreviousPage()}
                        style={{
                          position: 'absolute',
                          color: '#4682B4',
                          alignSelf: 'center',
                          fontSize: 40,
                          padding: 5,
                        }}>
                        &lt;
                      </Text>
                      <Text
                        onPress={() => {
                          // this._refflash.showMessage({ message: this.state.contactToInvite.name, description: this.state.contactToInvite.phoneNumber, position: 'top', animated: true, animationDuration: 300, duration: 2000, alignItems: 'center', textStyle: { textAlign: 'center' }, titleStyle: { textAlign: 'center' }, hideOnPress: true, style: { opacity: 0.8 } })
                          this.setState({
                            flashopacity: true,
                            flashMessage: `${this.state.contactToInvite.name} \n ${this.state.contactToInvite.phoneNumber}`,
                            flashColor: 'lightgray',
                            flashPosition: '0%',
                            textcolor: 'black',
                          });
                          setTimeout(() => {
                            this.setState({flashopacity: false});
                          }, 3500);
                        }}
                        numberOfLines={1}
                        style={{
                          left: '35%',
                          width: '30%',
                          justifyContent: 'center',
                          color: 'black',
                          fontSize: 20,
                          padding: 5,
                          alignSelf: 'center',
                          position: 'absolute',
                          textAlign: 'center',
                        }}>
                        {this.state.contactToInvite.name.length > 10
                          ? this.state.contactToInvite.name.substring(0, 9) +
                            '...'
                          : this.state.contactToInvite.name}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={3}
                      adjustsFontSizeToFit
                      style={{
                        textAlign: 'center',
                        height: 70,
                        padding: 0,
                        width: screenwidth,
                        backgroundColor: '#Ffffe0',
                        color: '#a5a5a5',
                        textAlignVertical: 'center',
                        top: 50,
                        position: 'absolute',
                      }}>
                      {this.state.systemInviteMessage1}
                    </Text>
                    <GiftedChat
                      messagesContainerStyle={{
                        width: screenwidth,
                        top: 50,
                        paddingBottom: 50,
                      }}
                      disableComposer={true}
                      showUserAvatar={false}
                      scrollToBottom={true}
                      isTyping={false}
                      inverted={false}
                      renderActions={() => this.renderDisabledActions()}
                      wrapInSafeArea={false}
                    />
                    <TouchableOpacity
                      disabled={
                        this.state.systemInviteMessage1 ==
                        `Inviting ${this.state.contactToInvite.name}`
                          ? true
                          : false
                      }
                      onPress={() =>
                        this.sendInvite(
                          this.state.contactToInvite.phoneNumber,
                          this.state.randomFlakeOnDevice,
                          this.state.senderPhone,
                        )
                      }
                      style={{
                        height: 40,
                        position: 'absolute',
                        top: '20%',
                        ...(this.state.alreadyInvited
                          ? {display: 'none'}
                          : {display: 'flex'}),
                        backgroundColor: '#4682B4',
                        alignSelf: 'center',
                        marginTop: 30,
                      }}>
                      <Text
                        numberOfLines={2}
                        adjustsFontSizeToFit
                        style={{
                          textAlign: 'center',
                          height: '100%',
                          width: '100%',
                          padding: 10,
                          color: 'white',
                        }}>
                        {this.state.systemInviteMessage2}
                      </Text>
                    </TouchableOpacity>
                  </SafeAreaView>
                </View>
              </Modal>
              <Modal
                animationType="slide"
                transparent={true}
                // backdropDismiss={false}
                visible={this.state.welcomescreenModal}
                onStartShouldSetResponder={false}
                onAccessibilityTap={false}
                // onRequestClose={() => this.setState({ welcomescreenModal: false })}
                // presentationStyle="formSheet"
              >
                {/* // onDismiss={this.togglePhoneModalVisibility}> */}
                <View
                  style={{flex: 1, backgroundColor: 'lightgray', opacity: 1}}>
                  <Animatable.View
                    style={{
                      opacity: 1,
                      backgroundColor: 'white',
                      position: 'absolute',
                      width: '80%',
                      height: '70%',
                      alignSelf: 'center',
                      top: '15%',
                      borderRadius: 0,
                    }}
                    // animation="rubberBand" easing="ease-out" iterationCount="infinite"
                  >
                    <Text
                      style={{
                        fontFamily: 'Courier New',
                        alignSelf: 'center',
                        fontSize: 30,
                        position: 'absolute',
                        top: '5%',
                        color: '#4682B4',
                      }}>
                      {' '}
                      newauth {'\n'}
                    </Text>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={1}
                      style={{
                        top: '15%',
                        alignSelf: 'center',
                        fontSize: 19,
                        position: 'absolute',
                        color: '#4682B4',
                      }}>
                      Secure meets simple
                    </Text>
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        padding: 0,
                        top: '25%',
                        position: 'absolute',
                        width: '80%',
                        borderRadius: 5,
                        alignItems: 'center',
                      }}>
                      <Animatable.Image
                        iterationCount={1}
                        source={this.state.chatIconType}
                        style={{width: 25, height: 25, shadowColor: 'black'}}
                        // animation="bounceOut" easing="ease-out" iterationCount="infinite" duration={5000}
                      />
                      <Animatable.Text
                        numberOfLines={2}
                        adjustsFontSizeToFit
                        style={{
                          flexShrink: 1,
                          fontFamily: 'Courier New',
                          alignSelf: 'center',
                          paddingLeft: 3,
                          color: this.state.chatfontcolor,
                          marginLeft: 0,
                        }}
                        // animation="shake" easing="ease-out" iterationCount="infinite" duration={8000}
                      >
                        <Text style={{fontWeight: 'bold'}}>CHAT.</Text> Your
                        selective, personal, direct chats. No server in between.
                      </Animatable.Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        display: Platform.OS === 'ios' ? 'flex' : 'flex',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        padding: 0,
                        top: '35%',
                        position: 'absolute',
                        width: '80%',
                        borderRadius: 5,
                        alignItems: 'center',
                      }}>
                      <Animatable.Image
                        iterationCount={1}
                        source={this.state.lockIconType}
                        style={{width: 25, height: 25}}
                        // animation="bounceOut" easing="ease-out" iterationCount="infinite" duration={5000}
                      />
                      <Animatable.Text
                        numberOfLines={3}
                        adjustsFontSizeToFit
                        style={{
                          fontFamily: 'Courier New',
                          alignSelf: 'center',
                          paddingLeft: 5,
                          color: this.state.lockfontcolor,
                          marginLeft: 0,
                          flexShrink: 1,
                        }}
                        // animation="shake" easing="ease-out" iterationCount="infinite" duration={8000}
                      >
                        <Text></Text>
                        <Text style={{fontWeight: 'bold'}}>LOCK.</Text> A new
                        kind of lock to secure newauth app.
                        <Text style={{fontSize: 9, fontWeight: 'bold'}}>
                          {' '}
                          A newauth account is advisable. Though not mandatory.
                        </Text>
                      </Animatable.Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={true}
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        padding: 0,
                        top: Platform.OS === 'ios' ? '49%' : '49%',
                        position: 'absolute',
                        width: '80%',
                        borderRadius: 5,
                        alignItems: 'center',
                      }}>
                      <Animatable.Image
                        iterationCount={1}
                        source={this.state.vaultIconType}
                        style={{width: 30, height: 30}}
                        // animation="bounceOut" easing="ease-out" iterationCount="infinite" duration={5000}
                      />
                      <Animatable.Text
                        numberOfLines={3}
                        adjustsFontSizeToFit
                        style={{
                          fontFamily: 'Courier New',
                          alignSelf: 'center',
                          paddingLeft: 3,
                          flexShrink: 1,
                          color: this.state.vaultfontcolor,
                          marginLeft: 0,
                        }}
                        // animation="shake" easing="ease-out" iterationCount="infinite" duration={8000}
                      >
                        <Text style={{fontWeight: 'bold'}}>VAULT.</Text> The
                        vault for your passwords, private keys and anything
                        else.
                        <Text style={{fontSize: 9, fontWeight: 'bold'}}>
                          {' '}
                          Needs a newauth account.
                        </Text>
                      </Animatable.Text>
                    </TouchableOpacity>
                    {/* </View> */}
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        padding: 0,
                        top: '61%',
                        position: 'absolute',
                        width: '90%',
                        height: '10%',
                        borderRadius: 5,
                        alignItems: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={{
                          fontSize: 25,
                          color: '#4682B4',
                          fontFamily: 'Courier New',
                        }}>
                        Choose a login option
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        position: 'absolute',
                        width: '90%',
                        height: '8%',
                        top: '72%',
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => this.handleAccountClick()}
                        style={{
                          borderColor: 'white',
                          backgroundColor: this.state.accountButtonColor,
                          borderWidth: 1,
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignSelf: 'center',
                          padding: 0,
                          marginLeft: '2%',
                          width: '40%',
                          height: '80%',
                          borderRadius: 0,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{color: 'white', fontFamily: 'Courier New'}}>
                          with account
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this.handlePhoneClick()}
                        style={{
                          borderColor: 'white',
                          backgroundColor: this.state.phoneButtonColor,
                          borderWidth: 1,
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignSelf: 'center',
                          padding: 0,
                          marginLeft: '15%',
                          width: '40%',
                          height: '80%',
                          borderRadius: 0,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{color: 'white', fontFamily: 'Courier New'}}>
                          with phone
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => this.handleOKClick()}
                      style={{
                        backgroundColor: '#4682B4',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: '20%',
                        height: '5%',
                        top: '85%',
                        alignSelf: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text style={{color: 'white'}}>OK</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                </View>
              </Modal>
              <Modal
                onRequestClose={() =>
                  this.setState({createAccountModal: false})
                }
                onDismiss={() => this.setState({createAccountModal: false})}
                transparent={true}
                visible={this.state.createAccountModal}
                presentationStyle="overFullScreen">
                <View
                  onStartShouldSetResponder={() =>
                    this.setState({createAccountModal: false})
                  }
                  style={{flex: 1, backgroundColor: 'lightgray'}}>
                  <Animated.View
                    style={{
                      opacity: this.state.fadeInOpacity,
                      backgroundColor: 'white',
                      position: 'absolute',
                      width: '80%',
                      height: '60%',
                      alignSelf: 'center',
                      top: '25%',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Courier New',
                        alignSelf: 'center',
                        fontSize: 30,
                        position: 'absolute',
                        top: '5%',
                        color: '#4682B4',
                      }}>
                      {' '}
                      newauth {'\n'}
                    </Text>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={{
                        top: '15%',
                        alignSelf: 'center',
                        fontSize: 15,
                        position: 'absolute',
                        color: '#4682B4',
                      }}>
                      Secure meets simple
                    </Text>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      onPress={() =>
                        this.setState({
                          createAccountModal: false,
                          showView: true,
                          ...(this.state.filteredContactData.length > 0
                            ? {notificationDialogModal: true}
                            : {}),
                        })
                      }
                      style={[
                        {lineHeight: Platform.OS === 'ios' ? 40 : 20},
                        {
                          width: '40%',
                          height: '10%',
                          alignSelf: 'flex-start',
                          alignItems: 'center',
                          position: 'absolute',
                          textAlignVertical: 'center',
                          textAlign: 'center',
                          color: 'white',
                          top: '45%',
                          backgroundColor: '#4682B4',
                          left: '5%',
                        },
                      ]}>
                      Current User
                    </Text>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      onPress={() =>
                        this.setState({showCreateAccountText: 'flex'})
                      }
                      style={[
                        {lineHeight: Platform.OS === 'ios' ? 40 : 20},
                        {
                          width: '40%',
                          height: '10%',
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                          position: 'absolute',
                          textAlignVertical: 'center',
                          textAlign: 'center',
                          color: 'white',
                          top: '45%',
                          backgroundColor: '#4682B4',
                          right: '5%',
                        },
                      ]}>
                      New User
                    </Text>
                    <Text
                      style={{
                        ...(this.state.showCreateAccountText == 'flex'
                          ? {color: '#4682B4', backgroundColor: 'white'}
                          : {color: '#EFEFEF', backgroundColor: '#EFEFEF'}),
                        borderRadius: 5,
                        position: 'absolute',
                        top: '65%',
                        fontSize: 40,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      {this.state.randomFlakeOnDevice.substring(0, 4)}
                    </Text>
                    <Text
                      adjustsFontSizeToFit
                      style={{
                        ...(this.state.showCreateAccountText == 'flex'
                          ? {color: 'gray', backgroundColor: 'white'}
                          : {color: '#EFEFEF', backgroundColor: '#EFEFEF'}),
                        borderRadius: 5,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        position: 'absolute',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        top: '80%',
                      }}>
                      Please use the above code to create a new account. You can
                      create an account by going to the newauth website at{' '}
                      {'\n'}
                      <Text
                        onPress={() => Linking.openURL('https://newauth.io/')}
                        style={{
                          ...(this.state.showCreateAccountText == 'flex'
                            ? {color: '#4682B4'}
                            : {color: '#EFEFEF'}),
                        }}>
                        https://newauth.io/
                      </Text>
                      {'\n'}works only from desktop devices.
                    </Text>
                  </Animated.View>
                </View>
              </Modal>
              <AwesomeAlert
                show={this.state.acptDenyAlrt}
                onDismiss={() => this.setState({acptDenyAlrt: false})}
                showProgress={false}
                // contentStyle={{ width: 100, height: 25}}
                title={
                  this.state.inviteName + 'sent you an invitation to connect'
                } //{"Connect with " + this.state.invitePhoneNumber}
                message={this.state.invitePhoneNumber}
                messageStyle={{color: '#222222', padding: 0}}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                showCancelButton={true}
                cancelText="Accept"
                confirmText="Decline"
                confirmButtonStyle={{
                  width: 70,
                  textAlign: 'center',
                  alignItems: 'center',
                }}
                cancelButtonStyle={{
                  width: 70,
                  textAlign: 'center',
                  alignItems: 'center',
                }}
                // confirmButtonTextStyle={{ fontSize: 5 }}
                // cancelButtonTextStyle={{fontSize:5}}
                confirmButtonColor="red"
                cancelButtonColor="green"
                onConfirmPressed={() =>
                  this.denyInvite(this.state.inviteRelationId)
                }
                onCancelPressed={() =>
                  this.acceptInvite(this.state.inviteRelationId)
                }
              />
              <AwesomeAlert
                show={this.state.startChatAlert}
                onDismiss={() => this.setState({startChatAlert: false})}
                showProgress={false}
                contentStyle={{width: 100, height: 25}}
                // title="connected with"               //{"Connect with " + this.state.invitePhoneNumber}
                // message={this.state.chatName}
                messageStyle={{color: '#222222', padding: 0}}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                // showCancelButton={true}
                // cancelText="Accept"
                confirmText="Start Chat"
                confirmButtonStyle={{
                  width: 65,
                  textAlign: 'center',
                  alignItems: 'center',
                }}
                // cancelButtonStyle={{ width: 65, textAlign: 'center', alignItems: 'center' }}
                // confirmButtonTextStyle={{ fontSize: 5 }}
                // cancelButtonTextStyle={{fontSize:5}}
                confirmButtonColor="#4682B4"
                // cancelButtonColor="green"
                onConfirmPressed={() =>
                  this.startChatPressed(
                    this.state.chatConvId,
                    this.state.chatIndex,
                  )
                }
                // onCancelPressed={() => this.acceptInvite(this.state.inviteRelationId)}
              />
              <Modal
                transparent={false}
                visible={this.state.inviteInternalUserModal}
                animationType="slide"
                presentationStyle="formSheet"
                onRequestClose={() =>
                  this.setState({inviteInternalUserModal: false})
                }>
                <View
                  onStartShouldSetResponder={() =>
                    this.setState({inviteInternalUserModal: false})
                  }
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    backgroundColor: 'lightgray',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      height: 300,
                      backgroundColor: 'white',
                      position: 'absolute',
                    }}>
                    <Text
                      style={{
                        top: '10%',
                        width: '80%',
                        height: '30%',
                        position: 'absolute',
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: '#4682B4',
                      }}>
                      Invite your friends that are already on newauth.{'\n'}
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={{fontSize: 10}}>
                        {'\n'}Please ask your friend to share their flake with
                        you
                      </Text>
                    </Text>
                    <TextInput
                      style={{
                        position: 'absolute',
                        top: '40%',
                        color: '#343434',
                        alignSelf: 'center',
                        borderWidth: 1,
                        width: '70%',
                        height: '10%',
                        padding: 5,
                        backgroundColor: 'white',
                      }}
                      placeholder="Your friend's flake"
                      editable={true}
                      autoFocus={false}
                      placeholderTextColor="gray"
                      keyboardType="default"
                      value={this.state.friendsFlake}
                      onChangeText={val => this.setState({friendsFlake: val})}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        this.inviteInternalUser(this.state.friendsFlake)
                      }
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        top: '70%',
                        position: 'absolute',
                        width: '40%',
                        height: '15%',
                        backgroundColor: '#4682B4',
                      }}>
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        Invite
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              {/* modal to add notes */}
            </SafeAreaView>
          ) : null}
          {this.state.showPic ? (
            <SafeAreaView style={{flex: 1, backgroundColor: '#A9A9A9'}}>
              <View
                style={{
                  width: screenwidth,
                  top: '0%',
                  marginBottom:
                    (screenheight -
                      Number.parseInt(
                        JSON.stringify(this.state.imgDisplayHeight),
                      )) /
                    2,
                }}>
                <Text style={{fontSize: 13, color: 'gray', marginLeft: 2}}>
                  n e w a u t h
                </Text>
              </View>
              <Animated.View
                //  animation="zoomIn" duration={1000} easing={Easing.linear} iterationCount={1}
                style={{
                  marginLeft: 5,
                  marginRight: 5,
                  width: this.state.imgDisplayWidth,
                  height: this.state.imgDisplayHeight,
                  top: this.state.imgDisplayTop,
                  left: this.state.imgDisplayLeft,
                  display: this.state.visibleSCreen,
                  overflow: 'hidden',
                  position: 'absolute',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  ref={picRef => {
                    this._picRef = picRef;
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    position: 'absolute',
                    overflow: 'hidden',
                  }}
                  onPress={evt => this.calculateImageSize(evt)}
                  onLayout={this.onLayout}>
                  <Animated.Image
                    key={this.state.img}
                    ref={inputRef => {
                      this._inputRef = inputRef;
                    }}
                    style={{
                      width: this.state.originalimagewidth,
                      height: this.state.originalimageheight,
                      marginLeft: this.state.originalimageleft,
                      marginTop: this.state.originalimagetop,
                      resizeMode: 'cover',
                      overflow: 'hidden',
                    }}
                    source={{uri: this.state.img}}></Animated.Image>
                </TouchableOpacity>
                <Text
                  style={{
                    ...(this.state.visibleSCreen == 'flex'
                      ? {display: this.state.displayLines}
                      : {display: 'none'}),
                    position: 'absolute',
                    height: '100%',
                    width: 1,
                    backgroundColor: 'white',
                    alignSelf: 'center',
                  }}></Text>
                <Text
                  style={{
                    display: this.state.displayLines,
                    position: 'absolute',
                    width: '100%',
                    height: 1,
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    top: '50%',
                  }}></Text>
              </Animated.View>
            </SafeAreaView>
          ) : null}
          {this.state.showTimeoutModal ? (
            <Modal
              style={{width: 300, height: 100, backgroundColor: 'red'}}
              visible={this.state.modalvisible}>
              <View style={{backgroundColor: 'pink', flex: 1}}>
                <View
                  style={{
                    width: 300,
                    height: 150,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    marginLeft: 20,
                    marginTop: 200,
                    alignSelf: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 15,
                        alignSelf: 'center',
                        color: 'gray',
                        marginTop: 30,
                        marginLeft: 40,
                      }}>
                      Request did not complete in time
                    </Text>
                    <TouchableOpacity
                      style={{width: 25, height: 25, marginLeft: 10}}
                      onPress={this.closeTimeout}>
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                          backgroundColor: 'red',
                        }}
                        source={require('./cross.jpg')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{fontSize: 15, alignSelf: 'center', marginTop: 5}}>
                    Please try again.
                  </Text>
                  <View
                    style={{
                      width: 90,
                      height: 40,
                      alignSelf: 'center',
                      marginTop: 10,
                    }}>
                    <Button title="Try again" />
                  </View>
                </View>
              </View>
            </Modal>
          ) : null}
          {this.state.showProfileScreen ? (
            <View style={{flex: 1, backgroundColor: '#EFEFEF', height: 640}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  height: 70,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 20,
                    color: 'gray',
                    marginLeft: 20,
                  }}>
                  N e w a u t h
                </Text>
                <View
                  style={{
                    backgroundColor: 'gray',
                    marginLeft: 180,
                    height: 35,
                    width: 40,
                    marginTop: 20,
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: 'gray',
                  }}>
                  <Menu
                    visible={this.state.visibleMenu}
                    anchor={
                      <TouchableOpacity
                        style={{height: 30, width: 35}}
                        onPress={this.showMenu}>
                        <Image
                          source={require('./menuicon.jpg')}
                          style={{
                            height: 32,
                            width: 38,
                            backgroundColor: 'gray',
                            alignSelf: 'center',
                            borderWidth: 1,
                            borderRadius: 5,
                            marginLeft: 1,
                            marginTop: -1,
                          }}
                        />
                      </TouchableOpacity>
                    }
                    onRequestClose={this.hideMenu}>
                    <MenuItem onPress={this.hideMenu}>
                      <View
                        style={{
                          height: 50,
                          width: 200,
                          backgroundColor: 'white',
                        }}>
                        <Image
                          source={require('./home.png')}
                          style={{
                            height: 15,
                            width: 15,
                            marginLeft: 8,
                            backgroundColor: 'gray',
                            marginTop: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            padding: 2,
                          }}>
                          Home
                        </Text>
                      </View>
                    </MenuItem>
                    <MenuItem onPress={this.hideMenu}>
                      <View
                        style={{
                          height: 50,
                          width: 200,
                          backgroundColor: '#white',
                        }}>
                        <Image
                          source={require('./setting.jpg')}
                          style={{
                            height: 15,
                            width: 15,
                            marginLeft: 8,
                            backgroundColor: 'gray',
                            marginTop: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            padding: 2,
                          }}>
                          Setup
                        </Text>
                      </View>
                    </MenuItem>
                    <MenuItem onPress={this.hideMenu}>
                      <View
                        style={{
                          height: 50,
                          width: 200,
                          backgroundColor: 'white',
                        }}>
                        <Image
                          source={require('./lock.png')}
                          style={{
                            height: 15,
                            width: 15,
                            marginLeft: 8,
                            backgroundColor: 'gray',
                            marginTop: 10,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            padding: 2,
                          }}>
                          Vault
                        </Text>
                      </View>
                    </MenuItem>
                    <MenuItem onPress={this.logout}>Log Out</MenuItem>
                  </Menu>
                </View>
              </View>
              <View style={{flex: 1, backgroundColor: 'transparent'}}>
                <ImageBackground
                  source={{uri: this.state.resourcePath.uri}}
                  style={{width: 360, height: 200, flex: 1}}>
                  <ScrollView>
                    <View
                      style={{
                        display: this.state.imgVisible,
                        borderRadius: 3,
                        marginTop: 10,
                        backgroundColor: 'white',
                        height: 400,
                        width: 280,
                        alignSelf: 'center',
                      }}>
                      <View>
                        <Text
                          style={{
                            marginLeft: 20,
                            marginTop: 10,
                            fontSize: 30,
                          }}>
                          {this.state.userGiveOut}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'gray',
                            marginLeft: 20,
                            marginTop: 10,
                          }}>
                          Location
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'gray',
                            marginLeft: 20,
                            marginTop: 10,
                          }}>
                          Occupation
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'gray',
                            marginLeft: 20,
                            marginTop: 10,
                          }}>
                          Something about you.
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={{uri: this.state.resourcePath.uri}}
                          style={{
                            height: 200,
                            width: 250,
                            marginLeft: 15,
                            marginTop: 25,
                          }}
                        />
                        <TouchableOpacity
                          style={{
                            width: 30,
                            height: 30,
                            marginTop: 30,
                            marginLeft: -45,
                            borderRadius: 20,
                            opacity: 0.7,
                          }}
                          onPress={this.selectFile}>
                          <Image
                            source={{
                              uri: 'https://newauth.io/static/icons/plus-50.png',
                            }}
                            style={{width: 30, height: 30, borderRadius: 20}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        height: 200,
                        width: 340,
                        alignSelf: 'center',
                        marginTop: 25,
                      }}>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'gray',
                          borderWidth: 1,
                          width: 300,
                          height: 70,
                          borderColor: 'gray',
                          padding: 10,
                          alignSelf: 'center',
                          marginTop: 15,
                        }}>
                        Post something here...
                      </Text>
                      <Image
                        source={require('./paperclip.png')}
                        style={{
                          height: 30,
                          width: 30,
                          alignSelf: 'center',
                          marginLeft: 30,
                        }}
                      />
                      <View
                        style={{
                          alignSelf: 'center',
                          marginLeft: 15,
                          width: 60,
                        }}>
                        <Button title="Post" onPress={this.showUserPost} />
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        height: 200,
                        width: 340,
                        alignSelf: 'center',
                        marginTop: 25,
                        display: this.state.postVisible,
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          height: 100,
                          width: 300,
                          alignSelf: 'center',
                          marginTop: 25,
                          elevation: 1,
                        }}>
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 20,
                            padding: 20,
                            borderWidth: 1,
                            width: 200,
                            marginTop: 15,
                            borderColor: 'lightgray',
                            color: 'gray',
                          }}>
                          {this.state.postingText}
                        </Text>
                      </View>
                    </View>
                  </ScrollView>
                </ImageBackground>
              </View>
            </View>
          ) : null}
          {this.state.displayFlake ? (
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: '#EFEFEF',
                width: screenwidth,
                height: screenheight,
              }}>
              <View
                style={{
                  zIndex: 6,
                  height: 50,
                  position: 'absolute',
                  width: screenwidth,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => this.goToPreviousPage()}>
                  <Text
                    style={{
                      fontSize: 40,
                      left: 5,
                      top: 0,
                      position: 'absolute',
                      alignSelf: 'flex-start',
                      color: '#4682B4',
                    }}>
                    &lt;
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    left: '45%',
                    alignSelf: 'center',
                    position: 'absolute',
                    color: '#4682B4',
                    fontSize: 15,
                  }}>
                  vault
                </Text>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  ref={ref => (this._txrf = ref)}
                  style={{
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                    alignContent: 'center',
                    left: '65%',
                    width: '30%',
                    textAlign: 'right',
                    position: 'absolute',
                    color: '#4682B4',
                    fontSize: 15,
                    right: 5,
                  }}>
                  {this.state.flakepageheader}
                </Text>
              </View>
              <View
                onStartShouldSetResponder={() =>
                  this.state.search == ''
                    ? this.setState({
                        vaultSearchBar: 'none',
                        siteDetailsModal: false,
                      })
                    : {...this.setState({siteDetailsModal: false})}
                }
                style={{
                  zIndex: 3,
                  position: 'absolute',
                  height: screenheight,
                  width: screenwidth,
                  top: '0%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {this.renderSites()}
                <View
                  style={{
                    top: '8%',
                    display: this.state.vaultSearchBar,
                    position: 'absolute',
                    borderWidth: 1,
                    borderColor: '#4682B4',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    width: 200,
                    alignContent: 'center',
                    height: 35,
                  }}>
                  <TextInput
                    style={{
                      width: 165,
                      marginLeft: 5,
                      fontSize: 12,
                      height: 35,
                      color: 'black',
                    }}
                    placeholder="Search"
                    placeholderTextColor={'black'}
                    value={this.state.search}
                    onChangeText={text => this.SearchFilter(text)}
                  />
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 5,
                      opacity: 0.5,
                    }}
                    source={require('./search.png')}
                  />
                </View>
                <View
                  ref={rrf => (this._gapRef = rrf)}
                  onLayout={this.measureViewPosition}
                  style={{
                    position: 'absolute',
                    width: '80%',
                    aspectRatio: 3 / 2,
                    alignSelf: 'center',
                    top: '40%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* new vault */}
                  <View
                    style={{
                      position: 'absolute',
                      width: '8%',
                      aspectRatio: 1 / 1,
                      borderWidth: 0.5,
                      borderColor: 'gray',
                      borderRadius: 80,
                      left: '32%',
                      top: '4%',
                    }}>
                    <TouchableOpacity
                      disabled={true}
                      onPress={this.toggleModalVisibility}>
                      <Image
                        source={require('./vaultnew.png')}
                        style={{
                          opacity: 0.5,
                          alignSelf: 'center',
                          backgroundColor: 'white',
                          width: '100%',
                          height: '100%',
                          borderRadius: 80,
                          justifyContent: 'center',
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                  {/* plus icon */}
                  <View
                    style={{
                      position: 'absolute',
                      borderRadius: 80,
                      borderWidth: 0.5,
                      borderColor: 'gray',
                      width: '8%',
                      aspectRatio: 1 / 1,
                      left: '60%',
                      top: '4%',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.state.showicons == true
                          ? this.setState({addCredsModal: true})
                          : this.setState({addCredsModal: true})
                      }>
                      <Image
                        source={require('./plus.png')}
                        style={{
                          opacity: 0.5,
                          backgroundColor: 'white',
                          width: '100%',
                          height: '100%',
                          borderRadius: 80,
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                  {/* userdark icon */}
                  <View
                    style={{
                      position: 'absolute',
                      width: '8%',
                      aspectRatio: 1 / 1,
                      top: '23%',
                      left: '19%',
                      borderWidth: 0.5,
                      borderColor: 'gray',
                      borderRadius: 80,
                    }}>
                    <TouchableOpacity disabled={true}>
                      <Image
                        source={require('./userdark.png')}
                        style={{
                          opacity: 0.5,
                          width: '100%',
                          height: '100%',
                          borderRadius: 80,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderRadius: 40,
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                  {/* user icon */}
                  <View
                    style={{
                      position: 'absolute',
                      width: '8%',
                      aspectRatio: 1 / 1,
                      top: '47%',
                      left: '16%',
                      borderRadius: 80,
                      borderColor: 'gray',
                      borderWidth: 0.5,
                    }}>
                    <TouchableOpacity
                      disabled={this.state.showicons == true ? false : true}
                      onPress={() => this.setState({vaultSearchBar: 'flex'})}>
                      <Image
                        source={this.state.usrSrch}
                        style={{
                          opacity: 0.5,
                          borderRadius: 80,
                          backgroundColor: 'lightgray',
                          width: '100%',
                          height: '100%',
                          borderRadius: 80,
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                  {/* logo */}
                  <View
                    style={{
                      flexDirection: 'column',
                      width: '48%',
                      borderRadius: 80,
                      aspectRatio: 1 / 1,
                      position: 'absolute',
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        width: '100%',
                        aspectRatio: 1 / 1,
                        borderRadius: 80,
                        borderColor: 'white',
                        flexDirection: 'row',
                      }}>
                      <Image
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: 80,
                          borderWidth: 5,
                          borderColor: 'white',
                          backgroundColor: 'white',
                          alignSelf: 'center',
                        }}
                        source={require('./blankdarkgrey.png')}
                      />
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          position: 'absolute',
                        }}>
                        <Image
                          style={{
                            position: 'absolute',
                            display: this.state.vaultcenter,
                            width: '100%',
                            height: '100%',
                            borderRadius: 80,
                          }}
                          source={require('./flakeimg.png')}
                        />
                        <Image
                          style={{
                            position: 'absolute',
                            display: this.state.vaulticon,
                            width: '100%',
                            height: '100%',
                            borderRadius: 80,
                            alignSelf: 'center',
                            opacity: 0.2,
                          }}
                          source={require('./vaultgray.png')}
                        />
                      </View>
                    </View>
                  </View>
                  {/* comment icon */}
                  <View
                    style={{
                      position: 'absolute',
                      width: '8%',
                      aspectRatio: 1 / 1,
                      top: '23%',
                      left: '73%',
                      borderRadius: 80,
                      borderColor: 'gray',
                      borderWidth: 0.5,
                    }}>
                    <TouchableOpacity disabled={true}>
                      <Image
                        source={require('./comment.png')}
                        style={{
                          opacity: 0.5,
                          borderRadius: 80,
                          borderColor: 'gray',
                          borderWidth: 0.5,
                          width: '100%',
                          height: '100%',
                          borderRadius: 80,
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                  {/* videocall icon */}
                  <View
                    style={{
                      position: 'absolute',
                      width: '8%',
                      aspectRatio: 1 / 1,
                      left: '76%',
                      top: '47%',
                      borderRadius: 80,
                      borderColor: 'gray',
                      borderWidth: 0.5,
                    }}>
                    <TouchableOpacity disabled={true}>
                      <Image
                        source={require('./videocall.png')}
                        style={{
                          opacity: 0.5,
                          borderRadius: 80,
                          borderColor: 'gray',
                          borderWidth: 0.5,
                          width: '100%',
                          height: '100%',
                          borderRadius: 80,
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* site details modal */}
              <View
                style={{
                  ...(this.state.siteDetailsModal == true
                    ? {display: 'flex'}
                    : {display: 'none'}),
                  flexDirection: 'column',
                  borderRadius: 5,
                  width: '50%',
                  maxHeight: 125,
                  minHeight: 50,
                  zIndex: 7,
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  position: 'absolute',
                  top:
                    this.state.sitedialogpos.top -
                    this.state.sitedialogpos.height,
                }}>
                <Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  style={{
                    color: 'gray',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    textAlignVertical: 'center',
                    height: '30%',
                    fontSize: 13,
                    left: '5%',
                    top: 0,
                  }}>
                  {this.state.siteUrll.length > 15
                    ? this.state.siteUrll.substring(0, 15) + '...'
                    : this.state.siteUrll}
                </Text>
                <FlatList
                  style={{paddingBottom: 5, width: '100%'}}
                  nestedScrollEnabled
                  data={this.state.siteUsername}
                  renderItem={this.renderSiteDetails}
                  keyExtractor={(item, index) => index.toString()}
                  initialNumToRender={5}
                />
              </View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.isModalVisible}
                presentationStyle="formSheet"
                onRequestClose={() =>
                  this.setState({displayFlake: false, showView: true})
                }>
                <View
                  onStartShouldSetResponder={() =>
                    this.setState({displayFlake: false, showView: true})
                  }
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'lightgray',
                  }}>
                  <FlashMessage
                    position={'top'}
                    ref={rf => (this._vaultflash = rf)}
                  />
                  {this.state.flashopacity && (
                    <FlashMessages
                      ref={rf => (this.flsh = rf)}
                      message={this.state.flashMessage}
                      backcolor={this.state.flashColor}
                      position={this.state.flashPosition}
                      textcolor={this.state.textcolor}
                    />
                  )}
                  <View
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                      position: 'absolute',
                      top: '35%',
                      elevation: 5,
                      height: 170,
                      width: '80%',
                      backgroundColor: '#EFEFEF',
                      borderRadius: 7,
                      opacity: 0.9,
                    }}>
                    <Text
                      style={{
                        display: this.state.invalidKeyText,
                        alignSelf: 'center',
                        textAlign: 'center',
                        color: 'gray',
                        top: '5%',
                      }}>
                      {this.state.invalidKeyTextData}
                    </Text>
                    <TextInput
                      placeholder="Enter your secret username as vault key"
                      secureTextEntry={true}
                      value={this.state.vaultvalue}
                      placeholderTextColor="gray"
                      showSoftInputOnFocus={true}
                      onChangeText={value => this.setState({vaultvalue: value})}
                      style={{
                        position: 'absolute',
                        width: '70%',
                        height: '20%',
                        top: '40%',
                        color: '#343434',
                        bottom: '5%',
                        backgroundColor: 'white',
                        fontSize: 10,
                      }}
                    />
                    {/** This button is responsible to close the modal */}
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#4682B4',
                        width: '25%',
                        height: '20%',
                        position: 'absolute',
                        top: '70%',
                      }}
                      onPress={() => this.toggleModalVisibility()}>
                      <Text>ENTER</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.addCredsModal}
                presentationStyle="formSheet"
                onRequestClose={() => this.setState({addCredsModal: false})}
                onDismiss={() => this.setState({addCredsModal: false})}>
                <View style={styles.viewWrapper}>
                  <View style={styles.credsModalView}>
                    <View style={{flexDirection: 'row', width: 280}}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          marginLeft: 100,
                          color: '#989898',
                        }}>
                        Add to vault
                      </Text>
                    </View>
                    <TextInput
                      placeholder={fields[0].description}
                      value={null}
                      placeholderTextColor="gray"
                      onChangeText={value =>
                        (this.state.addSiteFields[0] = {
                          name: fields[0].name,
                          value: value,
                        })
                      }
                      style={{
                        width: 200,
                        height: 23,
                        color: 'gray',
                        marginTop: 5,
                        marginBottom: 0,
                        backgroundColor: 'white',
                        fontSize: 12,
                        padding: 3,
                      }}
                    />
                    <TextInput
                      placeholder={fields[1].description}
                      value={null}
                      placeholderTextColor="gray"
                      onChangeText={value =>
                        (this.state.addSiteFields[1] = {
                          name: fields[1].name,
                          value: value,
                        })
                      }
                      style={{
                        width: 200,
                        height: 23,
                        color: 'gray',
                        marginTop: 5,
                        marginBottom: 0,
                        backgroundColor: 'white',
                        fontSize: 12,
                        padding: 3,
                      }}
                    />
                    <TextInput
                      placeholder={fields[2].description}
                      value={null}
                      placeholderTextColor="gray"
                      onChangeText={value =>
                        (this.state.addSiteFields[2] = {
                          name: fields[2].name,
                          value: value,
                        })
                      }
                      style={{
                        width: 200,
                        height: 23,
                        color: 'gray',
                        marginTop: 5,
                        marginBottom: 0,
                        backgroundColor: 'white',
                        fontSize: 12,
                        padding: 3,
                      }}
                    />
                    <TextInput
                      placeholder={fields[3].description}
                      value={null}
                      placeholderTextColor="gray"
                      onChangeText={value =>
                        (this.state.addSiteFields[3] = {
                          name: fields[3].name,
                          value: value,
                        })
                      }
                      style={{
                        width: 200,
                        height: 23,
                        color: 'gray',
                        marginTop: 5,
                        marginBottom: 0,
                        backgroundColor: 'white',
                        fontSize: 10,
                        padding: 5,
                      }}
                    />
                    <TextInput
                      placeholder={fields[4].description}
                      value={null}
                      placeholderTextColor="gray"
                      onChangeText={value =>
                        (this.state.addSiteFields[4] = {
                          name: fields[4].name,
                          value: value,
                        })
                      }
                      style={{
                        width: 200,
                        height: 23,
                        color: 'gray',
                        marginTop: 5,
                        marginBottom: 5,
                        backgroundColor: 'white',
                        fontSize: 10,
                        padding: 5,
                      }}
                    />
                    {/** This button is responsible to close the modal */}
                    <Button
                      title="submit"
                      onPress={this.AddCredsModalVisibility}
                    />
                  </View>
                </View>
              </Modal>
              <Modal
                animationType="slide"
                visible={false}
                onStartShouldSetResponder={() =>
                  this.setState({siteDetailsModal: false})
                }
                onRequestClose={() => this.setState({siteDetailsModal: false})}
                onAccessibilityTap={() =>
                  this.setState({siteDetailsModal: false})
                }
                onDismiss={() => this.setState({siteDetailsModal: false})}>
                <TouchableOpacity
                  onPress={() => this.setState({siteDetailsModal: false})}
                  style={{
                    flex: 1,
                    position: 'absolute',
                    width: screenwidth,
                    height: screenheight,
                    backgroundColor: 'rgba(256,256,256,0.6',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      borderRadius: 5,
                      width: '50%',
                      height: '8%',
                      backgroundColor: 'white',
                      opacity: 1,
                      alignSelf: 'center',
                      position: 'absolute',
                      top:
                        this.state.sitedialogpos.top -
                        this.state.sitedialogpos.height,
                    }}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={3}
                      style={{
                        color: 'gray',
                        alignItems: 'center',
                        textAlignVertical: 'center',
                        position: 'absolute',
                        height: '80%',
                        width: '60%',
                        left: '5%',
                      }}>
                      {this.state.siteUsername}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        Clipboard.setString(this.state.sitePassword)
                      }
                      style={{
                        width: 20,
                        height: 20,
                        position: 'absolute',
                        left: '70%',
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                        }}
                        source={require('../Screens/copyicon.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.showPasswordDialog()}
                      style={{
                        width: 20,
                        height: 20,
                        position: 'absolute',
                        left: '85%',
                      }}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                        }}
                        source={require('../Screens/eye.png')}
                      />
                    </TouchableOpacity>
                    <Animated.Text
                      style={{
                        color: 'gray',
                        opacity: this.state.showpassword,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        textAlignVertical: 'center',
                        position: 'absolute',
                        height: '60%',
                        width: '60%',
                        left: '60%',
                        top: '70%',
                      }}>
                      {this.state.sitePassword}
                    </Animated.Text>
                  </View>
                </TouchableOpacity>
              </Modal>
              {/* </View> */}
            </SafeAreaView>
          ) : null}
          {this.state.showchatUI ? (
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: '#EFEFEF',
                width: screenwidth,
                height: screenheight,
              }}>
              <FlashMessage />
              {this.state.flashopacity && (
                <FlashMessages
                  ref={rf => (this.flsh = rf)}
                  message={this.state.flashMessage}
                  backcolor={this.state.flashColor}
                  position={this.state.flashPosition}
                  textcolor={this.state.textcolor}
                />
              )}
              <Animated.View
                ref={rf => (this._connectionOnlineRef = rf)}
                style={{
                  display: this.state.connectionOnlineFalse,
                  borderRadius: 1000,
                  position: 'absolute',
                  transform: [{scale: this.state.connectionOnlineScale}],
                  top: this.state.connectionOnlineTop,
                  left: this.state.connectionOnlineLeft,
                  opacity: this.state.connectionOnlineOpacity,
                  backgroundColor: this.state.connectionOnlineColor,
                  width: this.state.connectionOnlineWidth,
                  height: this.state.connectionOnlineHeight,
                }}></Animated.View>
              <Animated.View
                ref={rf => (this._connectionOnlineRef = rf)}
                style={{
                  display: this.state.connectionOnlineTrue,
                  borderRadius: 1000,
                  position: 'absolute',
                  top: this.state.connectionOnlineTop,
                  left: this.state.connectionOnlineLeft,
                  opacity: this.state.connectionOnlineOpacity,
                  backgroundColor: this.state.connectionOnlineColor,
                  width: this.state.connectionOnlineWidth,
                  height: this.state.connectionOnlineHeight,
                }}></Animated.View>
              {/* <ScrollView> */}
              <GiftedChat
                messagesContainerStyle={{
                  width: screenwidth,
                  top: 50,
                  paddingBottom: 50,
                }}
                messages={this.state.chatmessages}
                onSend={messages => this.sendText(messages[0].text)}
                user={{
                  _id: 1,
                  name: 'Test User',
                }}
                showUserAvatar={true}
                scrollToBottom={true}
                // isTyping={this.state.isUserTyping}
                // showAvatarForEveryMessage={true}
                inverted={true}
                shouldUpdateMessage={(props, nextProps) => {
                  console.log(props, nextProps),
                    props.extraData !== nextProps.extraData;
                }}
                onInputTextChanged={this.timerOnSendTypingStatusCall}
                // scrollToBottomComponent={false}
                // initialScrollIndex={300}
                // renderBubble={this.renderBubble}
                renderMessage={props => <this.renderBubble {...props} />}
                renderMessageVideo={this.renderVideo}
                renderMessageImage={this.renderImage}
                renderActions={() => this.renderActions()}
                wrapInSafeArea={false}
                renderInputToolbar={this.renderInputToolbar}
                renderComsposer={this.renderComposer}
                renderSend={this.renderSend}
                renderChatFooter={() => this.renderChatFooter()}
                // renderFooter={() => this.renderFooter()}
                onLongPress={(context, message) =>
                  this.toggleReactionsModal(
                    {},
                    message,
                    {x: 0, y: screenheight - 100},
                    false,
                  )
                }
                // onPress={this.onPress}
                listViewProps={{
                  // Enable virtualization by providing the required props to FlatList
                  virtualizedListProps: {
                    initialNumToRender: 15, // Number of messages to render initially
                    maxToRenderPerBatch: 15, // Number of messages to render in each batch
                    windowSize: 15, // Number of messages to keep in memory
                    removeClippedSubviews: true, // Improve performance by clipping off-screen items
                    scrollEventThrottle: 16, // Increase scroll performance
                    // getItemLayout: this.getItemLayout, // Required for scroll position calculation
                  },
                  onScroll: ({nativeEvent}) => {
                    if (this.isCloseToTop(nativeEvent)) this.loadMoreMessage();
                  },
                }}
                loadEarlier={this.state.loadingsign}
                isLoadingEarlier={this.state.loadingsign}
                renderTime={props => (
                  <Time
                    {...props}
                    timeTextStyle={{
                      left: {color: '#d6d6d6'},
                      right: {color: '#d6d6d6'},
                    }}
                  />
                  // <View >
                  //     <Text style={{ fontSize: 10, marginHorizontal: 10, marginBottom: 5, color: '#d6d6d6' }} bold color={props.position === "left" ? 'gray' : 'white'}>
                  //         {/* {`${new Date(props.currentMessage.createdAt).toLocaleTimeString()}`} */}
                  //         {`${new Date(props.currentMessage.createdAt).toLocaleString({ hour: 'numeric', minute: 'numeric', hour12: true })}`}

                  //     </Text>
                  // </View>
                )}
              />
              {this.state.selectedMessages.length > 0 && (
                <View
                  style={[
                    styles.reactionsContainer,
                    {top: screenheight - 95, height: 40},
                  ]}>
                  <TouchableOpacity
                    disabled={true}
                    onPress={() =>
                      this.onLongPressPopUp(this.state.messageForReactions, 0)
                    }
                    style={styles.reaction}>
                    <Icon name="copy" size={25} color="#D0D0D0" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.onLongPressPopUp(null, 1)}
                    style={styles.reaction}>
                    <Icon name="trash" size={25} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={true}
                    onPress={() =>
                      this.onLongPressPopUp(this.state.messageForReactions, 2)
                    }
                    style={styles.reaction}>
                    <Icon name="reply" size={25} color="#D0D0D0" />
                  </TouchableOpacity>
                </View>
              )}
              <Modal
                visible={this.state.fullscreenimagemodal}
                animationType="slide"
                onRequestClose={() => this.closeFullScreenImage()}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => this.closeFullScreenImage()}>
                  <Image
                    source={{uri: `file:///${this.state.fullScreenImageUri}`}}
                    style={{flex: 1}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </Modal>
              <Modal
                visible={this.state.fullscreenvideomodal}
                animationType="slide"
                onRequestClose={() => this.closeFullScreenVideo()}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => this.closeFullScreenVideo()}>
                  <Video
                    source={{uri: this.state.fullScreenVideoUri}}
                    style={{flex: 1}}
                    resizeMode="contain"
                    controls={true}
                    paused={true}
                  />
                </TouchableOpacity>
              </Modal>
              <Modal
                transparent={true}
                visible={this.state.confirmDocSend}
                animationType="slide"
                onRequestClose={() =>
                  this.setState({
                    confirmDocSend: false,
                    confirmDocSendObject: null,
                  })
                }>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    height: screenheight,
                    width: screenwidth,
                    left: 0,
                    position: 'absolute',
                  }}>
                  <ImageBackground
                    source={{
                      uri:
                        this.state.confirmDocSendObject == null
                          ? null
                          : this.state.confirmDocSendObject.uri,
                    }}
                    style={{
                      flex: 1,
                      width: screenwidth,
                      height: screenheight,
                      resizeMode: 'contain',
                    }}
                    // resizeMode="contain"
                  />
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={{
                      color: 'white',
                      fontSize: 20,
                      elevation: 5,
                      marginLeft: 5,
                      marginTop: 30,
                      backgroundColor: 'gray',
                      opacity: 1,
                      position: 'absolute',
                      borderRadius: 5,
                      padding: 5,
                    }}>
                    To: {this.state.chatName}
                  </Text>
                  <View
                    style={{
                      height: 100,
                      top: (screenheight - 100) / 2,
                      alignSelf: 'center',
                      position: 'absolute',
                      ...(this.state.confirmDocSendObject != null
                        ? this.state.confirmDocSendObject.objtype == 'image'
                          ? {display: 'none'}
                          : {}
                        : {}),
                    }}>
                    <Icon
                      name={'file'}
                      size={100}
                      color={'gray'}
                      style={{
                        alignSelf: 'center',
                        ...(this.state.confirmDocSendObject != null
                          ? this.state.confirmDocSendObject.objtype ==
                            'document'
                            ? {}
                            : {display: 'none'}
                          : {display: 'none'}),
                      }}
                    />
                    <Text
                      numberOfLines={3}
                      adjustsFontSizeToFit
                      style={{
                        color: 'black',
                        padding: 5,
                        fontSize: 15,
                        ...(this.state.confirmDocSendObject != null
                          ? this.state.confirmDocSendObject.objtype == 'text'
                            ? {
                                backgroundColor: 'skyblue',
                                borderRadius: 5,
                                textAlign: 'right',
                                textAlignVertical: 'bottom',
                                margin: 5,
                                display: 'none',
                              }
                            : {textAlign: 'center'}
                          : {textAlign: 'center'}),
                      }}>
                      {this.state.confirmDocSendObject == null
                        ? ''
                        : this.state.confirmDocSendObject.name}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        padding: 5,
                        fontSize: 10,
                        textAlign: 'center',
                      }}>
                      {this.state.confirmDocSendObject == null
                        ? ''
                        : this.state.confirmDocSendObject.size}
                    </Text>
                  </View>
                  <TextInput
                    placeholder=""
                    onChangeText={text => this.editSendDocument(text)}
                    value={this.state.sendingConfirmText}
                    style={{
                      ...(this.state.confirmDocSendObject != null
                        ? this.state.confirmDocSendObject.objtype == 'text'
                          ? {
                              width: '50%',
                              color: 'black',
                              padding: 5,
                              fontSize: 15,
                              backgroundColor: 'skyblue',
                              borderRadius: 5,
                              textAlign: 'right',
                              textAlignVertical: 'top',
                              top: '15%',
                              margin: 5,
                              position: 'absolute',
                              left: '45%',
                              marginRight: 5,
                            }
                          : {textAlign: 'center', display: 'none'}
                        : {textAlign: 'center', display: 'none'}),
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      width: screenwidth,
                      top: '85%',
                      position: 'absolute',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      onPress={() =>
                        this.setState({
                          confirmDocSend: false,
                          confirmDocSendObject: null,
                        })
                      }
                      style={{
                        fontSize: 20,
                        marginLeft: 5,
                        backgroundColor: 'gray',
                        elevation: 5,
                        padding: 5,
                        borderRadius: 5,
                        color: 'white',
                        marginTop: 10,
                      }}>
                      Cancel
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.confirmSendDocument(
                          this.state.confirmDocSendObject,
                        )
                      }
                      style={{
                        marginRight: 5,
                        marginTop: 5,
                        elevation: 5,
                        width: 45,
                        height: 45,
                        backgroundColor: 'gray',
                        borderRadius: 50,
                      }}>
                      <Icon
                        style={{padding: 5}}
                        name={'send'}
                        color={'white'}
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showReactionsModal}
                style={{zIndex: 0}}
                onRequestClose={() =>
                  this.setState({
                    showReactionsModal: false,
                    modalPosition: {x: 0, y: 0},
                    selectedMessages: [],
                  })
                }>
                <TouchableOpacity
                  style={styles.modalBackground}
                  activeOpacity={1}
                  onPress={() =>
                    this.setState({
                      showReactionsModal: false,
                      modalPosition: {x: 0, y: 0},
                      selectedMessages: [],
                    })
                  }>
                  <View
                    style={[
                      styles.reactionsContainer,
                      {top: screenheight - 95, height: 40},
                    ]}>
                    <TouchableOpacity
                      onPress={() =>
                        this.onLongPressPopUp(this.state.messageForReactions, 0)
                      }
                      style={styles.reaction}>
                      <Icon name="copy" size={25} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.onLongPressPopUp(this.state.messageForReactions, 1)
                      }
                      style={styles.reaction}>
                      <Icon name="trash" size={25} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.onLongPressPopUp(this.state.messageForReactions, 2)
                      }
                      style={styles.reaction}>
                      <Icon name="reply" size={25} color="white" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  position: 'absolute',
                  width: screenwidth,
                  height: 50,
                  opacity: 1,
                }}>
                <Text
                  onPress={() => this.goToPreviousPage()}
                  style={{
                    position: 'absolute',
                    color: '#4682B4',
                    alignSelf: 'center',
                    fontSize: 40,
                    padding: 5,
                  }}>
                  &lt;
                </Text>
                <Text
                  onPress={() => {
                    this.setState({
                      flashopacity: true,
                      flashMessage: `${this.state.chatName}(${this.state.chatPhoneNumber}) \n ${this.state.chatUserStatus}`,
                      flashColor: 'lightgray',
                      flashPosition: '0%',
                      textcolor: 'black',
                    });
                    setTimeout(() => {
                      this.setState({flashopacity: false});
                    }, 3500);
                  }}
                  numberOfLines={1}
                  style={{
                    left: '35%',
                    width: '30%',
                    justifyContent: 'center',
                    ...(this.state.filteredContactData[this.state.chatIndex]
                      .status == 'inchat'
                      ? {color: '#4682B4', fontWeight: 'bold'}
                      : {color: 'gray', fontWeight: 'normal'}),
                    fontSize: 20,
                    padding: 5,
                    alignSelf: 'center',
                    position: 'absolute',
                    textAlign: 'center',
                  }}>
                  {this.state.chatName.length > 10
                    ? this.state.chatName.substring(0, 9) + '...'
                    : this.state.chatName}
                </Text>
                <Text
                  style={{
                    color: '#4682B4',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    textAlign: 'center',
                    padding: 5,
                    left: '70%',
                  }}>
                  {this.state.isUserTyping ? 'Typing...' : ''}
                </Text>
              </View>
            </SafeAreaView>
          ) : null}
          {this.state.UnlockScreenUI ? (
            <SafeAreaView
              style={{
                flex: 1,
                width: screenwidth,
                height: screenheight,
                backgroundColor: '#EFEFEF',
                position: 'absolute',
                ...(Platform.OS === 'ios' ? {marginTop: 18} : {}),
              }}>
              <View
                style={{
                  flex: 1,
                  width: screenwidth,
                  height: screenheight,
                  backgroundColor: '#EFEFEF',
                  position: 'absolute',
                }}>
                {this.state.flashopacity && (
                  <FlashMessages
                    ref={rf => (this.flsh = rf)}
                    message={this.state.flashMessage}
                    backcolor={this.state.flashColor}
                    position={this.state.flashPosition}
                    textcolor={this.state.textcolor}
                  />
                )}
                <View
                  style={{
                    width: screenwidth - 10,
                    paddingTop: 20,
                    height: 50,
                    zIndex: 1,
                  }}>
                  <TouchableOpacity
                    style={{
                      ...(this.state.isValidatingLock == true
                        ? {display: 'flex'}
                        : {display: 'none'}),
                      width: 40,
                      height: 40,
                      alignSelf: 'flex-start',
                      position: 'absolute',
                      marginLeft: 0,
                      marginTop: 0,
                    }}
                    onPress={() =>
                      this.setState({
                        UnlockScreenUI: false,
                        showView: true,
                        enableLockProcessModal: false,
                      })
                    }>
                    <Text
                      style={{
                        color: '#4682B4',
                        fontSize: 40,
                        padding: 0,
                        alignSelf: 'center',
                        textAlign: 'center',
                        position: 'absolute',
                      }}>
                      &lt;
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={temp_password == '' ? true : false}
                    style={{position: 'absolute', alignSelf: 'center'}}
                    onPress={() =>
                      isApplLocked == false
                        ? this.ConfigureUnlockScreen(temp_password)
                        : {}
                    }>
                    <Image
                      source={
                        temp_password == ''
                          ? require('./lockroundgray.png')
                          : require('./lock.png')
                      }
                      style={{
                        ...(this.state.isValidatingLock == true
                          ? {display: 'none'}
                          : {display: 'flex'}),
                        alignSelf: 'center',
                        width: 30,
                        height: 30,
                        marginTop: 5,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    onPress={() => {
                      (temp_password = ''),
                        (this.state.LockValidationObject.onelongpress = 0),
                        (this.state.LockValidationObject.twodots = 0),
                        (this.state.LockValidationObject.threeclicks = 0),
                        (this.state.LockValidationObject.show = 'none'),
                        this.forceUpdate();
                    }}
                    style={{
                      ...(isApplLocked == true
                        ? {display: 'none'}
                        : this.state.isValidatingLock == true
                        ? {display: 'none'}
                        : {display: 'flex'}),
                      color: 'black',
                      alignSelf: 'flex-end',
                      position: 'absolute',
                      marginRight: 15,
                      marginTop: 5,
                    }}>
                    Reset
                  </Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      ...(this.state.isValidatingLock == true
                        ? {display: 'flex'}
                        : failed_password_tries >= 4
                        ? {display: 'flex'}
                        : {display: 'none'}),
                      backgroundColor: 'white',
                      alignSelf: 'flex-end',
                      position: 'absolute',
                      shadowColor: '#64A532',
                      marginRight: 15,
                      marginTop: 5,
                      width: 40,
                      height: 40,
                      borderLeftColor: this.state.blw,
                      borderRightColor: this.state.brw,
                      borderTopColor: this.state.btw,
                      borderBottomColor: this.state.bbw,
                      borderWidth: 5,
                      borderRadius: 10,
                    }}></TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    ...(this.state.isValidatingLock == true
                      ? {display: 'flex'}
                      : failed_password_tries >= 4
                      ? {display: 'flex'}
                      : {display: 'none'}),
                    zIndex: 5,
                    alignSelf: 'flex-end',
                    width: 36,
                    height: 36,
                    right: 12,
                    top: 7,
                    backgroundColor: 'white',
                    borderRadius: 0,
                    position: 'absolute',
                    elevation: 25,
                  }}>
                  <Text
                    style={{
                      color: '#a5a5a5',
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}>
                    {borderindex}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: screenwidth,
                    height: '90%',
                    marginTop: '0%',
                    position: 'absolute',
                  }}>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{
                      color: 'white',
                      position: 'absolute',
                      top: '50%',
                      alignSelf: 'center',
                      width: '100%',
                      fontSize: screenwidth,
                      opacity: 0.5,
                      textAlign: 'center',
                    }}>
                    n e w a u t h
                  </Text>
                  {this.renderUnlockScreenData()}
                </View>
              </View>
              <Modal
                transparent={true}
                visible={this.state.LockInstructionsModal}
                presentationStyle="overFullScreen"
                animationType="none"
                onRequestClose={() => this.closeLockInstructionsModal()}
                onDismiss={() => this.closeLockInstructionsModal()}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.closeLockInstructionsModal()}
                  style={{
                    width: screenwidth,
                    height: screenheight,
                    backgroundColor: 'rgba(256,256,256,0.6',
                  }}>
                  <View
                    style={{
                      width: '70%',
                      alignSelf: 'center',
                      top: (screenheight - 350) / 2,
                      height: 350,
                      backgroundColor: 'white',
                      elevation: 5,
                      position: 'absolute',
                    }}>
                    <Text
                      style={{
                        color: '#676767',
                        fontSize: 25,
                        textAlign: 'center',
                        marginTop: 5,
                      }}>
                      Newauth lock
                    </Text>
                    <Text
                      style={{
                        color: '#676767',
                        fontSize: 15,
                        textAlign: 'center',
                        marginTop: 15,
                      }}>
                      You lock and unlock by clicking on dots
                    </Text>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={2}
                      style={{
                        color: '#676767',
                        padding: 5,
                        textAlign: 'center',
                        marginTop: 5,
                        fontSize: 13,
                      }}>
                      Choose your dots and click on lock icon{' '}
                      {<Icon name="lock" size={15} color="gray" />} to create
                      your lock*
                    </Text>
                    <View style={{marginTop: 30, width: '100%'}}>
                      <Text
                        style={{
                          color: '#676767',
                          fontSize: 15,
                          marginLeft: 25,
                          marginTop: 5,
                        }}>
                        3- At least three clicks{' '}
                        {this.state.LockValidationObject.threeclicks >= 3 ? (
                          <Text
                            style={{
                              ...(this.state.LockValidationObject.show == 'none'
                                ? {color: 'white'}
                                : {color: 'green'}),
                              fontSize: 30,
                            }}>
                            &#10003;
                          </Text>
                        ) : (
                          <Text
                            style={{
                              ...(this.state.LockValidationObject.show == 'none'
                                ? {color: 'white'}
                                : {color: 'red'}),
                              fontSize: 30,
                            }}>
                            &times;
                          </Text>
                        )}
                      </Text>
                      <Text
                        style={{
                          color: '#676767',
                          fontSize: 15,
                          marginLeft: 25,
                          marginTop: 5,
                        }}>
                        2- At least two dots{' '}
                        {this.state.LockValidationObject.twodots >= 2 ? (
                          <Text
                            style={{
                              ...(this.state.LockValidationObject.show == 'none'
                                ? {color: 'white'}
                                : {color: 'green'}),
                              fontSize: 30,
                            }}>
                            &#10003;
                          </Text>
                        ) : (
                          <Text
                            style={{
                              ...(this.state.LockValidationObject.show == 'none'
                                ? {color: 'white'}
                                : {color: 'red'}),
                              fontSize: 30,
                            }}>
                            &times;
                          </Text>
                        )}
                      </Text>
                      <Text
                        style={{
                          color: '#676767',
                          fontSize: 15,
                          marginLeft: 25,
                          marginTop: 5,
                        }}>
                        1- At least one long press{' '}
                        {this.state.LockValidationObject.onelongpress >= 1 ? (
                          <Text
                            style={{
                              ...(this.state.LockValidationObject.show == 'none'
                                ? {color: 'white'}
                                : {color: 'green'}),
                              fontSize: 30,
                            }}>
                            &#10003;
                          </Text>
                        ) : (
                          <Text
                            style={{
                              ...(this.state.LockValidationObject.show == 'none'
                                ? {color: 'white'}
                                : {color: 'red'}),
                              fontSize: 30,
                            }}>
                            &times;
                          </Text>
                        )}
                      </Text>
                      {/* &times; &#10003; */}
                    </View>
                  </View>
                </TouchableOpacity>
              </Modal>
              <Modal
                transparent={true}
                visible={this.state.AppDisabledModal}
                presentationStyle="overFullScreen"
                animationType="none">
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'lightgray',
                    opacity: 0.7,
                    width: screenwidth,
                    height: screenheight,
                    position: 'absolute',
                  }}>
                  <FlashMessage ref={rf => (this._appdisableflash = rf)} />
                  {this.state.flashopacity && (
                    <FlashMessages
                      ref={rf => (this.flsh = rf)}
                      message={this.state.flashMessage}
                      backcolor={this.state.flashColor}
                      position={this.state.flashPosition}
                      textcolor={this.state.textcolor}
                    />
                  )}
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{
                      color: '#a5a5a5',
                      alignSelf: 'center',
                      fontSize: screenwidth,
                      top: '40%',
                    }}>
                    Disabled
                  </Text>
                </View>
              </Modal>
            </SafeAreaView>
          ) : null}
          {this.state.NotesAppScreen ? (
            <SafeAreaView
              style={{
                flex: 1,
                width: screenwidth,
                height: screenheight,
                backgroundColor: '#EFEFEF',
              }}>
              <View
                onStartShouldSetResponder={() =>
                  this.setState({
                    showDeleteNote: 'none',
                    NoteDetailModal: false,
                  })
                }
                style={{
                  zIndex: 3,
                  flex: 1,
                  width: screenwidth,
                  height: screenheight,
                  backgroundColor: '#EFEFEF',
                }}>
                <View
                  style={{
                    width: screenwidth,
                    marginTop: 7,
                    height: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={() => this.goToPreviousPage()}>
                    <Text
                      style={{
                        zIndex: 6,
                        color: '#4682B4',
                        textAlign: 'center',
                        fontSize: 40,
                        width: 40,
                        height: 40,
                        includeFontPadding: false,
                        marginTop: 0,
                        paddingTop: 0,
                      }}>
                      &lt;
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'flex-start',
                      display: this.state.showSearchNotesBar,
                      top: '1%',
                      borderWidth: 1,
                      borderColor: '#4682B4',
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      width: 200,
                      alignContent: 'center',
                      height: 35,
                    }}>
                    <TextInput
                      style={{
                        zIndex: 6,
                        width: 165,
                        marginLeft: 5,
                        height: 35,
                        fontSize: 12,
                        color: 'black',
                        textAlignVertical: 'center',
                      }}
                      placeholder="Search"
                      placeholderTextColor={'black'}
                      value={this.state.searchnotes}
                      onChangeText={text => this.SearchNotesFilter(text)}
                    />
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        marginTop: 5,
                        opacity: 0.5,
                      }}
                      source={require('./search.png')}
                    />
                  </View>
                  <Text
                    style={{color: '#767676', fontSize: 20, marginRight: 7}}>
                    Notes
                  </Text>
                </View>
                <View
                  style={{
                    display: this.state.showDeleteNote,
                    flexDirection: 'column',
                    height: 25,
                    width: 25,
                    position: 'absolute',
                    top: '93%',
                    left: '90%',
                  }} //step 13
                  onLayout={this.setDropZoneValuesNote.bind(this)}>
                  <Image
                    source={require('./deletegray.png')}
                    style={{
                      width: 25,
                      height: 25,
                      opacity: 0.5,
                      marginTop: 0,
                      alignSelf: 'center',
                      zIndex: 7,
                    }}
                  />
                </View>
                {this.renderNotes()}
                {/* plus icon */}
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      DisplayAddNoteDialog: 'flex',
                      ExpireNotesText: 'a week',
                      ExpireNotesValue: '7',
                    })
                  }
                  style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    top: (screenheight - 100) / 2,
                    width: 100,
                    height: 100,
                    backgroundColor: 'lightgray',
                    borderRadius: 90,
                  }}>
                  <Image
                    source={require('./plus.png')}
                    style={{
                      width: 50,
                      height: 50,
                      alignSelf: 'center',
                      top: 25,
                      borderRadius: 80,
                    }}
                  />
                </TouchableOpacity>
                {/* add note view */}
                <View
                  style={{
                    zIndex: 4,
                    display: this.state.DisplayAddNoteDialog,
                    width: '80%',
                    height: '35%',
                    backgroundColor: 'white',
                    top: '30%',
                    position: 'absolute',
                    alignSelf: 'center',
                    borderRadius: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'absolute',
                      top: 5,
                      alignSelf: 'flex-end',
                      height: '10%',
                    }}>
                    <Text
                      style={{color: '#787878', marginRight: 3, marginTop: 3}}>
                      Expires in
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ExpireNotesModal: true});
                      }}
                      style={{
                        alignSelf: 'flex-end',
                        width: '40%',
                        marginRight: 5,
                        height: '90%',
                        backgroundColor: '#4682B4',
                      }}>
                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={{textAlign: 'center', color: 'white'}}>
                        {this.state.ExpireNotesText}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={{
                      textAlignVertical: 'top',
                      position: 'absolute',
                      color: '#787878',
                      alignSelf: 'center',
                      fontSize: 15,
                      width: '90%',
                      height: '69%',
                      top: '11%',
                      backgroundColor: 'white',
                    }}
                    placeholder="Add a note..."
                    editable={true}
                    multiline={true}
                    placeholderTextColor="gray"
                    keyboardType="default"
                    value={this.state.UserNotes}
                    onChangeText={val => this.setState({UserNotes: val})}
                  />
                  <View
                    style={{
                      top: '82%',
                      position: 'absolute',
                      alignSelf: 'center',
                      width: '80%',
                      height: '15%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.SaveNotesOnDevice(this.state.UserNotes),
                          dismissKeyboard();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'flex-start',
                        width: '40%',
                        marginRight: '0%',
                        height: '100%',
                        backgroundColor: '#4682B4',
                      }}>
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        Save
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({DisplayAddNoteDialog: 'none'}),
                          dismissKeyboard();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        width: '40%',
                        marginRight: '0%',
                        height: '100%',
                        backgroundColor: '#4682B4',
                      }}>
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* note details */}
              <View
                style={{
                  ...(this.state.NoteDetailModal == true
                    ? {display: 'flex'}
                    : {display: 'none'}),
                  zIndex: 5,
                  position: 'absolute',
                  width: '80%',
                  top: this.state.NoteDotTop,
                  left: '10%',
                  borderRadius: 8,
                  backgroundColor: 'white',
                  flexDirection: 'column',
                }}>
                <ScrollView
                  indicatorStyle="black"
                  style={{
                    height: 100,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    borderBottomWidth: 1,
                    borderColor: '#EFEFEF',
                  }}>
                  <Text style={{color: '#787878', padding: 5, fontSize: 15}}>
                    {this.state.NoteDetails}
                  </Text>
                </ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 30,
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#a5a5a5',
                      height: 30,
                      position: 'absolute',
                      left: 0,
                      top: '25%',
                      padding: 5,
                      fontSize: 8,
                    }}>
                    {this.state.NoteExpiringIn}
                  </Text>
                </View>
              </View>
              <Modal
                animationType="slide"
                transparent={false}
                visible={false}
                onRequestClose={() => this.setState({NoteDetailModal: false})}
                onDismiss={() => this.setState({NoteDetailModal: false})}>
                <TouchableOpacity
                  onPress={() => this.setState({NoteDetailModal: false})}
                  activeOpacity={1}
                  style={{
                    width: screenwidth,
                    height: screenheight,
                    backgroundColor: 'rgba(256,256,256,0.6',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      top: this.state.NoteDotTop,
                      left: '10%',
                      borderRadius: 8,
                      backgroundColor: 'white',
                      flexDirection: 'column',
                    }}>
                    <Text style={{color: '#787878', padding: 5}}>
                      {this.state.NoteDetails}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        height: 30,
                        alignItems: 'stretch',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#a5a5a5',
                          height: 30,
                          position: 'absolute',
                          left: '73%',
                          top: '25%',
                          padding: 5,
                          fontSize: 8,
                        }}>
                        {this.state.NoteExpiringIn}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Modal>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.ExpireNotesModal}
                presentationStyle="overFullScreen"
                onRequestClose={() => this.setState({ExpireNotesModal: false})}
                onDismiss={() => this.setState({ExpireNotesModal: false})}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.setState({ExpireNotesModal: false})}
                  style={{flex: 1, width: screenwidth, height: screenheight}}>
                  <View
                    style={{
                      width: screenwidth / 3,
                      height: 100,
                      justifyContent: 'space-between',
                      top: (screenheight - 300) / 2,
                      alignSelf: 'flex-end',
                      backgroundColor: '#EFEFEF',
                    }}>
                    <Text
                      onPress={() =>
                        this.setState({
                          ExpireNotesValue: '7',
                          ExpireNotesModal: false,
                          ExpireNotesText: 'a week',
                        })
                      }
                      style={{
                        color: '#4682B4',
                        textAlign: 'center',
                        borderBottomWidth: 0.5,
                        height: 30,
                      }}>
                      a week
                    </Text>
                    <Text
                      onPress={() =>
                        this.setState({
                          ExpireNotesValue: '30',
                          ExpireNotesModal: false,
                          ExpireNotesText: 'a month',
                        })
                      }
                      style={{
                        color: '#787878',
                        textAlign: 'center',
                        borderBottomWidth: 0.5,
                        height: 30,
                      }}>
                      a month
                    </Text>
                    <Text
                      onPress={() =>
                        this.setState({
                          ExpireNotesValue: '50000',
                          ExpireNotesModal: false,
                          ExpireNotesText: 'never',
                        })
                      }
                      style={{
                        color: '#787878',
                        textAlign: 'center',
                        borderBottomWidth: 0.5,
                        height: 30,
                      }}>
                      never
                    </Text>
                  </View>
                </TouchableOpacity>
              </Modal>
            </SafeAreaView>
          ) : null}
          {this.state.FoodsAppScreen ? (
            <SafeAreaView
              style={{
                zIndex: 3,
                flex: 1,
                width: screenwidth,
                height: screenheight,
                backgroundColor: '#EFEFEF',
              }}>
              <View
                onStartShouldSetResponder={() =>
                  this.setState({
                    FoodDetailModal: false,
                    DisplayFeedbackEmojis: 'none',
                    FoodDetailsImage: null,
                  })
                }
                style={{
                  flex: 1,
                  width: screenwidth,
                  height: screenheight,
                  backgroundColor: '#EFEFEF',
                }}>
                <FlashMessage position={'center'} />
                {this.state.flashopacity && (
                  <FlashMessages
                    ref={rf => (this.flsh = rf)}
                    message={this.state.flashMessage}
                    backcolor={this.state.flashColor}
                    position={this.state.flashPosition}
                    textcolor={this.state.textcolor}
                  />
                )}
                <View
                  style={{
                    justifyContent: 'space-between',
                    height: 40,
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: screenwidth,
                    marginTop: 0,
                  }}>
                  <TouchableOpacity onPress={() => this.goToPreviousPage()}>
                    <Text
                      style={{
                        color: '#4682B4',
                        textAlign: 'center',
                        width: 40,
                        height: 40,
                        paddingTop: 0,
                        marginTop: 0,
                        fontSize: 40,
                        includeFontPadding: false,
                      }}>
                      &lt;
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{color: '#767676', fontSize: 20, marginRight: 7}}>
                    Food mood
                  </Text>
                </View>
                {/* plus icon */}
                <TouchableOpacity
                  onPress={() => this.setState({DisplayAddFoodDialog: 'flex'})}
                  style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    top: (screenheight - 100) / 2,
                    width: 100,
                    height: 100,
                    backgroundColor: 'lightgray',
                    borderRadius: 90,
                  }}>
                  <Image
                    source={require('./plus.png')}
                    style={{
                      width: 50,
                      height: 50,
                      alignSelf: 'center',
                      borderRadius: 80,
                      top: 25,
                    }}
                  />
                </TouchableOpacity>
                {this.renderFoods()}
                {/* add a food view */}
                <View
                  style={{
                    zIndex: 4,
                    display: this.state.DisplayAddFoodDialog,
                    alignItems: 'center',
                    width: '80%',
                    height: 200,
                    backgroundColor: 'white',
                    top: (screenheight - 200) / 2,
                    position: 'absolute',
                    alignSelf: 'center',
                    borderRadius: 5,
                  }}>
                  <TextInput
                    style={{
                      textAlignVertical: 'top',
                      position: 'absolute',
                      color: '#787878',
                      alignSelf: 'center',
                      width: '90%',
                      top: '10%',
                      backgroundColor: 'white',
                    }}
                    placeholder="What are you eating??"
                    editable={true}
                    maxLength={20}
                    autoFocus={false}
                    blurOnSubmit={false}
                    multiline={true}
                    placeholderTextColor="gray"
                    keyboardType="default"
                    value={this.state.UserFoods}
                    onChangeText={val => this.setState({UserFoods: val})}
                  />
                  <View
                    style={{
                      width: 80,
                      flexDirection: 'row',
                      alignSelf: 'center',
                      top: '30%',
                      position: 'absolute',
                    }}>
                    <Image
                      source={{uri: this.state.UserFoodImage}}
                      style={{
                        width: 80,
                        height: 80,
                        marginLeft: 0,
                        alignSelf: 'center',
                        left: 0,
                      }}
                    />
                    <Icon
                      name="camera"
                      size={this.state.UserFoodImage == null ? 30 : 15}
                      color="#000"
                      style={{
                        marginRight: 0,
                        alignSelf: 'flex-start',
                        ...(this.state.UserFoodImage == null
                          ? {marginLeft: -55}
                          : {marginLeft: -47}),
                        marginTop: 35,
                      }}
                      onPress={() => this.clickFoodImage()}
                    />
                  </View>
                  <View
                    style={{
                      top: '82%',
                      position: 'absolute',
                      alignSelf: 'center',
                      width: '80%',
                      height: '15%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.SaveFoodsOnDevice(this.state.UserFoods),
                          dismissKeyboard();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'flex-start',
                        width: '40%',
                        marginRight: '0%',
                        height: '100%',
                        backgroundColor: '#4682B4',
                      }}>
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        Save
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          DisplayAddFoodDialog: 'none',
                          UserFoods: '',
                          UserFoodImage: null,
                        }),
                          dismissKeyboard();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignSelf: 'center',
                        width: '40%',
                        marginRight: '0%',
                        height: '100%',
                        backgroundColor: '#4682B4',
                      }}>
                      <Text style={{textAlign: 'center', color: 'white'}}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* food details */}
              <View
                style={{
                  ...(this.state.FoodDetailModal == true
                    ? {display: 'flex'}
                    : {display: 'none'}),
                  width: '80%',
                  position: 'absolute',
                  zIndex: 5,
                  top: this.state.FoodDotTop,
                  left: '10%',
                  borderRadius: 8,
                  backgroundColor: 'white',
                  flexDirection: 'column',
                }}
                onLayout={evt => console.log(evt.nativeEvent)}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    ...(this.state.FoodDetailsImage == null
                      ? {justifyContent: 'center'}
                      : {}),
                  }}>
                  <Image
                    style={{
                      ...(this.state.FoodDetailsImage == null
                        ? {display: 'none'}
                        : {display: 'flex', alignSelf: 'flex-start'}),
                      width: 80,
                      height: 80,
                      borderRadius: 0,
                      top: 5,
                      left: 5,
                      backgroundColor: 'white',
                    }}
                    onLayout={() => this.setState({updateUIState: false})}
                    source={{uri: this.state.FoodDetailsImage}}
                  />
                  <ScrollView
                    indicatorStyle="black"
                    style={{
                      height: 50,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}>
                    <Text
                      numberOfLines={2}
                      adjustsFontSizeToFit
                      style={{
                        color: '#787878',
                        padding: 5,
                        ...(this.state.FoodDetailsImage == null
                          ? {alignSelf: 'center'}
                          : {left: 10}),
                        alignSelf: 'center',
                        fontSize: 17,
                      }}>
                      {this.state.FoodDetails}
                    </Text>
                  </ScrollView>
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{
                      color: '#787878',
                      marginRight: 5,
                      alignSelf: 'flex-start',
                      fontSize: 10,
                      margin: 5,
                    }}>
                    {this.state.FoodDetailsAvgScore}/5
                  </Text>
                </View>
                <Text
                  onPress={() => this.setState({DisplayFeedbackEmojis: 'flex'})}
                  style={{
                    color: '#4682B4',
                    padding: 5,
                    alignSelf: 'center',
                    display: 'none',
                  }}>
                  I am feeling
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    padding: 10,
                    alignSelf: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 20,
                    }}
                    onPress={() =>
                      this.AddFeelingsToFood(this.state.AddFeelingIndex, 5)
                    }>
                    {String.fromCodePoint(0x1f60d)}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 20,
                    }}
                    onPress={() =>
                      this.AddFeelingsToFood(this.state.AddFeelingIndex, 4)
                    }>
                    {String.fromCodePoint(0x1f600)}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 20,
                    }}
                    onPress={() =>
                      this.AddFeelingsToFood(this.state.AddFeelingIndex, 3)
                    }>
                    {String.fromCodePoint(0x1f615)}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 20,
                    }}
                    onPress={() =>
                      this.AddFeelingsToFood(this.state.AddFeelingIndex, 2)
                    }>
                    {String.fromCodePoint(0x1f621)}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: 20,
                    }}
                    onPress={() =>
                      this.AddFeelingsToFood(this.state.AddFeelingIndex, 1)
                    }>
                    {String.fromCodePoint(0x1f624)}
                  </Text>
                </View>
              </View>
              <Modal
                animationType="fade"
                transparent={true}
                visible={false}
                style={{
                  position: 'absolute',
                  flex: 1,
                  width: screenwidth,
                  height: screenheight,
                }}
                onRequestClose={() =>
                  this.setState({
                    FoodDetailModal: false,
                    FoodDetailsImage: null,
                  })
                }
                onDismiss={() =>
                  this.setState({
                    FoodDetailModal: false,
                    FoodDetailsImage: null,
                  })
                }>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      FoodDetailModal: false,
                      DisplayFeedbackEmojis: 'none',
                      FoodDetailsImage: null,
                    })
                  }
                  activeOpacity={1}
                  style={{
                    width: screenwidth,
                    height: screenheight,
                    backgroundColor: 'rgba(256,256,256,0.6',
                  }}>
                  <View
                    style={{
                      width: '80%',
                      position: 'absolute',
                      height: 200,
                      top: this.state.FoodDotTop,
                      left: '10%',
                      borderRadius: 8,
                      backgroundColor: 'white',
                      flexDirection: 'column',
                    }}
                    onLayout={evt => console.log(evt.nativeEvent)}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={{
                        color: '#787878',
                        padding: 5,
                        alignSelf: 'center',
                        fontSize: 15,
                      }}>
                      {this.state.FoodDetails}
                    </Text>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={{
                        color: '#787878',
                        padding: 5,
                        alignSelf: 'flex-end',
                        fontSize: 7,
                      }}>
                      {this.state.FoodDetails}
                    </Text>
                    <Image
                      style={{
                        ...(this.state.FoodDetailsImage == null
                          ? {display: 'flex'}
                          : {display: 'flex'}),
                        width: 80,
                        height: 80,
                        borderRadius: 80,
                        alignSelf: 'center',
                        backgroundColor: 'white',
                      }}
                      onLayout={() => this.setState({updateUIState: false})}
                      source={{uri: this.state.FoodDetailsImage}}
                    />
                    <Text
                      onPress={() =>
                        this.setState({DisplayFeedbackEmojis: 'flex'})
                      }
                      style={{
                        color: '#4682B4',
                        padding: 5,
                        alignSelf: 'center',
                        display: 'none',
                      }}>
                      I am feeling
                    </Text>
                    <View
                      style={{
                        marginTop: 5,
                        padding: 10,
                        alignSelf: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 20,
                        }}
                        onPress={() =>
                          this.AddFeelingsToFood(this.state.AddFeelingIndex, 5)
                        }>
                        {String.fromCodePoint(0x1f60d)}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 20,
                        }}
                        onPress={() =>
                          this.AddFeelingsToFood(this.state.AddFeelingIndex, 4)
                        }>
                        {String.fromCodePoint(0x1f600)}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 20,
                        }}
                        onPress={() =>
                          this.AddFeelingsToFood(this.state.AddFeelingIndex, 3)
                        }>
                        {String.fromCodePoint(0x1f615)}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 20,
                        }}
                        onPress={() =>
                          this.AddFeelingsToFood(this.state.AddFeelingIndex, 2)
                        }>
                        {String.fromCodePoint(0x1f621)}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 20,
                        }}
                        onPress={() =>
                          this.AddFeelingsToFood(this.state.AddFeelingIndex, 1)
                        }>
                        {String.fromCodePoint(0x1f624)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Modal>
            </SafeAreaView>
          ) : null}
          {this.state.PaymentScreen ? (
            <SafeAreaView
              style={{
                flex: 1,
                width: screenwidth,
                height: screenheight,
                backgroundColor: '#EFEFEF',
              }}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.ChooseDotsModal}
                presentationStyle="overFullScreen"
                onRequestClose={() => this.setState({ChooseDotsModal: false})}
                onDismiss={() => this.setState({ChooseDotsModal: false})}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.setState({ChooseDotsModal: false})}
                  style={{flex: 1, width: screenwidth, height: screenheight}}>
                  <View
                    style={{
                      width: screenwidth / 3,
                      height: 150,
                      justifyContent: 'space-between',
                      top: (screenheight - 280) / 2,
                      alignSelf: 'flex-start',
                      backgroundColor: '#EFEFEF',
                    }}>
                    <Text
                      onPress={() => {
                        this.setState({
                          AmountToBePaid: 1,
                          ChooseDotsModal: false,
                        }),
                          this.populateitemdetailsinpaymentdialog();
                      }}
                      style={{
                        color: '#4682B4',
                        textAlign: 'center',
                        borderBottomWidth: 0.5,
                        height: 30,
                      }}>
                      10 dots
                    </Text>
                    <Text
                      onPress={() => {
                        this.setState({
                          AmountToBePaid: 2,
                          ChooseDotsModal: false,
                        }),
                          this.populateitemdetailsinpaymentdialog();
                      }}
                      style={{
                        color: '#787878',
                        textAlign: 'center',
                        borderBottomWidth: 0.5,
                        height: 30,
                      }}>
                      20 dots
                    </Text>
                    <Text
                      onPress={() => {
                        this.setState({
                          AmountToBePaid: 3,
                          ChooseDotsModal: false,
                        }),
                          this.populateitemdetailsinpaymentdialog();
                      }}
                      style={{
                        color: '#787878',
                        textAlign: 'center',
                        borderBottomWidth: 0.5,
                        height: 30,
                      }}>
                      30 dots
                    </Text>
                    <Text
                      onPress={() => {
                        this.setState({
                          AmountToBePaid: 4,
                          ChooseDotsModal: false,
                        }),
                          this.populateitemdetailsinpaymentdialog();
                      }}
                      style={{
                        color: '#787878',
                        textAlign: 'center',
                        borderBottomWidth: 0.5,
                        height: 30,
                      }}>
                      40 dots
                    </Text>
                    <Text
                      onPress={() => {
                        this.setState({
                          AmountToBePaid: 5,
                          ChooseDotsModal: false,
                        }),
                          this.populateitemdetailsinpaymentdialog();
                      }}
                      style={{
                        color: '#787878',
                        textAlign: 'center',
                        borderBottomWidth: 0.5,
                        height: 30,
                      }}>
                      50 dots
                    </Text>
                  </View>
                </TouchableOpacity>
              </Modal>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.PaymentItemDetailsModal}
                presentationStyle="overFullScreen"
                onRequestClose={() =>
                  this.setState({
                    PaymentItemDetailsModal: false,
                    PaymentScreen: false,
                    showView: true,
                    CardInput: {},
                  })
                }
                onDismiss={() =>
                  this.setState({
                    PaymentItemDetailsModal: false,
                    PaymentScreen: false,
                    showView: true,
                    CardInput: {},
                  })
                }>
                <View
                  onStartShouldSetResponder={() => {
                    this.setState({
                      PaymentItemDetailsModal: false,
                      PaymentScreen: false,
                      showView: true,
                      CardInput: {},
                    });
                    setTimeout(() => {
                      this.setState({manageContactsModal1: true});
                    }, 100);
                  }}
                  style={{
                    width: screenwidth,
                    height: screenheight,
                    backgroundColor: 'rgba(256,256,256,0.6',
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      width: '90%',
                      height: '40%',
                      top: '30%',
                      backgroundColor: 'white',
                      alignSelf: 'center',
                      elevation: 5,
                      borderRadius: 5,
                      justifyContent: 'space-between',
                    }}>
                    <FlashMessage
                      position={'top'}
                      ref={rf => (this._paymentflash = rf)}
                    />
                    {this.state.flashopacity && (
                      <FlashMessages
                        ref={rf => (this.flsh = rf)}
                        message={this.state.flashMessage}
                        backcolor={this.state.flashColor}
                        position={this.state.flashPosition}
                        textcolor={this.state.textcolor}
                      />
                    )}
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => this.setState({ChooseDotsModal: false})}
                      style={{flex: 1, width: '100%', height: '100%'}}>
                      <Text
                        style={{
                          color: '#a5a5a5',
                          fontSize: 25,
                          alignSelf: 'center',
                        }}>
                        Purchase Dots
                      </Text>
                      <View
                        style={{
                          flexDirection: 'column',
                          top: 5,
                          alignSelf: 'center',
                          height: '10%',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ChooseDotsModal: true});
                          }}
                          style={{
                            justifyContent: 'center',
                            width: '40%',
                            marginLeft: 5,
                            height: '90%',
                            backgroundColor: '#4682B4',
                            alignSelf: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={{textAlign: 'center', color: 'white'}}>
                            {this.state.AmountToBePaid * 10} Dots
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          display: this.state.displaycardview,
                          flexDirection: 'row',
                          marginTop: 50,
                          alignSelf: 'center',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '80%',
                            margin: 5,
                          }}>
                          <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={{color: '#a5a5a5', margin: 5}}>
                            {this.state.PaymentItemDetailsObject.summary}
                          </Text>
                          <Text
                            numberOfLines={4}
                            adjustsFontSizeToFit
                            style={{color: '#a5a5a5', margin: 5}}>
                            {this.state.PaymentItemDetailsObject.desc}
                          </Text>
                        </View>
                        <Text style={{color: '#767676', margin: 5}}>
                          ${this.state.PaymentItemDetailsObject.amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          top: '70%',
                          display: 'flex',
                          marginTop: 5,
                          borderRadius: 5,
                          backgroundColor: 'red',
                          flexDirection: 'column',
                          alignSelf: 'center',
                          width: '98%',
                          justifyContent: 'space-between',
                        }}>
                        <StripeProvider
                          publishableKey={stripePublishableKey}
                          merchantIdentifier="merchant.identifier" // required for Apple Pay
                          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                        >
                          <CardField
                            postalCodeEnabled={false}
                            placeholders={{
                              number: '4242 4242 4242 4242',
                            }}
                            cardStyle={{
                              placeholderColor: '#808080',
                              backgroundColor: '#000000',
                              textColor: '#FFFFFF',
                            }}
                            style={{
                              // width: '100%',
                              height: 50,
                              marginVertical: 0,
                              margin: 0,
                            }}
                            onCardChange={cardDetails => {
                              console.log('cardDetails', cardDetails);
                              this.setState({CardInput: cardDetails});
                            }}
                            onFocus={focusedField => {
                              console.log('focusField', focusedField);
                            }}
                          />
                        </StripeProvider>
                        <Text
                          onPress={() => this.afterstripeloaded()}
                          disabled={this.state.DisableCardButton}
                          style={{
                            color: 'white',
                            ...(this.state.DisableCardButton == true
                              ? {backgroundColor: '#D0D0D0'}
                              : {backgroundColor: '#4682B4'}),
                            width: '100%',
                            height: 30,
                            textAlign: 'center',
                            padding: 4,
                          }}>
                          Proceed to pay $
                          {this.state.PaymentItemDetailsObject.amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: this.state.showLoader,
                          flex: 1,
                          backgroundColor: 'white',
                          marginTop: 0,
                          alignSelf: 'center',
                          position: 'absolute',
                          top: '50%',
                        }}>
                        <Loader />
                      </View>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              </Modal>
            </SafeAreaView>
          ) : null}
        </View>
      );
    } catch (e) {
      console.log('renderexception:', e);
    }
  }
  renderDraggable() {
    var data = [];
    var noImg = 'flex';
    data = this.state.filteredContactData;
    //step 11
    if (this.state.filteredContactData.length > 0) {
      if (this.state.gotConnection == true) {
        try {
          return this.state.filteredContactData.map((item, i) => (
            <Animated.View
              style={{
                ...Platform.select({
                  ios: {
                    lineHeight: Number.parseInt(
                      JSON.stringify(this.state.dotColorLocation[i].width),
                    ),
                  },
                  android: {},
                }),
                opacity: this.state.filteredContactData[i].opacity,
                display: this.state.filteredContactData[i].display,
                alignItems: 'center',
                borderRadius: 500,
                position: 'absolute',
                transform: [{scale: this.state.filteredContactData[i].scale}],
                width: this.state.dotColorLocation[i].width,
                height: this.state.dotColorLocation[i].height,
                top: this.state.dotColorLocation[i].zpc,
                left: this.state.dotColorLocation[i].ypc,
              }}
              key={i}>
              {this.state.filteredContactData[i].status == true ? ( // user is in app
                <Animatable.View
                  ref={rf => (this._startChatRef = rf)}
                  animation={zoomOut}
                  duration={1500}
                  easing="ease-in"
                  iterationCount="infinite"
                  {...(this.state.showDelete == 'flex'
                    ? {...this.getPanResponder(i).panHandlers}
                    : {...this.getPanResponder(i).panHandlers})}
                  style={[
                    this.pan[i].getLayout(),
                    {
                      ...(this.state.showDelete == 'flex' ? {zIndex: 2} : {}),
                      alignItems: 'center',
                      backgroundColor: this.state.filteredContactData[i].color,
                      width: '100%',
                      height: '100%',
                      opacity: this.state.fadeInOpacity,
                      position: 'absolute',
                      borderRadius: 500,
                    },
                  ]}>
                  <Text
                    style={{
                      ...(Platform.OS === 'android'
                        ? {textAlignVertical: 'center'}
                        : {
                            paddingTop:
                              Number.parseInt(
                                JSON.stringify(
                                  this.state.dotColorLocation[i].width,
                                ),
                              ) / 4,
                          }),
                      fontWeight: 'bold',
                      opacity: 0.5,
                      fontSize:
                        Number.parseInt(
                          JSON.stringify(this.state.dotColorLocation[i].width),
                        ) / 2,
                      color: '#EFEFEF',
                      padding: 0,
                      alignSelf: 'stretch',
                      textAlign: 'center',
                      ...(this.state.showDelete == 'flex'
                        ? {display: 'flex'}
                        : {display: 'none'}),
                      width: '100%',
                      height: '100%',
                    }}>
                    {this.state.filteredContactData[i].name.charAt(0) == '+'
                      ? this.state.filteredContactData[i].name
                          .split(/\s+/)[0]
                          .charAt(
                            this.state.filteredContactData[i].name.split(
                              /\s+/,
                            )[0].length - 2,
                          )
                      : this.state.filteredContactData[i].name
                          .split(/\s+/)[0]
                          .substring(0, 1)
                          .toUpperCase()}
                    <Text style={{fontWeight: 'normal'}}>
                      {this.state.filteredContactData[i].name.charAt(0) == '+'
                        ? this.state.filteredContactData[i].name
                            .split(/\s+/)[0]
                            .charAt(
                              this.state.filteredContactData[i].name.split(
                                /\s+/,
                              )[0].length - 1,
                            )
                        : this.state.filteredContactData[i].name
                            .split(/\s+/)[1]
                            .substring(0, 1)
                            .toLowerCase()}
                    </Text>
                  </Text>
                </Animatable.View>
              ) : this.state.filteredContactData[i].status == 'inchat' ? ( // user is in chat
                <Animatable.View
                  ref={rf => (this._startChatRef = rf)}
                  animation="flash"
                  duration={3000}
                  easing="ease-out"
                  iterationCount="infinite"
                  {...(this.state.showDelete == 'flex'
                    ? {...this.getPanResponder(i).panHandlers}
                    : {...this.getPanResponder(i).panHandlers})}
                  style={[
                    this.pan[i].getLayout(),
                    {
                      ...(this.state.showDelete == 'flex' ? {zIndex: 2} : {}),
                      alignItems: 'center',
                      backgroundColor: this.state.filteredContactData[i].color,
                      width: '100%',
                      height: '100%',
                      opacity: this.state.fadeInOpacity,
                      position: 'absolute',
                      borderRadius: 500,
                    },
                  ]}>
                  <Text
                    style={{
                      ...(Platform.OS === 'android'
                        ? {textAlignVertical: 'center'}
                        : {
                            paddingTop:
                              Number.parseInt(
                                JSON.stringify(
                                  this.state.dotColorLocation[i].width,
                                ),
                              ) / 4,
                          }),
                      fontWeight: 'bold',
                      opacity: 0.5,
                      fontSize:
                        Number.parseInt(
                          JSON.stringify(this.state.dotColorLocation[i].width),
                        ) / 2,
                      color: '#EFEFEF',
                      padding: 0,
                      alignSelf: 'stretch',
                      textAlign: 'center',
                      ...(this.state.showDelete == 'flex'
                        ? {display: 'flex'}
                        : {display: 'none'}),
                      width: '100%',
                      height: '100%',
                    }}>
                    {this.state.filteredContactData[i].name.charAt(0) == '+'
                      ? this.state.filteredContactData[i].name
                          .split(/\s+/)[0]
                          .charAt(
                            this.state.filteredContactData[i].name.split(
                              /\s+/,
                            )[0].length - 2,
                          )
                      : this.state.filteredContactData[i].name
                          .split(/\s+/)[0]
                          .substring(0, 1)
                          .toUpperCase()}
                    <Text style={{fontWeight: 'normal'}}>
                      {this.state.filteredContactData[i].name.charAt(0) == '+'
                        ? this.state.filteredContactData[i].name
                            .split(/\s+/)[0]
                            .charAt(
                              this.state.filteredContactData[i].name.split(
                                /\s+/,
                              )[0].length - 1,
                            )
                        : this.state.filteredContactData[i].name
                            .split(/\s+/)[1]
                            .substring(0, 1)
                            .toLowerCase()}
                    </Text>
                  </Text>
                </Animatable.View>
              ) : (
                <Animatable.View
                  ref={rf => (this._startChatRef = rf)}
                  {...(this.state.showDelete == 'flex'
                    ? {...this.getPanResponder(i).panHandlers}
                    : {...this.getPanResponder(i).panHandlers})}
                  style={[
                    this.pan[i].getLayout(),
                    {
                      ...(this.state.showDelete == 'flex' ? {zIndex: 2} : {}),
                      alignItems: 'center',
                      backgroundColor: this.state.filteredContactData[i].color,
                      width: '100%',
                      height: '100%',
                      opacity: this.state.fadeInOpacity,
                      position: 'absolute',
                      borderRadius: 500,
                    },
                  ]}>
                  <Text
                    style={{
                      ...(Platform.OS === 'android'
                        ? {textAlignVertical: 'center'}
                        : {
                            paddingTop:
                              Number.parseInt(
                                JSON.stringify(
                                  this.state.dotColorLocation[i].width,
                                ),
                              ) / 4,
                          }),
                      fontWeight: 'bold',
                      opacity: 0.5,
                      color: '#EFEFEF',
                      fontSize:
                        Number.parseInt(
                          JSON.stringify(this.state.dotColorLocation[i].width),
                        ) / 2,
                      padding: 0,
                      alignSelf: 'stretch',
                      textAlign: 'center',
                      ...(this.state.showDelete == 'flex'
                        ? {display: 'flex'}
                        : {display: 'flex'}),
                      width: '100%',
                      height: '100%',
                    }}>
                    {this.state.filteredContactData[i].name.charAt(0) == '+'
                      ? this.state.filteredContactData[i].name
                          .split(/\s+/)[0]
                          .charAt(
                            this.state.filteredContactData[i].name.split(
                              /\s+/,
                            )[0].length - 2,
                          )
                      : this.state.filteredContactData[i].name
                          .split(/\s+/)[0]
                          .substring(0, 1)
                          .toUpperCase()}
                    <Text style={{fontWeight: 'normal'}}>
                      {this.state.filteredContactData[i].name.charAt(0) == '+'
                        ? this.state.filteredContactData[i].name
                            .split(/\s+/)[0]
                            .charAt(
                              this.state.filteredContactData[i].name.split(
                                /\s+/,
                              )[0].length - 1,
                            )
                        : this.state.filteredContactData[i].name
                            .split(/\s+/)[1]
                            .substring(0, 1)
                            .toLowerCase()}
                    </Text>
                  </Text>
                </Animatable.View>
              )}
              <Text
                onLongPress={() => this.setState({showDelete: 'flex'})}
                onPress={evt => {
                  this.state.preventFurtherClick
                    ? {}
                    : this.checkBeforeSendInvite.bind(this)(i, evt);
                }}
                numberOfLines={1}
                adjustsFontSizeToFit
                key={i}
                ref={rf => (this._refContact = rf)}
                disabled={this.state.preventFurtherClick}
                {...this.getPanResponder(i).panHandlers}
                style={{
                  ...(this.state.showDelete == 'flex'
                    ? {display: 'none'}
                    : {display: 'flex'}),
                  ...(Platform.OS === 'android'
                    ? {textAlignVertical: 'center'}
                    : {
                        paddingTop:
                          Number.parseInt(
                            JSON.stringify(
                              this.state.dotColorLocation[i].width,
                            ),
                          ) / 4,
                      }),
                  fontSize:
                    Number.parseInt(
                      JSON.stringify(this.state.dotColorLocation[i].width),
                    ) / 2,
                  fontWeight: 'bold',
                  padding: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: 500,
                  alignSelf: 'center',
                  color: '#EFEFEF',
                  opacity: 0.5,
                  textAlign: 'center',
                }}>
                {this.state.filteredContactData[i].name.charAt(0) == '+'
                  ? this.state.filteredContactData[i].name
                      .split(/\s+/)[0]
                      .charAt(
                        this.state.filteredContactData[i].name.split(/\s+/)[0]
                          .length - 2,
                      )
                  : this.state.filteredContactData[i].name
                      .split(/\s+/)[0]
                      .substring(0, 1)
                      .toUpperCase()}
                <Text style={{fontWeight: 'normal'}}>
                  {this.state.filteredContactData[i].name.charAt(0) == '+'
                    ? this.state.filteredContactData[i].name
                        .split(/\s+/)[0]
                        .charAt(
                          this.state.filteredContactData[i].name.split(/\s+/)[0]
                            .length - 1,
                        )
                    : this.state.filteredContactData[i].name
                        .split(/\s+/)[1]
                        .substring(0, 1)
                        .toLowerCase()}
                </Text>
              </Text>
            </Animated.View>
          ));
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
  renderUnlockScreenData() {
    if (this.state.UnlockScreenData.length > 0) {
      if (this.state.gotConnection == true) {
        try {
          return this.state.UnlockScreenData.map((item, i) =>
            this.state.isPasswordWrong ? (
              <Animatable.View
                animation="shake"
                duration={200}
                easing="ease-out"
                iterationCount="2"
                style={{
                  ...Platform.select({
                    ios: {
                      lineHeight: Number.parseInt(
                        JSON.stringify(
                          this.state.UnlockScreenData[i].locations.width,
                        ),
                      ),
                    },
                    android: {},
                  }),
                  opacity: 1,
                  alignItems: 'center',
                  borderRadius: 500,
                  position: 'absolute',
                  ...(i == 0
                    ? {
                        top: (100 - (50 / screenheight) * 100) / 2 + '%',
                        left: (100 - (50 / screenwidth) * 100) / 2 + '%',
                        width: 50,
                        height: 50,
                      }
                    : {
                        top: this.state.UnlockScreenData[i].locations.zpc,
                        left: this.state.UnlockScreenData[i].locations.ypc,
                        width: this.state.UnlockScreenData[i].locations.width,
                        height: this.state.UnlockScreenData[i].locations.height,
                      }),
                }}
                key={i}>
                <TouchableOpacity
                  onPress={() => {
                    isApplLocked == true
                      ? this.startTimerforPasswordInput(i, 'T')
                      : this.state.isValidatingLock == true
                      ? this.StartValidatingProcess(i, 'T')
                      : this.createAppLock(i, 'T');
                  }}
                  onLongPress={() => {
                    isApplLocked == true
                      ? this.startTimerforPasswordInput(i, 'LT')
                      : this.state.isValidatingLock == true
                      ? this.StartValidatingProcess(i, 'LT')
                      : this.createAppLock(i, 'LT');
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      this.state.UnlockScreenData[i].locations.col,
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    position: 'absolute',
                    borderRadius: 500,
                  }}></TouchableOpacity>
              </Animatable.View>
            ) : (
              <Animated.View
                onLayout={() => console.log('ON')}
                style={{
                  ...Platform.select({
                    ios: {
                      lineHeight: Number.parseInt(
                        JSON.stringify(
                          this.state.UnlockScreenData[i].locations.width,
                        ),
                      ),
                    },
                    android: {},
                  }),
                  opacity: 1,
                  alignItems: 'center',
                  borderRadius: 500,
                  position: 'absolute',
                  ...(i == 0
                    ? {
                        top: (100 - (50 / screenheight) * 100) / 2 + '%',
                        left: (100 - (50 / screenwidth) * 100) / 2 + '%',
                        width: 50,
                        height: 50,
                      }
                    : {
                        top: this.state.UnlockScreenData[i].locations.zpc,
                        left: this.state.UnlockScreenData[i].locations.ypc,
                        width: this.state.UnlockScreenData[i].locations.width,
                        height: this.state.UnlockScreenData[i].locations.height,
                      }),
                }}
                key={i}>
                <TouchableOpacity
                  onPress={() => {
                    isApplLocked == true
                      ? this.startTimerforPasswordInput(i, 'T')
                      : this.state.isValidatingLock == true
                      ? this.StartValidatingProcess(i, 'T')
                      : this.createAppLock(i, 'T');
                  }}
                  onLongPress={() => {
                    isApplLocked == true
                      ? this.startTimerforPasswordInput(i, 'LT')
                      : this.state.isValidatingLock == true
                      ? this.StartValidatingProcess(i, 'LT')
                      : this.createAppLock(i, 'LT');
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      this.state.UnlockScreenData[i].locations.col,
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    position: 'absolute',
                    borderRadius: 50,
                  }}></TouchableOpacity>
              </Animated.View>
            ),
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
  renderNotes() {
    if (this.state.NotesAppData.length > 0) {
      try {
        return this.state.NotesAppData.map((item, i) => (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              display: this.state.NotesAppData[i].display,
              paddingTop: 0,
              opacity: this.state.NotesAppData[i].opacity,
              alignItems: 'center',
              width: this.state.NotesDotsLocations[i].width,
              height: this.state.NotesDotsLocations[i].height,
              borderRadius: 500,
              top: this.state.NotesDotsLocations[i].zpc,
              left: this.state.NotesDotsLocations[i].ypc,
            }}>
            <Animatable.View
              ref={rf => (this._notesRef = rf)}
              {...this.getPanResponderNote(i).panHandlers}
              style={[
                this.pannote[i].getLayout(),
                {
                  ...(this.state.showDeleteNote == 'flex'
                    ? {zIndex: 4}
                    : {zIndex: 3}),
                  position: 'absolute',
                  backgroundColor: this.state.NotesDotsLocations[i].col,
                  justifyContent: 'center',
                  width: '100%',
                  aspectRatio: 1 / 1,
                  borderRadius: 500,
                },
              ]}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                key={i}
                ref={rf => (this._refNotes = rf)}
                style={{
                  ...(Platform.OS === 'android'
                    ? {textAlignVertical: 'center'}
                    : {
                        paddingTop:
                          Number.parseInt(
                            JSON.stringify(
                              this.state.NotesDotsLocations[i].width,
                            ),
                          ) / 4,
                      }),
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  color: '#EFEFEF',
                  opacity: 0.5,
                  textAlign: 'center',
                  fontSize:
                    JSON.parse(
                      JSON.stringify(this.state.NotesDotsLocations[i].width),
                    ) / 2,
                }}>
                {this.state.NotesAppData[i].note.substring(0, 1)}
              </Text>
            </Animatable.View>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              key={i}
              {...this.getPanResponderNote(i).panHandlers}
              onPress={() =>
                this.state.showDeleteNote == 'flex'
                  ? {}
                  : this.AnimateNotesView(i)
              }
              onLongPress={() => this.setState({showDeleteNote: 'flex'})}
              ref={rf => (this._refNotes = rf)}
              style={{
                ...(Platform.OS === 'android'
                  ? {textAlignVertical: 'center'}
                  : {
                      paddingTop:
                        Number.parseInt(
                          JSON.stringify(
                            this.state.NotesDotsLocations[i].width,
                          ),
                        ) / 4,
                    }),
                ...(this.state.showDeleteNote == 'flex'
                  ? {display: 'none'}
                  : {display: 'flex'}),
                zIndex: 3,
                alignSelf: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                color: '#EFEFEF',
                opacity: 0.5,
                textAlign: 'center',
                fontSize:
                  JSON.parse(
                    JSON.stringify(this.state.NotesDotsLocations[i].width),
                  ) / 2,
              }}>
              {this.state.NotesAppData[i].note.substring(0, 1)}
            </Text>
          </Animated.View>
        ));
      } catch (e) {
        console.log(e);
      }
    }
  }
  renderFoods() {
    if (FoodsAppMappedData.length > 0) {
      try {
        return FoodsAppMappedData.map((item, i) => (
          <Animated.View
            key={i}
            ref={rf => (this._notesRef = rf)}
            onStartShouldSetResponder={() => this.AnimateFoodsView(i)}
            onLayout={() =>
              console.log(
                this.state.FoodsDotsLocations[i].width,
                this.state.FoodsDotsLocations[i].height,
              )
            }
            style={{
              position: 'absolute',
              zIndex: 3,
              display: this.state.FoodsAppData[i].display,
              paddingTop: 5,
              opacity: this.state.FoodsAppData[i].opacity,
              alignItems: 'center',
              width: this.state.FoodsDotsLocations[i].width,
              height: this.state.FoodsDotsLocations[i].height,
              borderRadius: 500,
              top: this.state.FoodsDotsLocations[i].zpc,
              left: this.state.FoodsDotsLocations[i].ypc,
            }}>
            <Animated.View
              style={{
                position: 'absolute',
                backgroundColor: this.state.FoodsDotsLocations[i].col,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                aspectRatio: 1 / 1,
                borderRadius: 500,
              }}>
              <Image
                style={{
                  ...(this.state.FoodsAppData[i].foodimage == null
                    ? {display: 'none'}
                    : {display: 'flex'}),
                  width: '100%',
                  height: '100%',
                  borderRadius: 80,
                  alignSelf: 'center',
                  position: 'absolute',
                }}
                source={{uri: this.state.FoodsAppData[i].foodimage}}
              />
              {/* {item} */}
              <TouchableWithoutFeedback
                onPress={() => this.AnimateFoodsView(i)}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                }}
                ref={rf => (this._refFoods = rf)}
                key={i}>
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  key={i}
                  style={{
                    ...Platform.select({
                      ios: {lineHeight: 25},
                      android: {},
                    }),
                    alignSelf: 'center',
                    justifyContent: 'center',
                    color: '#EFEFEF',
                    opacity: 0.5,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize:
                      JSON.parse(
                        JSON.stringify(this.state.FoodsDotsLocations[i].width),
                      ) / 2,
                  }}>
                  {this.state.FoodsAppData[i].food.substring(0, 1)}
                </Text>
              </TouchableWithoutFeedback>
            </Animated.View>
          </Animated.View>
        ));
      } catch (e) {
        console.log(e);
      }
    }
  }
  renderSites() {
    if (this.state.showicons == true) {
      try {
        return this.state.filteredData.map((item, i) => (
          <TouchableOpacity
            ref={rf => (this._rf = rf)}
            key={i}
            style={{
              zIndex: 3,
              position: 'absolute',
              height: parseInt(JSON.stringify(vaultPosArray[i].height)),
              width: parseInt(JSON.stringify(vaultPosArray[i].width)),
              borderRadius: 500,
              top: parseInt(JSON.stringify(vaultPosArray[i].zpc)),
              left: parseInt(JSON.stringify(vaultPosArray[i].ypc)),
            }}
            onPress={() => {
              console.log('count:', this.backCount);
              this.backCount++;
              if (this.backCount == 2) {
                Linking.openURL('https://' + this.state.filteredData[i][0]);
                clearTimeout(this.backTimer);
                this.backCount = 0;
                console.log('clear at 2:', this.backCount);
                console.warn('Clicked twice');
                console.log('twice:', this.backCount);
              } else if (this.backCount == 1) {
                console.log('clicked once');
                console.log('once:', this.backCount);
                this.showSiteDetailsModal(this.state.filteredData[i], i);
                setTimeout(() => {
                  this.backCount = 0;
                  console.log('clear at 1:', this.backCount);
                }, 500);
              } else {
                this.backTimer = setTimeout(() => {}, 500);
                console.log('clear:', this.backCount);
              }
            }}>
            <Image
              style={{
                ...(this.state.filteredData[i][0] == null ||
                this.state.filteredData[i][0] == ''
                  ? {display: 'none'}
                  : {display: 'flex'}),
                borderRadius: 500,
                backgroundColor: '#4682B4',
              }}
              source={{
                uri:
                  'https://www.google.com/s2/favicons?domain=' +
                  this.state.filteredData[i][0],
                width: parseInt(JSON.stringify(vaultPosArray[i].width)),
                height: parseInt(JSON.stringify(vaultPosArray[i].height)),
              }}
            />
          </TouchableOpacity>
        ));
      } catch (e) {
        console.log('vault data render exception:', e);
      }
    }
  }
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(256, 256, 256, 0.6',
    width: screenwidth,
    height: screenheight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'gray',
    paddingVertical: 5,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'center',
    borderRadius: 5,
  },
  reaction: {
    paddingHorizontal: 20,
  },
  reactionText: {
    fontSize: 20,
  },
  dropZone: {
    height: 25,
    width: 70,
    position: 'absolute',
    top: screenheight / 2 - 25,
    left: screenwidth - 70,
    // backgroundColor:'red'
  },
  draggableContainerText: {
    // marginTop   : 25,
    // marginLeft  : 5,
    // marginRight : 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
  },
  draggableContainer: {
    // position    : 'absolute',
    // top         :screenheight/2 - CIRCLE_RADIUS,
    // left        : screenwidth/2 - CIRCLE_RADIUS,
    // backgroundColor:'yellow'
  },
  circle: {
    backgroundColor: '#1abc9c',
    width: CIRCLE_RADIUS,
    height: CIRCLE_RADIUS,
    borderRadius: CIRCLE_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  modalView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '48%',
    left: '48%',
    elevation: 5,
    transform: [{translateX: -(screenwidth * 0.4)}, {translateY: -90}],
    height: 200,
    width: '80%',
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    opacity: 0.9,
  },
  credsModalView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '45%',
    left: '48%',
    elevation: 5,
    transform: [{translateX: -(360 * 0.4)}, {translateY: -90}],
    height: 250,
    width: 300,
    backgroundColor: '#EFEFEF',
    borderRadius: 7,
    //  opacity: 0.8
  },
  newauth: {
    fontSize: 16,
    color: '#898989',
    marginTop: 5,
    //fontWeight: 'bold',
    marginLeft: 5,
  },
  username: {
    elevation: 5,
    opacity: 0.95,
    width: 146,
    height: 40,
    position: 'absolute',
    shadowColor: '#d3d3d3',
    borderRadius: 2,
    shadowOpacity: 0.5,
    borderColor: 'lightgray',
    borderWidth: 2,
    backgroundColor: 'lightgray',
    marginTop: 58,
    marginLeft: 0,
  },
  search: {
    width: '80%',
    aspectRatio: 1 / 1,
    borderRadius: 80,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
  enter: {
    // width: "80%",
    height: '90%',
    aspectRatio: 1 / 1,
    borderRadius: 80,
    alignItems: 'center',
    alignSelf: 'center',
    opacity: 0.4,
    backgroundColor: 'lightgray',
  },
  home: {
    marginTop: 3,
    width: 17,
    height: 17,
    // marginLeft: 230,
    borderRadius: 80,
    alignItems: 'center',
    alignSelf: 'center',
    // opacity: .4,
    backgroundColor: 'lightgray',
  },
  logo: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: 150,
    // borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    position: 'absolute',
  },
  flakeimg: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  plus: {
    backgroundColor: 'lightgray',
    width: 23,
    height: 23,
    // aspectRatio:1/1,
    borderRadius: 80,
    opacity: 0.4,
    alignSelf: 'center',
    // position: 'absolute'
  },
  play: {
    marginTop: 2,
    backgroundColor: 'white',
    width: 18,
    height: 18,
    borderRadius: 80,
    //opacity: .4,
    alignSelf: 'center',
    color: 'black',
  },
  vault: {
    width: 23,
    height: 23,
    // aspectRatio: 1 / 1,
    // borderWidth: 1,
    borderRadius: 40,
    opacity: 0.3,
  },
  comment: {
    width: 23,
    height: 23,
    // aspectRatio: 1 / 1,
    alignSelf: 'center',
    // borderWidth: 1,
    borderRadius: 40,
    opacity: 0.3,
  },
  A: {
    marginTop: 2,
    marginLeft: 1,
    width: 18,
    height: 18,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 40,
    //opacity: .3
  },
  imageBox: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    marginStart: 0,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    flexDirection: 'row',
  },
  imageView1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    backgroundColor: 'gray',
  },
});
