import React, { useCallback } from 'react';
import SMS from 'react-native-sms';
import FlashMessages from './FlashMessages';
import * as Animatable from 'react-native-animatable';
import HorizontalActionSheet from './HorizontalActionSheet';
import BackgroundService from 'react-native-background-actions';
import BackgroundFetch from "react-native-background-fetch";
import notifee, { AuthorizationStatus, EventType, Notification, AndroidImportance, TriggerType, TimestampTrigger, AlarmType } from '@notifee/react-native';
var dltvals = [{ tag: "conversation", checked: false, convid: "abc", name: "nk" }, { tag: "conversation", checked: false, convid: "abc", name: "nida" }, { tag: "conversation", checked: false, convid: "abc", name: "nbm" },
{ tag: "invitation", checked: false, relId: "xyz", name: "njj" }, { tag: "invitation", checked: false, relId: "xyz", name: "nkjj" }, { tag: "invitation", checked: false, relId: "xyz", name: "bhjbh" }]
var timeoutidd = null;
var timeoutid = null;
import {
	StyleSheet,
	Text,
	View,
	Animated,
	TouchableOpacity,
	Dimensions,
	AppState,
	BackHandler,
	LogBox,
	Linking,
	Alert,
	NativeModule,
	NativeAppEventEmitter,
} from 'react-native';
import buffer from 'buffer';
global.Buffer = buffer.Buffer;
import SplashScreen from 'react-native-splash-screen';
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { GiftedChat, Bubble, Send, } from 'react-native-gifted-chat';
import { URL } from 'react-native-url-polyfill';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import Loader from 'react-native-three-dots-loader';
import { NativeModules } from 'react-native/Libraries/BatchedBridge/NativeModules';
import { networkInterfaces } from 'os';
const { width, height } = Dimensions.get('window')
const screenwidth = parseInt(width);
const screenheight = parseInt(height);
const datee = new Date(Date.now());
datee.setHours(16);
datee.setMinutes(49);
const options = {
	taskName: 'Example',
	taskTitle: 'n e w a u t h',
	taskDesc: 'Background Service Running',
	taskIcon: {
		name: 'flake3',
		type: 'drawable',
	},
	color: '#FFFFFF',
	linkingURI: 'yourSchemeHere://chat/jane',
	actions: [
		{
			title: 'Pause',
			identifier: 'PAUSE_ACTION',
		},
	],
	parameters: {
		delay: 5000,
	},
	silent: true
};
export default class IosPermission extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: [],
			isUserTyping: true,
			loadingindicator: true,
			progress: 0,
			handleddata: 'hello',
			showReactionsModal: false,
			messageForReactions: null,
			modalPosition: { x: 0, y: 0 },
			opacity: new Animated.Value(1),
			connectionOnlineHeight: new Animated.Value(30),
			connectionOnlineWidth: new Animated.Value(30),
			connectionOnlineTop: new Animated.Value(screenheight/2),
			connectionOnlineLeft: new Animated.Value(screenwidth/2),
			events: [],
			displayNotiss: true,
			chatmessages: [{ "_id": "0.6201792330649765", "createdAt": "2024-05-16T10:27:46.582Z", "text": "igvu", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.10104490624207108", "createdAt": "2024-05-16T10:33:58.596Z", "text": "hxxhhxjx", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.0848024013927473", "createdAt": "2024-05-16T10:34:13.813Z", "text": "bcbcjlpj", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.6136118626446467", "createdAt": "2024-05-21T10:03:46.861Z", "text": "kgkg", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.8260312728594872", "createdAt": "2024-05-21T10:03:48.155Z", "text": "cjjcvj", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.8660482503797732", "createdAt": "2024-05-21T10:03:49.605Z", "text": "jcchch", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.32608755557319313", "createdAt": "2024-05-21T10:03:50.771Z", "text": "kvvk", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.09555177281130178", "createdAt": "2024-05-21T10:03:51.804Z", "text": "cjic", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.31006719184374565", "createdAt": "2024-05-21T10:03:54.042Z", "text": "iggi", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.17619815717113718", "createdAt": "2024-05-21T10:04:03.115Z", "text": "cici", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.45720402784371594", "createdAt": "2024-05-21T10:04:04.691Z", "text": "fufufu", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.2537283289606872", "createdAt": "2024-05-21T10:04:05.930Z", "text": "hccicu", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.4719353351709302", "createdAt": "2024-05-21T10:04:08.952Z", "text": "uttu", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.6846712908884529", "createdAt": "2024-05-28T06:44:10.629Z", "text": "hyyy", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "online", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.9949905739695275", "createdAt": "2024-05-28T06:44:34.736Z", "text": "Hy", "user": { "_id": 2, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "online", "name": "nida  parveen ", } },
			{ "_id": "0.8578614907640898", "createdAt": "2024-05-28T06:45:21.964Z", "text": "Cffffytgggffggggyy", "user": { "_id": 2, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "online", "name": "nida  parveen ", } },
			{ "_id": "0.14832869109726998", "createdAt": "2024-05-28T06:45:23.099Z", "text": "efrgtnum", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "online", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", } },
			{ "_id": "0.30202207056433683", "createdAt": "2024-05-28T13:47:14.574Z", "text": "Ububb", "user": { "_id": 2, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "online", "name": "nida  parveen ", "replyTo": [Object] } },
			{ "_id": "0.702235015927596", "createdAt": "2024-05-28T15:06:47.379Z", "text": "cjjcjkccj", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.816188214283731", "createdAt": "2024-05-28T15:15:48.946Z", "text": "hhhjsjsjs", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.6798465342571499", "createdAt": "2024-05-28T15:16:00.522Z", "text": "hshshsh", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.7710672145052148", "createdAt": "2024-05-28T15:16:15.688Z", "text": "ywysyys", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.12346052307126132", "createdAt": "2024-05-28T15:16:20.507Z", "text": "gyytrr", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.15134531905307969", "createdAt": "2024-05-28T15:16:34.972Z", "text": "rfftt", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.24049815384462958", "createdAt": "2024-05-29T06:00:21.793Z", "text": "hyyy", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.28956627177099603", "createdAt": "2024-05-29T06:01:07.124Z", "text": "wp", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.38078295051329136", "createdAt": "2024-05-29T06:30:48.726Z", "text": "hllo", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.1306783898520366", "createdAt": "2024-05-29T06:31:18.816Z", "text": "hlkkyktk", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.6557718930824149", "createdAt": "2024-05-29T06:36:26.838Z", "text": "hyhhhkk", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			{ "_id": "0.41507746785075694", "createdAt": "2024-05-29T06:37:13.877Z", "text": "hhjihhsdfh", "user": { "_id": 1, "chatType": "text", "deletemessage": false, "isReplyEnabled": false, "messageType": "offline", "name": "445d5346-c9a0-4ca3-ae2a-42dc15fde23c", "replyTo": [Object] } },
			]
		}
		this.onSend = this.onSend.bind(this);
		this.renderMessage = this.renderMessage.bind(this);
		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
		this.checkBatteryOptimization = this.checkBatteryOptimization(this);
	}
	async onCreateTriggerNotification() {
		const date = new Date(Date.now());
		date.setHours(18);
		date.setMinutes(52);
		const trigger = {
			type: TriggerType.TIMESTAMP,
			timestamp: date.getTime(),
		};
		await notifee.createTriggerNotification(
			{
				title: 'Meeting with Jane',
				body: 'Today at 11:20am',
				android: {
					channelId: 'your-channel-id',
				},
			},
			trigger,
		);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}
	handleBackButtonClick() {
		console.log("back buttons:", AppState.currentState)
		return false
	}
	veryIntensiveTask = async (taskDataArguments, instance) => {
		console.log("task:", taskDataArguments);
		const { delay } = taskDataArguments;
		await new Promise(async (resolve) => {
			for (let i = 0; i < BackgroundService.isRunning(); i++) {
				this.calculateBigCircleSize(50, 50, 50, 50)
				if (i == 0) {
					BackgroundService.updateNotification({ taskTitle: '', taskDesc: '' })
					notifee.cancelAllNotifications()
				}
				await this.sleep(delay).then(console.log("done")).catch(e => console.log("error:", e));
				console.log("new service aftr:", i, BackgroundService.isRunning(), delay);
				if (BackgroundService.isRunning() == false) {
					console.log("inside if")
					break;
				}
			}
			resolve();
		});
	};
	sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
	async initBackgroundFetch() {
		const onEvent = async (taskId) => {
			console.log('[BackgroundFetch] task: ', taskId);
			await this.addEvent(taskId);
			BackgroundFetch.finish(taskId);
		}
		const onTimeout = async (taskId) => {
			console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
			BackgroundFetch.finish(taskId);
		}
		let status = await BackgroundFetch.configure({
			minimumFetchInterval: 15
		}, async (taskId) => {
			console.log("[BackgroundFetch] taskId: ", taskId);
			switch (taskId) {
				case 'com.transistorsoft.fetch':
					print("Received custom task");
					break;
				default:
					print("Default fetch task");
			}
			console.log('[BackgroundFetch] configure status: ', status);
			BackgroundFetch.finish(taskId);
		}, async (taskId) => {
			BackgroundFetch.finish(taskId);
		});
		BackgroundFetch.scheduleTask({
			taskId: "com.foo.customtask",
			forceAlarmManager: true,
			delay: 5000
		});
	}
	addEvent(taskId) {
		return new Promise((resolve, reject) => {
			this.setState(state => ({
				events: [...state.events, {
					taskId: taskId,
					timestamp: (new Date()).toString()
				}]
			}));
			resolve();
		});
	}
	async componentDidMount() {
		SplashScreen.hide();
		LogBox.ignoreAllLogs()
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
		console.log("dirs:",rootDir,projectDir)
		let xyz = 0
		await notifee.cancelAllNotifications();
		setInterval(() => {
			this.setState({isUserTyping:true})
			setTimeout(() => {
				this.setState({isUserTyping:true})
			}, 500);
		}, 500);
		AppState.addEventListener('change', async (e) => {
			console.log("app state IOS:", e, AppState.isAvailable)
			if (e == "active") {
				await BackgroundService.stop().then(console.log("service stopped:", BackgroundService.isRunning()));
				await notifee.cancelAllNotifications();
			}
			else if (e == "background") {
                clearInterval();
				BackgroundService.on('expiration', () => {
					console.log('I am being closed :(');
				});
			}
		});
	}
	checkBatteryOptimization = async () => {
		try {
			const isOptimized = await notifee.isBatteryOptimizationEnabled()
			console.log("isoptimized:", isOptimized);
			if (isOptimized == true) {
			}
		} catch (error) {
			console.error('Failed to check battery optimization:', error);
		}
	}
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
			]
		);
	}
	calculateBigCircleSize = async (wd, ht, lft, tp) => {
		console.log("big circle:", wd, ht, lft, tp)
		let centerX = lft + (wd / 2);
		let centerY = tp + (wd / 2);
		let size = Number.parseInt(2 * Math.max(parseInt(centerX), parseInt(screenwidth - centerX)))
		console.log("x,size,y:", size, centerX,centerY,screenwidth,screenheight)
		console.log(typeof (screenwidth), typeof (newleft), typeof (newtop))
		return { width: parseInt(size), left: new Animated.Value(parseInt(-size/2+centerX)), top: new Animated.Value(parseInt(-size/2+centerY)) }
	}
	resizeImage = async (uri, maxWidth, maxHeight, quality = 100) => {
		try {
		} catch (error) {
			console.error('Error resizing image:', error);
			return uri;
		}
	}
	receiveIntentListener = () => {
		console.log("called")
		try {
			ReceiveSharingIntent.getReceivedFiles(
				(files) => {
					console.log('Received data:', files);
					if (files.length > 0) {
						ReceiveSharingIntent.clearReceivedFiles();
					}
				},
				(error) => {
				},
				'NewauthShareMedia'
			)
		}
		catch (e) {
			console.log("catching error:", e)
		}
	}
	handleSharedData = async () => {
		try {
			const action = await ReceiveSharingIntent.getReceivedFiles();
			if (action) {
				console.log("action", action);
			}
		} catch (error) {
			console.error('Error fetching shared action:', error);
		}
	}
	handleSharedDataOfType = async (type, data) => {
		switch (type) {
			case 'text/plain':
				this.setState({ handleddata: data })
				break;
			case 'application/pdf':
				this.setState({ handleddata: data })
				break;
			case 'image/jpeg':
				alert("image jpg")
			case 'image/png':
				alert("image png")
				break;
			case 'image/*':
				alert("image *")
			default:
				console.warn(`Unhandled data type: ${type}`);
		}
	}
	handleImageUpload = async () => {
		try {
			this.setState({ loadingindicator: true });
			await this.sendImageFunction("image");
			this.setState({ loadingindicator: false });
		} catch (error) {
			console.error("Error uploading image:", error);
			this.setState({ loadingindicator: false });
		}
	}
	sendImageFunction = async (image) => {
		return new Promise((resolve) => {
			const totalSteps = 100;
			const stepDuration = 20;
			const interval = setInterval(() => {
				this.setState((prevProgress) => {
					if (prevProgress < totalSteps) {
						return prevProgress + 1;
					} else {
						clearInterval(interval);
						this.setState({ loadingindicator: false })
						resolve();
						return prevProgress;
					}
				});
			}, stepDuration);
		});
	}
	generateRandomFlake = () => {
		var randomFlake;
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			console.log("rndm flk status:", xhr.readyState, xhr.status)
			if (xhr.readyState == 4 && xhr.status == 200) {
				randomFlake = xhr.responseText;
				this.getSession(randomFlake);
				console.log("rndm flk:" + randomFlake)
			}
			else {
				console.log("no flake received")
			}
		}
		xhr.open('GET', 'https://newauth.io/newauth/api/getrandomflake');
		xhr.withCredentials = true;
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(null);
	}
	getMessageAge = (date) => {
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
	isCompleteURL(input) {
		try {
			new URL(input);
			return true;
		} catch (error) {
			return false;
		}
	}
	isValidHostname(hostname) {
		return hostname.trim() !== '';
	}
	onLongPress = (context, message) => {
		context.Actions.Acti
		console.log("clicked")
		const options = ['copy', 'Delete Message', 'Reply', 'Cancel'];
		return (
			<View style={{ backgroundColor: 'pink', flexDirection: 'row' }}>{
				options.map((option, index) =>
				(
					<View key={index}>
						{}
						<Text style={{ color: 'pink' }}>{index}</Text>
					</View>
				)
				)}
			</View>
		)
		const stylee = [{ color: 'pink' }, {}, {}, {}];
		const icons = [
			<Icon name="copy" size={20} color={'gray'} />,
			<Icon name="trash" size={20} color={'gray'} />,
			<Icon name="reply" size={20} color={'gray'} />,
			<Icon name="close" size={20} color={'gray'} />
		];
		const cancelButtonIndex = options.length - 1;
		context.actionSheet().showActionSheetWithOptions({
		});
	}
	onPressAvatar = () => {
		return (
			<Text>
				hey
			</Text>
		)
	}
	toggleReactionsModal = (context, message, position) => {
		console.log(this.context, message, position, screenheight)
		this.setState((prevState) => ({
			showReactionsModal: true,
			messageForReactions: message,
			modalPosition: { x: position.x, y: position.y },
		}));
	};
	handlePressMessage = (message, layout) => {
		console.log(message);
		console.log(layout.x, layout.y);
	};
	renderlist = ({ item }) => (
		<View style={{ marginTop: 5, flexDirection: 'column', borderWidth: 2 }}>
			<Text adjustsFontSizeToFit numberOfLines={1} style={{ color: "gray", alignItems: 'center', left: '5%', top: 0 }}>{item.name}</Text>
			<Text adjustsFontSizeToFit numberOfLines={1} style={{ color: "gray", alignItems: 'center', left: '5%', top: 0 }}>{item.phoneNumber}</Text>
		</View>
	)
	SendSmsScreen = () => {
		console.log("inside sms")
		const recipients = ['+91021'];
		const body = 'Hello, this is a test SMS message!';
		SMS.send({
			body, recipients, successTypes: ['sent'],
			allowAndroidSendWithoutReadPermission: true
		}, (completed, cancelled, error) => {
			if (completed) {
				console.log('SMS sent successfully');
			} else if (cancelled) {
				console.log('SMS cancelled');
			} else if (error) {
				console.log('Error sending SMS:', error);
			}
		});
	}
	renderMessage = (props) => {
		return (
			<TouchableOpacity
				style={{ zIndex: 50, flex: 1 }}
				onPress={(event) => this.toggleReactionsModal({}, props.currentMessage, { x: (event.nativeEvent.pageX - event.nativeEvent.locationX), y: event.nativeEvent.pageY - event.nativeEvent.locationY })}>
				<Bubble onPress={() => alert('jnjjgnj')}
					onLongPress={() => alert('ok')}
					wrapperStyle={{
						right: { shadowOffset: { width: 0, height: 8 }, zIndex: 4, borderRadius: 5, marginRight: 5, shadowOpacity: 0.5, shadowRadius: 20, shadowColor: '#236c7a', elevation: 0, marginBottom: 0, backgroundColor: 'pink' },
						left: { elevation: 0, shadowColor: '#343434', zIndex: 4, borderRadius: 5, marginLeft: 5, marginBottom: 0, backgroundColor: 'gray' }
					}}
					{...props}
				/>
				{}
			</TouchableOpacity>
		);
	};
	renderFooter = () => {
		const { isUserTyping } = this.state
		if (isUserTyping) {
			return (
				<View style={{ backgroundColor: 'rgba(256,256,256,0.6', borderWidth: 0, borderColor: 'lightgray', padding: 10, marginTop: 10, width: 60, height: 'auto', borderRadius: 5, marginLeft: 5, marginBottom: 10 }}>
					<Loader size={5} animationDuration	={5000} />
					{}
				</View>
			)
		} else { return (<Text></Text>) }
	}
	timerOnSendTypingStatusCall = (typingstatus) => {
		if (typingstatus != this.state.isUserTyping) {
			const currentTime = new Date().getTime();
			const timeSinceLastCall = currentTime - lastCallTimeForTyping;
			if (timeSinceLastCall >= 5000) {
				console.log("Calling API...", timeSinceLastCall);
				this.setTypingStatus(typingstatus);
				lastCallTimeForTyping = currentTime;
			} else {
				console.log("API call blocked. Wait for at least 5 seconds.");
			}
		}
		else {
			console.log("same typing")
		}
	}
	setTypingStatus = (text) => {
		console.log("typing status:", text)
		this.setState({ isUserTyping: text })
		setTimeout(() => {
			this.setState({ isUserTyping: false })
		}, 5000);
	}
	onSend = (newmessages) => {
		console.log(newmessages);
		let msg = [{
			_id: Math.random(1000).toString(),
			text: newmessages,
			createdAt: new Date(),
			user: {
				_id: 1,
				name: "nida",
				messageType: "offline",
				chatType: 'text',
				deletemessage: false,
			},
		}];
		this.setState((previousState) => ({
			chatmessages: GiftedChat.append(previousState.chatmessages, msg),
		}));
	};
	renderSend = (props) => {
		const { text, onSend } = props
		if (text.trim().length > 0) {
			return (
				<Send {...props}
				>
					<View style={{ justifyContent: 'center', height: '100%', marginRight: 0 }}>
						<Icon style={{ padding: 10 }} name={"send"} color={"#4684B2"} size={25} />
					</View>
				</Send>
			);
		}
		return null;
	}
	render() {
		return (
			<View style={{ flex: 1, opacity: 1, backgroundColor: 'yellow', width: screenwidth, height: screenheight, left: 0 }}>
				<GiftedChat messagesContainerStyle={{ width: screenwidth, top: 50, paddingBottom: 50 }}
					messages={this.state.chatmessages}
					onSend={messages => this.onSend(messages[0].text)}
					user={{
						_id: 1,
						name: "Test User"
					}}
					scrollToBottom={true}
					// inverted={true}
					isTyping={true}
					shouldUpdateMessage={(props, nextProps) => {
						console.log(props, nextProps),
							props.extraData !== nextProps.extraData
					}
					}
					textInputProps={{ color: 'blue' }}
					renderSend={this.renderSend}
					// renderFooter={this.renderFooter}
					renderMessage={props => <this.renderMessage {...props} />}
					listViewProps={{
						virtualizedListProps: {
							initialNumToRender: 5,
							maxToRenderPerBatch: 5,
							windowSize: 5,
							removeClippedSubviews: false,
						},
					}}
				/>
				<Animated.View style={{width:this.state.connectionOnlineWidth,height:this.state.connectionOnlineHeight,top:this.state.connectionOnlineTop,left:this.state.connectionOnlineLeft,position:'absolute',backgroundColor:'gray',borderRadius:500}}>
				</Animated.View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: Colors.lighter,
	},
	body: {
		backgroundColor: Colors.white,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
		color: Colors.black,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
		color: Colors.dark,
	},
	modalBackground: {
		flex: 1,
		backgroundColor: 'rgba(256, 256, 256, 0.6',
		width: screenwidth,
		height: screenheight,
		justifyContent: 'center',
		alignItems: 'center'
	},
	reactionsContainer: {
		flexDirection: 'row',
		position: 'absolute',
		backgroundColor: 'gray',
		paddingVertical: 5,
		marginLeft: 5,/////
		marginRight: 5,
		alignSelf: 'center',
		borderRadius: 5
	},
	
	reactionText: {
		fontSize: 20,
	},
});