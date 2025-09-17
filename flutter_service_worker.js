'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "0ab73737c27eb148e482de8eae0274bd",
".git/config": "607a1cc224ebe656a25059189a942e81",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/FETCH_HEAD": "6fcb703571a7bb7bc715f0703c45dc71",
".git/HEAD": "cf7dd3ce51958c5f13fece957cc417fb",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "8d2f87a236f60216367b468910ca3d97",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "a4854dc5d8c2ad6dc68747c57f839cbf",
".git/logs/refs/heads/main": "e71709b7c2d43d686fab9ae65b0d9db1",
".git/logs/refs/remotes/origin/HEAD": "1f9e4a6e4ed788a73b32cfba77bc5979",
".git/logs/refs/remotes/origin/main": "fce72ed8195cfa487f5141f5f8b62933",
".git/objects/01/3277dfd425bc4c63316a159285d8f2142505b9": "d1d61b1169a31abf154a3dd1fe11a5be",
".git/objects/01/8e5bf326f0430fada99a29afebe1cd64e3d7cb": "261dd1671f8577e4e56d15dcce372db5",
".git/objects/02/1d4f3579879a4ac147edbbd8ac2d91e2bc7323": "9e9721befbee4797263ad5370cd904ff",
".git/objects/03/a58a9ee9c18d7ac84d3d909ee3ef7ff9d8dd62": "33e3512473e8a57326664c9731065b91",
".git/objects/0a/e00d38df8a759953d536792d5a5c6638a0d092": "4a76bcd099508f3763b98d0a05103941",
".git/objects/0c/1775ff5737939afcd6c586e2cc6f47f4bb2d71": "fb9c1ee3a4bbbb9a1b8365fd1c283e41",
".git/objects/0c/62ee2913baf3f578115f855fd871073cf611b9": "0ceae87cf0c4f322c512df2b47e81eb5",
".git/objects/0e/979f0431493c03be210da2c0e32893ba1436ae": "404b002defcd4697339cb0590927b29b",
".git/objects/0e/dc7d227882d806bac90b516630d52a3c90dbbc": "1beb8cace74dce0af73266fad681df7e",
".git/objects/10/2d97ff3e4061874b56b619e5a402054793042f": "06728cd5e06bbafc668c49b87ddd800e",
".git/objects/10/668c3c1069236d26bf925e3781a9eba784404a": "48866f367612218d85242905af0f43b5",
".git/objects/10/9d41cd02332b52ac810db6c699daeb4b65a44b": "8853d790213ed869e3a00e81b7775835",
".git/objects/1b/598fd0e701131640c53a59904f695e03303487": "df9b2cd8b51ad84372a828b8da5c248d",
".git/objects/20/3a3ff5cc524ede7e585dff54454bd63a1b0f36": "4b23a88a964550066839c18c1b5c461e",
".git/objects/23/186bd85fc83599a37236416d637682c3b48ac8": "b32d652ca2ccf8b5a48ab3f91e4f878b",
".git/objects/28/bc5e649ad45ddc6a8559078afd3ca52bc9203f": "67c59c66b26e0800563e4fe15eebe040",
".git/objects/29/f22f56f0c9903bf90b2a78ef505b36d89a9725": "e85914d97d264694217ae7558d414e81",
".git/objects/35/17d2a145509a53ac70a3a2c88da3deedd98890": "4394453550d8d082f2cd78c4a400fd55",
".git/objects/38/6bcbc6817d38518d54483fac4db8cf203df22f": "1320437a127111d322275607a100d1d1",
".git/objects/3a/4330b1192ef295fd6955e14d1818477c0277ce": "4e3630b3e3c823b0b806b08987851b4f",
".git/objects/3d/400c2c59e7f1598c6979f26517dbbb6dacb980": "25158ab07d8aa6a27e873878bf2d183e",
".git/objects/3d/4092a483eb3ca33d2e3b98b2a0439e4f314867": "c8ef2fb6579b83444ea3ab9234cb886d",
".git/objects/3d/7890bb121da9ab3d53c26f3f3afb69f5729414": "5e3473a322de2c1a97fb4c569a1a2d6b",
".git/objects/41/de7ca03ed9d5b14a520ea81631b72f7679bddb": "9a83ef1f300ce4e0dd2ad5ac34c75c02",
".git/objects/45/146fd8b69436b2f7a3aa73af6ce137267b4323": "96ac15b0e6fbaa3c8b069570350322b7",
".git/objects/4c/43d7890ea1a79ec59db6110121778f1f6989e3": "f79ce5a6964627c353d70db7639c5fa2",
".git/objects/4c/c3c48d4e9c6f3da8742f06aac7a2cfdef48892": "0d88b14dd30a492e0d5f3099f35e88b9",
".git/objects/4d/bf9da7bcce5387354fe394985b98ebae39df43": "534c022f4a0845274cbd61ff6c9c9c33",
".git/objects/4e/3776b97d04c7f5c1bb3229e9c84a9ddecd5eb9": "1c852487279cd453932974ac6de85c25",
".git/objects/4f/fbe6ec4693664cb4ff395edf3d949bd4607391": "2beb9ca6c799e0ff64e0ad79f9e55e69",
".git/objects/52/7d9d250cb2b569a14120d390e6a4d0f8dba7a2": "7b588f47a25d23ee14b3b8bf9c0c8c5c",
".git/objects/54/1af395333726fe3369be2cd75c1b914eebcb09": "6bd64ca1c9b4f670ab7a006dbac1a9d9",
".git/objects/59/214afbf1eaa57591d3e56ed6596a9b00c35543": "ba2ac383dcc1ef469bb3c23605cc4aeb",
".git/objects/59/a02e51f9ec43e8fa5e5e13144df4b0448319e9": "66c12524156c0faaed24fde092477ff3",
".git/objects/5a/29cddda472f1389c7e94fd68e8cbddae9cdeae": "7b826eed8b58bc4190737054ad56a970",
".git/objects/5b/0a4802a66f1abc5e9ccce5e83db019bdf774ff": "48e727e2812d14f7fc285076aacd6933",
".git/objects/5b/bb0479301cd2f1978053233a3acf6f9607f89a": "de1f742674bbad6bb30b3f91853fb71a",
".git/objects/5c/08d4084812bea86994b277c8d3ddc09c6beb35": "3976914f5f541b5707f67c6856b39b4b",
".git/objects/5e/4851f0ab7e0268da6ce903306e2f871ee19821": "175e3d630946dfb12bef53afeb623eb0",
".git/objects/5f/6e42136eece41d76d7eeb656ef351d1080831f": "7779a9c954f33c86068fa133eb47e7cb",
".git/objects/60/ab84e5ec244f6e24209ec95008e2204e7e8435": "b56b4f3b3601f7c25dd30296b7b0b529",
".git/objects/63/db4fa70c9372225a62feecb966f306877bd9d5": "1ca2b2c7fe1d36bd361f0cdf8ee28534",
".git/objects/66/7bfe49b53f6a749d1027a1a9b90f9da351e244": "af7dfca6314a456138bcdd126831f20a",
".git/objects/6c/2993a04d32a6fe92ed130128c8090006f18cbc": "63bdf747f68378c5997c167dfb563c50",
".git/objects/6d/7c0cc20e8c10be8b39b3dc5e07b7111c2ad4cb": "ea2eb0e91dfbebffe33387fc20eea433",
".git/objects/6f/1158c51524e30e3a42dcec77b86c37eb9890dd": "94e1e03036a7d7cbf343990731657506",
".git/objects/6f/9509c88bed7080d496fc5e1d87a9315e30549d": "c02716d7aaed30ce1c5697a2fb40d317",
".git/objects/70/32799b9baca806c106be6d2aed524f14761aee": "9c9e53d2c97e943e9b0bd79d3c881441",
".git/objects/71/188f5cb2815547a5fb785f220910324ad8aa65": "4158e15d340e315750b92098952bd603",
".git/objects/75/89af08080fe0157805ca8e8324c4a5f0beb277": "4041461d827845f4bed0ae19ece983a7",
".git/objects/75/9e29bb66cb08fc847bd0e2e06648a12f211125": "ec310a898d9df882651036844216b217",
".git/objects/76/db0072a87bf655fb7a2d7433f2982a6c0c6ebf": "332c7deab1dfa1dbcd3bad9765b3caad",
".git/objects/7a/6c1911dddaea52e2dbffc15e45e428ec9a9915": "f1dee6885dc6f71f357a8e825bda0286",
".git/objects/80/b4b97a6eadbb1bd3f6c58ceafa21dc5bf4fe7e": "e7bef683bfd5b393e3abab5f24a98cdd",
".git/objects/87/4b1b0dd7c63f46240530a710ccd503d58d866d": "0da78f91e2108665baeb94f43f846938",
".git/objects/87/7ff808d90803801b5f69aa8f4efa30b3ceed1e": "5abe6dcd12087e9ad1c2c775bed9430d",
".git/objects/88/7ab026ec2c7b6f682502ed13710967fbadc9d1": "cc66b6e1977067da02a79b728c986bfb",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/93/d6322b1779af523d2489b3490e298daec2a86e": "11d2fb3faf4913f4a787677da0e810e5",
".git/objects/94/5a6e8a6f73f6f5d53cdfb434d12cc84c537fe2": "53672dad2e82b69277b30bc325c93f4e",
".git/objects/98/0d49437042d93ffa850a60d02cef584a35a85c": "8e18e4c1b6c83800103ff097cc222444",
".git/objects/99/2d6ba3b157a7ec291d9acf2b14742c08ab5091": "552af003cf4ab7246971ad91eb3ed443",
".git/objects/9b/3ef5f169177a64f91eafe11e52b58c60db3df2": "91d370e4f73d42e0a622f3e44af9e7b1",
".git/objects/9e/3b4630b3b8461ff43c272714e00bb47942263e": "accf36d08c0545fa02199021e5902d52",
".git/objects/9e/b3d93212d9e92b385c6e2c7c468693de690879": "2f98ecb46019cc19702d793af711c888",
".git/objects/a0/1f3777a6fc284b7a720c0f8248a27066389ef9": "1ef5c3c4a04465246d17da73a0924833",
".git/objects/a0/e3472c86980f3913b7aa83e37d43366f121623": "f582bdd94c5e98d2781c94d890e71980",
".git/objects/a4/6cf101112665c7dd0509573178de8186c4fc5c": "b2b8ae0700bb3389a9d7f00f5e76655d",
".git/objects/ad/1fe22cd719cc579245b82c69b215bc63f4b397": "f093c23e67e42aba31489ed6d030dc9c",
".git/objects/b0/12555fe20fce45172295dca689f0c932820e58": "9d9ce9ddb8cf107d4b02005c814be7d3",
".git/objects/b0/831456ff0e1388e302b4339ce39e563ef7e4ce": "e72e5a5c4dd07814db61daba789dc567",
".git/objects/b2/7822baea48062bf11617ce763e8d623c3a9769": "c5b9e0f1b9ad3cf97e43c2702903275f",
".git/objects/b5/b6cc5a7c28df275f7b25a8cf28983f1f0b5435": "a8f4eec255993b2c71e6b92931dac3c5",
".git/objects/b6/b8806f5f9d33389d53c2868e6ea1aca7445229": "b14016efdbcda10804235f3a45562bbf",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/be/739bfad984cfc127291d08237fbcfa5355357f": "1839d0b8821c73cef00d187e13f77e2b",
".git/objects/be/9339a5798c06a32430c79ae40f2ebcfd84026d": "2d4d0627cdbf624debd43a724683de71",
".git/objects/c0/a579e3061952dcc520f91d47434de1ee33f4e7": "6655009c3aa3acd6b45646f5fafce15f",
".git/objects/c4/016f7d68c0d70816a0c784867168ffa8f419e1": "fdf8b8a8484741e7a3a558ed9d22f21d",
".git/objects/c7/d0ba8ac54343848513e0877cd4bf8d8b10c023": "bb6bf895daf60870708f8a33b7103db8",
".git/objects/c8/c423e60031f2c7f161fa59eb491cfe30b5880c": "1f74b8d7bf3121a2905d86311fea67a4",
".git/objects/c9/7888378af15f1d2cd49146bad51cdd3846d9a3": "8d6d12c1bc9dd895888bf08eaa80e006",
".git/objects/c9/93e82216cd9b62f025c441fb65b7b7ccf2f96e": "9605e075088d634aafdfa3a6e73dda6c",
".git/objects/ca/3bba02c77c467ef18cffe2d4c857e003ad6d5d": "316e3d817e75cf7b1fd9b0226c088a43",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d5/b320459d32d8785bba229d84ddc08e873de309": "48523170eeb569786a41c5481906661e",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/da/f26f0ef7dacbbbffde42f7bf28ded2724a1938": "b3d65dda1c0fb0c94fa028538faf16e3",
".git/objects/dc/14da9b6aa6fca17ddbef6b2c5cbbe94dfba9c8": "e3c66434420f64201b9d720b41f7222e",
".git/objects/dc/2b8d61f6839da493806218514c9773ef19dc9a": "899abad6b6ff38f4f994d75209c42129",
".git/objects/df/6d71c46d2a61c452252736d86d7f321e252e79": "aa1c90f02eadfd5b3b522906044b5752",
".git/objects/df/e0770424b2a19faf507a501ebfc23be8f54e7b": "76f8baefc49c326b504db7bf751c967d",
".git/objects/e3/e9ee754c75ae07cc3d19f9b8c1e656cc4946a1": "14066365125dcce5aec8eb1454f0d127",
".git/objects/e4/20cbd1cf451e355994ea8d180315cc4779edc9": "f6b10cfb804892d84672c5dae4b10447",
".git/objects/e5/0fd7c7b4a5b4b31571736d62b376922845c6bd": "c86c068c3ae4161374aafbfada637fd1",
".git/objects/e5/a898f5796901fe143a3971a58708f77a1cb7b2": "8f720dadd878c08f50585cea1b332b8a",
".git/objects/e5/c0b96122e7cdcd8302d731edb79782b3e432f6": "e3a61a4fd2299ded61032b92a315fefc",
".git/objects/e7/21da6a497fbec07cfc157c1859b416659ef633": "26fa169eb5deacb864fe048464086b77",
".git/objects/e9/b9804c82d05e95651e520470e9aee96e56d9d4": "09f0d93d4b057a7053bd7f57d77139a3",
".git/objects/ea/1d2f0bf430ac58dc9ef18ba012cd07d23d2764": "0165d112d53b4eb0d12bff3fb79a3491",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/ec/c7041e23ed1a61574efe48e8bc42441a401d6e": "aac2d0844d4ef275550a63d0347a8a86",
".git/objects/ed/135f1cdfa944a65191c4cd2a464946efdb2dd4": "581c82623660be1fcf6960de98e9d48b",
".git/objects/ed/b55d4deb8363b6afa65df71d1f9fd8c7787f22": "886ebb77561ff26a755e09883903891d",
".git/objects/f0/ff5368b4e966c70a5ad263b49b6b755df118d2": "6a20dd488774c0801fb8af69099cdec2",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f4/310b09676fc3b0d6533170cc652bf413c18fc2": "ab9aa49da084fa05ab9397e2aed02105",
".git/objects/fe/23eeb9c93a377d0f4ab003f1f77b555d19b1d1": "3d5a77b3829f7624a7acd6a67a20a19d",
".git/objects/fe/3b987e61ed346808d9aa023ce3073530ad7426": "dc7db10bf25046b27091222383ede515",
".git/objects/fe/77243fc7ae5f860243c768fc7bc659839988a5": "3b1c75299f25f48fcfed8983e7d8b1d4",
".git/refs/heads/main": "1715d54ed8b2c923a08dc9922f8c7264",
".git/refs/remotes/origin/HEAD": "98b16e0b650190870f1b40bc8f4aec4e",
".git/refs/remotes/origin/main": "1715d54ed8b2c923a08dc9922f8c7264",
"assets/AssetManifest.bin": "ec326aaae9ff3f8afc9f06042049bade",
"assets/AssetManifest.bin.json": "15caded5894dacdab796542f6cc158cd",
"assets/AssetManifest.json": "cca7bdf875d90d54004f466d11aa6005",
"assets/assets/fonts/Inter-Black.ttf": "118c5868c7cc1370fcf5a1fc2f569883",
"assets/assets/fonts/Inter-Bold.ttf": "ba74cc325d5f67d0efbeda51616352db",
"assets/assets/fonts/Inter-ExtraBold.ttf": "72ac147c98056996b2a31e95a56d6e66",
"assets/assets/fonts/Inter-ExtraLight.ttf": "7a177fa21fece72dfaa5639d8f1c114a",
"assets/assets/fonts/Inter-Light.ttf": "a3fe4e0f9fdf3119c62a34b1937640dd",
"assets/assets/fonts/Inter-Medium.ttf": "cad1054327a25f42f2447d1829596bfe",
"assets/assets/fonts/Inter-Regular.ttf": "ea5879884a95551632e9eb1bba5b2128",
"assets/assets/fonts/Inter-SemiBold.ttf": "465266b2b986e33ef7e395f4df87b300",
"assets/assets/fonts/Inter-Thin.ttf": "4558ff85abeab91af24c86aab81509a7",
"assets/assets/fonts/OFL.txt": "09ed978d55339d326caa5e1495a6feb2",
"assets/assets/images/img-app-launcher.png": "3e1a8c82c9f29587d3857f69e879fcca",
"assets/assets/images/img-placeholder-image.jpg": "82b58413e8798e56e101b6820a83f7db",
"assets/FontManifest.json": "d35a8a91b82447fe393b22353b0b559a",
"assets/fonts/MaterialIcons-Regular.otf": "fb947fafa671596287ad9cf7422e9907",
"assets/NOTICES": "f936d4e13e3c32fa7d19257298e7940f",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/web/drift_worker.js": "afac8b57eb80f0846a382f7303929b0f",
"assets/web/sqlite3.wasm": "9839e2a1f55c56501c36b8e8483ee663",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b",
"drift_worker.js": "afac8b57eb80f0846a382f7303929b0f",
"favicon.png": "0b84e066137519a41dc6f4a84468bdb4",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"flutter_bootstrap.js": "4a6520de8ca3134482371d0fe847a1d3",
"icons/Icon-192.png": "7aaa900be3c1c3637503ca627af182b3",
"icons/Icon-512.png": "9df46b909a510cb32705592762b2976d",
"icons/Icon-maskable-192.png": "7aaa900be3c1c3637503ca627af182b3",
"icons/Icon-maskable-512.png": "9df46b909a510cb32705592762b2976d",
"index.html": "9184032464a4844ce0bdb31eaec08277",
"/": "9184032464a4844ce0bdb31eaec08277",
"main.dart.js": "c9b0442378ae13e858f6129d2ad9a8f6",
"main.dart.mjs": "49a0ce5f0fe9d59f2c2dc45f1d6087c9",
"main.dart.wasm": "cebe91ba38071d76ced7217a154ae1db",
"manifest.json": "9086acf6344a748109d6549a8a71138a",
"sqlite3.wasm": "9839e2a1f55c56501c36b8e8483ee663",
"version.json": "9896e2e9d40d78f7f59842bbdac0c69c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
