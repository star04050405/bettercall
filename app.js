const IMG_HIGHWAY = "assets/highway.jpg";
    const IMG_POLLOS = "assets/pollos.jpg";
    // Audio synthesis setup using Web Audio API
    let audioCtx = null;
    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    // Play crisp Hector Salamanca Bell Ding
    function playHectorBell() {
      try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        
        // Bell fundamental frequency ~ 2100Hz with high overtone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(2150, now);
        osc1.frequency.exponentialRampToValueAtTime(2120, now + 0.8);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(4300, now);

        gainNode.gain.setValueAtTime(0.7, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.9);
        osc2.stop(now + 0.9);
      } catch (e) {
        console.warn('Audio play error', e);
      }
    }

    // Play cheerful success chime
    function playSuccessChime() {
      try {
        const ctx = getAudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const t = ctx.currentTime + idx * 0.08;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.3, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.35);
        });
      } catch (e) {}
    }

    // 12 Curated Locations Data
    const SPOTS_DATA = [
      {
        id: 1,
        title: "索尔·古德曼法律事务所",
        enTitle: "Saul Goodman & Associates",
        tag: "jimmy",
        tagName: "吉米/索尔主线",
        char: "Saul Goodman, Francesca",
        address: "9800 Montgomery Blvd NE, Albuquerque, NM 87111",
        mapCoords: { x: 740, y: 180 },
        image: IMG_HIGHWAY,
        tips: "脱衣舞商场旁边，楼顶标志性充气自由女神像取景处",
        lore: "索尔·古德曼完全体时期的核心大本营。白宫立柱壁纸、罗马柱、黄色法式沙发、防弹玻璃隔断与‘505-503-4455’霓虹招牌。无数阿尔伯克基底层罪犯排队在此寻求法律庇护。",
        quote: "“Did you know that you have rights? The Constitution says you do, and so do I!”",
        quoteCn: "你知道你有权利吗？宪法说你有，我也这么认为！"
      },
      {
        id: 2,
        title: "美甲店后屋办公室",
        enTitle: "Day Spa & Nail Salon (Jimmy's Backroom)",
        tag: "jimmy",
        tagName: "吉米/索尔主线",
        char: "Jimmy McGill",
        address: "160 Juan Tabo Blvd NE, Albuquerque, NM 87123",
        mapCoords: { x: 800, y: 260 },
        image: IMG_HIGHWAY,
        tips: "现实中也是一家营业美甲沙龙，请勿偷喝黄瓜水",
        lore: "吉米·麦吉尔起步初期的蜗居之所。借住在越南美甲店轰鸣的热水炉小隔间，兼作卧室与接待穷困客户的事务所，以及那桶著名的‘黄瓜水只给尊贵客人喝’。",
        quote: "“Cucumber water for customer only!”",
        quoteCn: "黄瓜水只给尊贵的客人喝！"
      },
      {
        id: 3,
        title: "洛斯·波约斯·赫曼诺斯炸鸡店",
        enTitle: "Los Pollos Hermanos",
        tag: "gus",
        tagName: "炸鸡叔商业帝国",
        char: "Gus Fring, Mike",
        address: "4257 Isleta Blvd SW, Albuquerque, NM 87105 (Twisters Burgers)",
        mapCoords: { x: 380, y: 470 },
        image: IMG_POLLOS,
        tips: "现实中名为 Twisters Burgers，店内墙上保留着巨大的波约斯公鸡涂鸦壁画",
        lore: "格斯·弗林（Gus Fring）洗钱与快餐帝国的指挥中枢。店内永远保持着令人窒息的一尘不染，吉米曾受麦克委托潜入该店偷偷调查贩毒信使。",
        quote: "“It is... acceptable.”",
        quoteCn: "这……尚可接受。"
      },
      {
        id: 4,
        title: "HHM 律所大楼",
        enTitle: "Hamlin, Hamlin & McGill (Sunport Center)",
        tag: "kim",
        tagName: "金·韦克斯勒",
        char: "Howard Hamlin, Chuck McGill, Kim",
        address: "100 Sunport Blvd SE, Albuquerque, NM 87106",
        mapCoords: { x: 520, y: 480 },
        image: IMG_HIGHWAY,
        tips: "机场附近的现代玻璃办公大楼，水景喷泉完好保留",
        lore: "阿尔伯克基最具声望的高端精品律所，查克与霍华德的权力象牙塔。吉米曾在此度过收发室小职员岁月，金·韦克斯勒也曾在这里被打入地下档案室发配。",
        quote: "“The legal mind of our time.”",
        quoteCn: "我们这个时代最顶尖的法律头脑。"
      },
      {
        id: 5,
        title: "麦克看守的停车场收费亭",
        enTitle: "Mike's Parking Toll Booth",
        tag: "mike",
        tagName: "老麦克警卫线",
        char: "Mike Ehrmantraut, Jimmy",
        address: "401 2nd St NW, Albuquerque, NM 87102",
        mapCoords: { x: 460, y: 320 },
        image: IMG_HIGHWAY,
        tips: "位于阿布奎基市中心会展中心地下车库出口，拍照记得带两张贴纸",
        lore: "老麦克退休看守的阿布奎基法院地下车库出口。吉米每次办完公设辩护案离开时，都会因为少贴纸跟油盐不进的麦克唇枪舌剑。",
        quote: "“You got the stickers? You need stickers.”",
        quoteCn: "你有贴纸吗？没有贴纸你出不去。"
      },
      {
        id: 6,
        title: "热狗快餐店与倒卖手机街区",
        enTitle: "The Dog House Drive-In",
        tag: "jimmy",
        tagName: "吉米/索尔主线",
        char: "Jimmy McGill, Jesse Pinkman",
        address: "1216 Central Ave NW, Albuquerque, NM 87102 (Route 66)",
        mapCoords: { x: 380, y: 350 },
        image: IMG_HIGHWAY,
        tips: "66号公路经典汽车餐厅，巨大的霓虹小狗摇尾巴招牌入夜极美",
        lore: "吉米被吊销律师执照期间，在后备箱成箱倒卖一次性防追踪手机给社会底层混混的聚集地。绝命毒师中小粉也经常光顾此处买辣酱热狗。",
        quote: "“Burner phones! Untraceable, brand new!”",
        quoteCn: "一次性手机！无记名防追踪，全新出厂！"
      },
      {
        id: 7,
        title: "查克·麦吉尔的大宅",
        enTitle: "Chuck McGill's House",
        tag: "jimmy",
        tagName: "吉米/索尔主线",
        char: "Chuck McGill, Jimmy",
        address: "1607 San Cristobal Rd SW, Albuquerque, NM 87104",
        mapCoords: { x: 330, y: 330 },
        image: IMG_HIGHWAY,
        tips: "位于宁静的历史街区，请勿踏入私人草坪与大门，保持安静",
        lore: "查克饱受‘电磁过敏症’困扰期间断电离群索居的老宅。门口金属信箱用来存放所有来访者的手机与手表。吉米曾日复一日为他搬运冰块与报纸，恩怨也在此终结。",
        quote: "“I am not crazy! I know he swapped those numbers!”",
        quoteCn: "我没疯！我知道他偷换了那些门牌号码！"
      },
      {
        id: 8,
        title: "洛约拉家庭餐厅",
        enTitle: "Loyola's Family Restaurant",
        tag: "mike",
        tagName: "老麦克警卫线",
        char: "Mike Ehrmantraut, Gus Fring",
        address: "4500 Central Ave SE, Albuquerque, NM 87108",
        mapCoords: { x: 620, y: 350 },
        image: IMG_HIGHWAY,
        tips: "真实营业的老牌美式Diner，推荐点麦克同款黑咖啡与派",
        lore: "老麦克最钟爱的固定卡座餐厅。他在这里沉思、翻阅报纸、给小孙女存钱，也是格斯与打手们暗中接头传话的首选地点。",
        quote: "“Here's what's gonna happen...”",
        quoteCn: "接下来我告诉你该怎么做……"
      },
      {
        id: 9,
        title: "奥马哈肉桂卷店 (Gene 隐姓埋名期)",
        enTitle: "Cinnabon (Cottonwood Mall)",
        tag: "jimmy",
        tagName: "吉米/索尔主线",
        char: "Gene Takavic (Jimmy)",
        address: "10000 Coors Bypass NW, Albuquerque, NM 87114",
        mapCoords: { x: 260, y: 120 },
        image: IMG_HIGHWAY,
        tips: "位于大型购物中心一层，剧组实地在此取景拍摄黑白开场戏",
        lore: "后索尔时代的黑白世界。大难临头后吉米通过吸尘器老板改头换面，在内布拉斯加奥马哈商场担任谨小慎微的肉桂卷店经理 Gene Takavic。",
        quote: "“Best case scenario, I'm managing a Cinnabon in Omaha.”",
        quoteCn: "最好的结果，也就是一个月后我在奥马哈的一家肉桂卷店当经理。"
      },
      {
        id: 10,
        title: "十字路口汽车旅馆",
        enTitle: "The Crossroads Motel",
        tag: "kim",
        tagName: "金·韦克斯勒",
        char: "Wendy, Jimmy, Kim",
        address: "1001 Central Ave NE, Albuquerque, NM 87106",
        mapCoords: { x: 530, y: 350 },
        image: IMG_HIGHWAY,
        tips: "66号公路上著名的汽车旅馆，经常在两部剧中出镜",
        lore: "阿布奎基边缘人物与毒贩出没的经典旅店，温蒂经常在此揽客。吉米与金密谋构陷霍华德时，曾在这家汽车旅馆秘密雇佣温蒂演戏制造伪证。",
        quote: "“Just another day in Albuquerque.”",
        quoteCn: "阿布奎基稀松平常的一天。"
      },
      {
        id: 11,
        title: "荒漠700万美元运钞险境 (Bagman 荒原)",
        enTitle: "Desert Cash Run (San Ysidro Canyon)",
        tag: "mike",
        tagName: "老麦克警卫线",
        char: "Jimmy McGill, Mike",
        address: "To'hajiilee / White Mesa Trails, NM",
        mapCoords: { x: 120, y: 160 },
        image: IMG_HIGHWAY,
        tips: "壮丽的红色峡谷荒野，徒步需准备专业防晒与充沛饮用水",
        lore: "风骚律师全剧封神一集《运钞人》。吉米前往边境替拉洛提取700万美金保释金，遭遇枪手伏击后与老麦克两人负重徒步横穿绝命荒漠，甚至靠喝尿死里逃生。",
        quote: "“You can do this. You're a survivor.”",
        quoteCn: "你能挺过去。你是一个幸存者。"
      },
      {
        id: 12,
        title: "韦克斯勒·麦吉尔联合办公室",
        enTitle: "Wexler & McGill Law Offices",
        tag: "kim",
        tagName: "金·韦克斯勒",
        char: "Kim Wexler, Jimmy McGill",
        address: "1200 4th St NW, Albuquerque, NM 87102",
        mapCoords: { x: 440, y: 300 },
        image: IMG_HIGHWAY,
        tips: "市中心红砖建筑，周边咖啡馆林立",
        lore: "吉米与金两人共同憧憬的起点。各自独立执业但共用前台、牙医诊所改建的梦想律所。吉米亲手在墙上刷出的‘Wexler & McGill’招牌记录了两人最纯粹的温情岁月。",
        quote: "“Wexler McGill, partners in life and law.”",
        quoteCn: "韦克斯勒与麦吉尔，法律与生活的合伙人。"
      }
    ];

    // Badges Definition
    const BADGES_CONFIG = [
      { id: "b1", title: "初入江湖", desc: "完成任意 1 处打卡", icon: "🌱", check: (visited) => visited.length >= 1 },
      { id: "b2", title: "黄瓜水鉴定官", desc: "打卡美甲店后屋", icon: "🥒", check: (visited) => visited.includes(2) },
      { id: "b3", title: "波约斯炸鸡VIP", desc: "打卡炸鸡叔快餐店", icon: "🍗", check: (visited) => visited.includes(3) },
      { id: "b4", title: "贴纸守门人", desc: "打卡麦克收费亭", icon: "🎟️", check: (visited) => visited.includes(5) },
      { id: "b5", title: "阿布奎基活地图", desc: "完成 6 处地点打卡 (50%)", icon: "🗺️", check: (visited) => visited.length >= 6 },
      { id: "b6", title: "风骚大律师最高勋章", desc: "打卡全部 12 处圣地 (100%)", icon: "🏆", check: (visited) => visited.length >= 12 }
    ];

    // Ranks based on checked-in count
    function getUserRank(count) {
      if (count >= 12) return { title: "阿布奎基地下律政传奇", badgeColor: "text-amber-400 bg-amber-950/80 border-amber-500" };
      if (count >= 9) return { title: "索尔·古德曼高级合伙人", badgeColor: "text-red-400 bg-red-950/80 border-red-500" };
      if (count >= 6) return { title: "阿布奎基资深保释代理", badgeColor: "text-purple-400 bg-purple-950/80 border-purple-500" };
      if (count >= 3) return { title: "公设辩护人常客", badgeColor: "text-blue-400 bg-blue-950/80 border-blue-500" };
      if (count >= 1) return { title: "滑头吉米初来乍到", badgeColor: "text-emerald-400 bg-emerald-950/80 border-emerald-500" };
      return { title: "路人无名氏 (尚未打卡)", badgeColor: "text-zinc-400 bg-zinc-800 border-zinc-700" };
    }

    // App State Management
    class BCSApp {
      constructor() {
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.sortBy = 'default';
        this.activeSpotId = null;
        this.activeModalStar = 5;
        this.bellCount = 0;
        this.bellRageCount = 0;
        this.cucumberCount = 0;

        // Load storage
        this.storageKey = 'bcs_checkins_v1';
        this.loadState();

        this.initDOM();
        this.renderAll();
      }

      loadState() {
        try {
          const raw = localStorage.getItem(this.storageKey);
          if (raw) {
            this.state = JSON.parse(raw);
          } else {
            // Default demo state: 2 spots checked in so user sees progress immediately
            this.state = {
              checkins: {
                1: { date: "2026-10-20", rating: 5, note: "在Montgomery大道亲眼看到了标志性建筑！夕阳下太有感觉了，门口的立柱完全一模一样！" },
                3: { date: "2026-10-21", rating: 5, note: "现实中是一家叫Twisters的快餐店，墙壁上的公鸡壁画依然在，炸鸡卷饼很入味！" }
              },
              wishlist: [2, 5, 8],
              bellClicks: 0,
              cucumbers: 3
            };
            this.saveState();
          }
        } catch (e) {
          this.state = { checkins: {}, wishlist: [], bellClicks: 0, cucumbers: 0 };
        }
        this.bellCount = this.state.bellClicks || 0;
        this.cucumberCount = this.state.cucumbers || 0;
      }

      saveState() {
        try {
          this.state.bellClicks = this.bellCount;
          this.state.cucumbers = this.cucumberCount;
          localStorage.setItem(this.storageKey, JSON.stringify(this.state));
        } catch (e) {}
      }

      initDOM() {
        // Tab buttons
        document.getElementById('tab-btn-spots').addEventListener('click', () => this.switchView('spots'));
        document.getElementById('tab-btn-map').addEventListener('click', () => this.switchView('map'));
        document.getElementById('tab-btn-cert').addEventListener('click', () => this.switchView('cert'));
        document.getElementById('tab-btn-extras').addEventListener('click', () => this.switchView('extras'));
        document.getElementById('nav-brand').addEventListener('click', () => this.switchView('spots'));
        document.getElementById('hero-view-cert-btn').addEventListener('click', () => this.switchView('cert'));

        // Search & Filter
        const searchInput = document.getElementById('spot-search-input');
        const clearBtn = document.getElementById('search-clear-btn');
        searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value.trim().toLowerCase();
          clearBtn.classList.toggle('hidden', !this.searchQuery);
          this.renderSpots();
        });
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          this.searchQuery = '';
          clearBtn.classList.add('hidden');
          this.renderSpots();
        });

        document.getElementById('sort-select').addEventListener('change', (e) => {
          this.sortBy = e.target.value;
          this.renderSpots();
        });

        // Filter pills
        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => {
              b.classList.remove('active', 'bg-amber-500', 'text-zinc-950');
              b.classList.add('bg-zinc-800', 'text-zinc-300');
            });
            btn.classList.add('active', 'bg-amber-500', 'text-zinc-950');
            btn.classList.remove('bg-zinc-800', 'text-zinc-300');
            this.currentFilter = btn.dataset.filter;
            this.renderSpots();
          });
        });

        document.getElementById('reset-filter-btn').addEventListener('click', () => {
          this.searchQuery = '';
          this.currentFilter = 'all';
          searchInput.value = '';
          clearBtn.classList.add('hidden');
          document.querySelectorAll('.filter-btn').forEach(b => {
            if (b.dataset.filter === 'all') {
              b.classList.add('active', 'bg-amber-500', 'text-zinc-950');
              b.classList.remove('bg-zinc-800', 'text-zinc-300');
            } else {
              b.classList.remove('active', 'bg-amber-500', 'text-zinc-950');
              b.classList.add('bg-zinc-800', 'text-zinc-300');
            }
          });
          this.renderSpots();
        });

        // Quick Bell button in header
        document.getElementById('quick-bell-btn').addEventListener('click', () => this.ringBell());
        document.getElementById('main-bell-button').addEventListener('click', () => this.ringBell());

        // Drink cucumber water button
        document.getElementById('drink-cucumber-btn').addEventListener('click', () => {
          this.cucumberCount++;
          this.saveState();
          document.getElementById('cucumber-count').innerText = `${this.cucumberCount} 杯`;
          this.showToast('🥒 咕嘟咕嘟！你偷喝了一杯美甲店黄瓜水，沁人心脾！', '🥒');
        });

        // Star rating in modal
        document.querySelectorAll('.star-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const s = parseInt(btn.dataset.star, 10);
            this.setModalStars(s);
          });
        });

        // Modal actions
        document.getElementById('modal-close-btn').addEventListener('click', () => this.closeSpotModal());
        document.getElementById('modal-cancel-btn').addEventListener('click', () => this.closeSpotModal());
        document.getElementById('modal-save-checkin-btn').addEventListener('click', () => this.saveCheckinFromModal());
        document.getElementById('modal-delete-checkin-btn').addEventListener('click', () => this.deleteCheckinFromModal());
        
        document.getElementById('modal-copy-addr-btn').addEventListener('click', () => {
          const spot = SPOTS_DATA.find(s => s.id === this.activeSpotId);
          if (spot) {
            this.copyToClipboard(spot.address, '地址已复制到剪贴板！');
          }
        });

        document.getElementById('modal-wishlist-btn').addEventListener('click', () => {
          this.toggleWishlist(this.activeSpotId);
        });

        // Certificate actions
        document.getElementById('copy-cert-text-btn').addEventListener('click', () => this.copyCertReport());
        document.getElementById('download-cert-btn').addEventListener('click', () => {
          window.print();
        });

        // Map tooltip close
        document.getElementById('map-card-close').addEventListener('click', () => {
          document.getElementById('map-pin-card').classList.add('hidden');
        });
      }

      switchView(viewName) {
        document.querySelectorAll('.view-panel').forEach(p => p.classList.add('hidden'));
        document.querySelectorAll('.tab-btn').forEach(b => {
          b.classList.remove('active', 'bg-amber-500', 'text-zinc-950');
          b.classList.add('text-zinc-300');
        });

        const targetPanel = document.getElementById(`view-${viewName}`);
        const targetBtn = document.getElementById(`tab-btn-${viewName}`);
        if (targetPanel) targetPanel.classList.remove('hidden');
        if (targetBtn) {
          targetBtn.classList.add('active', 'bg-amber-500', 'text-zinc-950');
          targetBtn.classList.remove('text-zinc-300');
        }

        if (viewName === 'map') {
          this.renderMap();
        } else if (viewName === 'cert') {
          this.renderCertificate();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      ringBell() {
        playHectorBell();
        this.bellCount++;
        this.saveState();
        
        // Update counters
        document.getElementById('quick-bell-count').innerText = this.bellCount;
        document.getElementById('bell-combo').innerText = this.bellCount;

        // Visual effects on bell
        const bellSvg = document.getElementById('bell-svg-icon');
        bellSvg.classList.add('bell-ring');
        setTimeout(() => bellSvg.classList.remove('bell-ring'), 400);

        const ripple = document.getElementById('ding-ripple');
        if (ripple) {
          ripple.classList.remove('hidden');
          setTimeout(() => ripple.classList.add('hidden'), 500);
        }

        // Popup texts
        const dingTexts = ["DING!", "DING DING!!", "DING DING DING!!!", "炸鸡叔微微皱眉...", "卡特尔警告!", "叮叮叔大发雷霆!!"];
        const randomTxt = dingTexts[Math.floor(Math.random() * dingTexts.length)];
        const popup = document.getElementById('ding-text-popup');
        popup.innerText = randomTxt;

        if (this.bellCount % 10 === 0) {
          this.bellRageCount++;
          document.getElementById('bell-rage').innerText = this.bellRageCount;
          document.getElementById('bell-mood').innerText = "处于暴怒边缘!";
          document.getElementById('bell-mood').className = "text-xs font-black text-red-500 animate-pulse";
          this.showToast(`🚨 叮叮叔敲铃超 ${this.bellCount} 次！已达暴怒极点！`, '🛎️');
        }
      }

      playQuoteAudio(index) {
        playSuccessChime();
        const quotes = [
          "Did you know that you have rights? The Constitution says you do!",
          "Here's what's gonna happen...",
          "It is... acceptable.",
          "You think Jimmy is your only problem?"
        ];
        this.showToast(`🎙️ 经典原声回响: "${quotes[index]}"`, '🔊');
      }

      setModalStars(rating) {
        this.activeModalStar = rating;
        const labels = ["1 星 一般体验", "2 星 差强人意", "3 星 值得顺路一探", "4 星 剧迷必打卡", "5 星 绝命朝圣首选！"];
        document.getElementById('star-rating-text').innerText = labels[rating - 1] || `${rating} 星`;
        document.querySelectorAll('.star-btn').forEach(btn => {
          const s = parseInt(btn.dataset.star, 10);
          btn.classList.toggle('text-amber-400', s <= rating);
          btn.classList.toggle('text-zinc-600', s > rating);
        });
      }

      openSpotModal(spotId) {
        this.activeSpotId = spotId;
        const spot = SPOTS_DATA.find(s => s.id === spotId);
        if (!spot) return;

        const checkin = this.state.checkins[spotId];
        const isWishlist = this.state.wishlist.includes(spotId);

        document.getElementById('modal-img').src = spot.image;
        document.getElementById('modal-tag').innerText = spot.tagName;
        document.getElementById('modal-char').innerText = `角色: ${spot.char}`;
        document.getElementById('modal-title').innerText = spot.title;
        document.getElementById('modal-en-title').innerText = spot.enTitle;
        document.getElementById('modal-address').innerText = spot.address;
        document.getElementById('modal-tips').innerText = `💡 巡礼贴士: ${spot.tips}`;
        document.getElementById('modal-lore').innerText = spot.lore;
        document.getElementById('modal-quote').innerText = spot.quote;
        document.getElementById('modal-quote-cn').innerText = spot.quoteCn;

        // Wishlist button state
        const wlBtnText = document.getElementById('modal-wishlist-text');
        wlBtnText.innerText = isWishlist ? '已在心愿单' : '加入心愿单';

        // Checkin form fields
        const dateInput = document.getElementById('checkin-date');
        const noteInput = document.getElementById('checkin-note');
        const deleteBtn = document.getElementById('modal-delete-checkin-btn');
        const saveBtnText = document.getElementById('modal-save-btn-text');
        const visitedBadge = document.getElementById('modal-visited-badge');
        const dateDisplay = document.getElementById('modal-checkin-date-display');

        if (checkin) {
          visitedBadge.classList.remove('hidden');
          dateInput.value = checkin.date || new Date().toISOString().split('T')[0];
          noteInput.value = checkin.note || '';
          this.setModalStars(checkin.rating || 5);
          deleteBtn.classList.remove('hidden');
          saveBtnText.innerText = '更新打卡记录';
          dateDisplay.innerText = `首次打卡时间: ${checkin.date}`;
        } else {
          visitedBadge.classList.add('hidden');
          dateInput.value = new Date().toISOString().split('T')[0];
          noteInput.value = '';
          this.setModalStars(5);
          deleteBtn.classList.add('hidden');
          saveBtnText.innerText = '确认打卡盖章';
          dateDisplay.innerText = '';
        }

        document.getElementById('spot-modal').classList.remove('hidden');
      }

      closeSpotModal() {
        document.getElementById('spot-modal').classList.add('hidden');
      }

      saveCheckinFromModal() {
        if (!this.activeSpotId) return;
        const dateVal = document.getElementById('checkin-date').value || new Date().toISOString().split('T')[0];
        const noteVal = document.getElementById('checkin-note').value.trim();
        const ratingVal = this.activeModalStar;

        this.state.checkins[this.activeSpotId] = {
          date: dateVal,
          note: noteVal,
          rating: ratingVal
        };
        // If it was in wishlist, optionally keep or celebrate
        this.saveState();
        playSuccessChime();
        this.showToast('🎉 打卡成功！新墨西哥案发现场印章已盖下！', '✅');
        this.closeSpotModal();
        this.renderAll();
      }

      deleteCheckinFromModal() {
        if (!this.activeSpotId) return;
        delete this.state.checkins[this.activeSpotId];
        this.saveState();
        this.showToast('打卡记录已清除。', '🗑️');
        this.closeSpotModal();
        this.renderAll();
      }

      toggleWishlist(spotId) {
        const idx = this.state.wishlist.indexOf(spotId);
        if (idx >= 0) {
          this.state.wishlist.splice(idx, 1);
          this.showToast('已从心愿单中移除', '⭐');
        } else {
          this.state.wishlist.push(spotId);
          this.showToast('已加入你的阿布奎基心愿单！', '⭐');
        }
        this.saveState();
        const wlBtnText = document.getElementById('modal-wishlist-text');
        if (wlBtnText) {
          wlBtnText.innerText = this.state.wishlist.includes(spotId) ? '已在心愿单' : '加入心愿单';
        }
        this.renderAll();
      }

      copyToClipboard(text, successMsg) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => {
            this.showToast(successMsg, '📋');
          }).catch(() => {
            this.fallbackCopy(text, successMsg);
          });
        } else {
          this.fallbackCopy(text, successMsg);
        }
      }

      fallbackCopy(text, successMsg) {
        try {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          this.showToast(successMsg, '📋');
        } catch (e) {
          this.showToast('复制失败，请手动选取文本。', '⚠️');
        }
      }

      copyCertReport() {
        const visitedIds = Object.keys(this.state.checkins).map(Number);
        const count = visitedIds.length;
        const rank = getUserRank(count);
        const text = `⚖️【Better Call Saul 阿布奎基圣地巡礼战报】⚖️\n` +
          `巡礼者：滑头吉米的小号\n` +
          `执业资质：${rank.title}\n` +
          `已打卡地标：${count} / 12 (${Math.round((count/12)*100)}%)\n` +
          `特别走访地：${visitedIds.map(id => SPOTS_DATA.find(s=>s.id===id)?.title).filter(Boolean).join('、')}\n` +
          `“Did you know you have rights? The Constitution says you do, and so do I!”\n` +
          `快来完成你的风骚律师巡礼认证！`;
        this.copyToClipboard(text, '战报文本已成功复制到剪贴板！');
      }

      showToast(msg, icon = '⚖️') {
        const toast = document.getElementById('toast');
        document.getElementById('toast-msg').innerText = msg;
        document.getElementById('toast-icon').innerText = icon;
        toast.classList.remove('translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          toast.classList.add('translate-y-24', 'opacity-0');
          toast.classList.remove('translate-y-0', 'opacity-100');
        }, 3200);
      }

      renderAll() {
        this.renderStats();
        this.renderSpots();
        this.renderMap();
        this.renderCertificate();
      }

      renderStats() {
        const visitedIds = Object.keys(this.state.checkins).map(Number);
        const count = visitedIds.length;
        const pct = Math.round((count / SPOTS_DATA.length) * 100);
        const rank = getUserRank(count);

        document.getElementById('hero-checked-count').innerText = count;
        document.getElementById('hero-progress-pct').innerText = `${pct}% 达成`;
        
        const rankEl = document.getElementById('hero-user-rank');
        rankEl.innerHTML = `
          <span class="px-2 py-0.5 rounded text-xs border font-bold ${rank.badgeColor}">${rank.title}</span>
        `;

        document.getElementById('quick-bell-count').innerText = this.bellCount;
        document.getElementById('cucumber-count').innerText = `${this.cucumberCount} 杯`;
      }

      getFilteredSpots() {
        return SPOTS_DATA.filter(spot => {
          // Tag filter
          if (this.currentFilter === 'jimmy' && spot.tag !== 'jimmy') return false;
          if (this.currentFilter === 'mike' && spot.tag !== 'mike') return false;
          if (this.currentFilter === 'gus' && spot.tag !== 'gus') return false;
          if (this.currentFilter === 'kim' && spot.tag !== 'kim') return false;
          if (this.currentFilter === 'visited' && !this.state.checkins[spot.id]) return false;
          if (this.currentFilter === 'wishlist' && !this.state.wishlist.includes(spot.id)) return false;

          // Search filter
          if (this.searchQuery) {
            const combined = `${spot.title} ${spot.enTitle} ${spot.address} ${spot.lore} ${spot.quote} ${spot.char}`.toLowerCase();
            if (!combined.includes(this.searchQuery)) return false;
          }
          return true;
        }).sort((a, b) => {
          if (this.sortBy === 'visited-first') {
            const va = !!this.state.checkins[a.id];
            const vb = !!this.state.checkins[b.id];
            return vb - va;
          }
          if (this.sortBy === 'unvisited-first') {
            const va = !!this.state.checkins[a.id];
            const vb = !!this.state.checkins[b.id];
            return va - vb;
          }
          if (this.sortBy === 'name') {
            return a.title.localeCompare(b.title, 'zh-CN');
          }
          return a.id - b.id;
        });
      }

      renderSpots() {
        const grid = document.getElementById('spots-grid');
        const emptyState = document.getElementById('spots-empty-state');
        const spots = this.getFilteredSpots();

        if (spots.length === 0) {
          grid.innerHTML = '';
          emptyState.classList.remove('hidden');
          return;
        }

        emptyState.classList.add('hidden');
        grid.innerHTML = spots.map(spot => {
          const isVisited = !!this.state.checkins[spot.id];
          const isWishlist = this.state.wishlist.includes(spot.id);
          const checkinData = this.state.checkins[spot.id];

          return `
            <div class="bg-zinc-900 border ${isVisited ? 'border-amber-500/80 shadow-amber-500/10' : 'border-zinc-800'} rounded-2xl overflow-hidden shadow-xl flex flex-col group transition-all duration-300 hover:border-amber-500">
              
              <!-- Card Top Image Slot -->
              <div class="relative h-48 bg-zinc-950 overflow-hidden cursor-pointer" onclick="window.app.openSpotModal(${spot.id})">
                <img src="${spot.image}" alt="${spot.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>

                <!-- Top badges -->
                <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                  <span class="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500 text-zinc-950 shadow uppercase">
                    ${spot.tagName}
                  </span>
                </div>

                <div class="absolute top-3 right-3 flex items-center space-x-1.5">
                  <button onclick="event.stopPropagation(); window.app.toggleWishlist(${spot.id})" title="${isWishlist ? '移出心愿单' : '加入心愿单'}" class="w-8 h-8 rounded-full ${isWishlist ? 'bg-purple-600 text-white' : 'bg-black/60 text-zinc-400 hover:text-white'} flex items-center justify-center transition-colors">
                    ★
                  </button>
                </div>

                ${isVisited ? `
                  <div class="absolute bottom-3 left-3 bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow">
                    <span>✅ 已打卡 · ${checkinData.rating || 5}星</span>
                  </div>
                ` : `
                  <div class="absolute bottom-3 left-3 bg-zinc-950/80 text-zinc-300 text-[10px] font-medium px-2 py-0.5 rounded flex items-center space-x-1">
                    <span>📍 待探访</span>
                  </div>
                `}

                <div class="absolute bottom-3 right-3 text-[10px] text-zinc-400 bg-black/60 px-1.5 py-0.5 rounded font-mono">
                  #${spot.id}
                </div>
              </div>

              <!-- Card Body -->
              <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                  <div>
                    <h3 class="font-bold text-lg text-zinc-100 group-hover:text-amber-400 transition-colors cursor-pointer" onclick="window.app.openSpotModal(${spot.id})">
                      ${spot.title}
                    </h3>
                    <p class="text-xs text-zinc-400 font-serif italic">${spot.enTitle}</p>
                  </div>

                  <p class="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    ${spot.lore}
                  </p>

                  <div class="pt-1 flex items-center space-x-1.5 text-xs text-zinc-400 font-mono">
                    <span class="shrink-0 text-amber-500">📍</span>
                    <span class="truncate">${spot.address}</span>
                  </div>

                  ${isVisited && checkinData.note ? `
                    <div class="bg-amber-950/20 border-l-2 border-amber-500 p-2 rounded-r text-[11px] text-amber-200/90 italic">
                      “${checkinData.note}”
                    </div>
                  ` : ''}
                </div>

                <!-- Card Action Bar -->
                <div class="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                  <button onclick="window.app.openSpotModal(${spot.id})" class="flex-1 py-2 rounded-xl text-xs font-bold transition-all ${isVisited ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-md shadow-amber-500/10'}">
                    ${isVisited ? '查看/修改记录' : '✅ 立即打卡'}
                  </button>
                  <button onclick="window.app.copyToClipboard('${spot.address}', '地址已复制！')" title="复制现实地址" class="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs">
                    📋
                  </button>
                </div>

              </div>

            </div>
          `;
        }).join('');
      }

      renderMap() {
        const layer = document.getElementById('map-markers-layer');
        if (!layer) return;

        layer.innerHTML = SPOTS_DATA.map(spot => {
          const isVisited = !!this.state.checkins[spot.id];
          const isWishlist = this.state.wishlist.includes(spot.id);
          
          let pinColor = '#f59e0b'; // Amber default
          if (isVisited) pinColor = '#10b981'; // Emerald visited
          else if (isWishlist) pinColor = '#a855f7'; // Purple wishlist

          return `
            <g class="cursor-pointer map-pin-group" transform="translate(${spot.mapCoords.x}, ${spot.mapCoords.y})" onclick="window.app.onMapPinClick(${spot.id})">
              <!-- Glow ring for visited -->
              ${isVisited ? `
                <circle r="16" fill="#10b981" opacity="0.25" class="animate-pulse"/>
              ` : ''}
              
              <!-- Pin Base Shadow -->
              <ellipse cx="0" cy="5" rx="8" ry="3" fill="#000000" opacity="0.5"/>
              
              <!-- Pin Marker Head -->
              <path d="M 0 -18 C -9 -18 -10 -9 0 4 C 10 -9 9 -18 0 -18 Z" fill="${pinColor}" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"/>
              
              <!-- Center Spot ID -->
              <circle cx="0" cy="-10" r="4.5" fill="#18181b"/>
              <text x="0" y="-8" fill="#ffffff" font-size="7" font-weight="bold" text-anchor="middle">${spot.id}</text>
              
              <!-- Label -->
              <rect x="-40" y="-34" width="80" height="13" rx="3" fill="#18181b" opacity="0.85"/>
              <text x="0" y="-25" fill="#f4f4f5" font-size="7.5" font-weight="600" text-anchor="middle">${spot.title.slice(0, 7)}..</text>
            </g>
          `;
        }).join('');
      }

      onMapPinClick(spotId) {
        const spot = SPOTS_DATA.find(s => s.id === spotId);
        if (!spot) return;

        const isVisited = !!this.state.checkins[spot.id];
        const card = document.getElementById('map-pin-card');
        
        document.getElementById('map-card-tag').innerText = spot.tagName;
        document.getElementById('map-card-title').innerText = `${spot.id}. ${spot.title}`;
        document.getElementById('map-card-address').innerText = spot.address;
        document.getElementById('map-card-desc').innerText = spot.lore;
        
        const statusEl = document.getElementById('map-card-status');
        if (isVisited) {
          statusEl.innerText = '✅ 已经打卡';
          statusEl.className = 'text-xs font-bold text-emerald-400';
        } else {
          statusEl.innerText = '📍 尚未打卡';
          statusEl.className = 'text-xs font-bold text-amber-400';
        }

        const actionBtn = document.getElementById('map-card-action-btn');
        actionBtn.innerText = isVisited ? '查看打卡随笔' : '前往打卡';
        actionBtn.onclick = () => {
          this.openSpotModal(spot.id);
        };

        card.classList.remove('hidden');
      }

      renderCertificate() {
        const visitedIds = Object.keys(this.state.checkins).map(Number);
        const count = visitedIds.length;
        const total = SPOTS_DATA.length;
        const pct = Math.round((count / total) * 100);
        const rank = getUserRank(count);

        // Update badges
        const badgesContainer = document.getElementById('badges-grid');
        let unlockedCount = 0;
        badgesContainer.innerHTML = BADGES_CONFIG.map(b => {
          const unlocked = b.check(visitedIds);
          if (unlocked) unlockedCount++;
          return `
            <div class="p-3 rounded-xl border flex flex-col items-center text-center space-y-1.5 transition-all ${unlocked ? 'bg-amber-500/10 border-amber-500/50 text-amber-200' : 'bg-zinc-950 border-zinc-800 text-zinc-600 opacity-60'}">
              <span class="text-3xl">${b.icon}</span>
              <div class="font-bold text-xs ${unlocked ? 'text-amber-400' : 'text-zinc-500'}">${b.title}</div>
              <div class="text-[10px] ${unlocked ? 'text-zinc-300' : 'text-zinc-600'}">${b.desc}</div>
              <span class="text-[9px] font-mono px-1.5 py-0.2 rounded ${unlocked ? 'bg-amber-500 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-600'}">
                ${unlocked ? '已解锁' : '未达成'}
              </span>
            </div>
          `;
        }).join('');

        // Certificate Details
        document.getElementById('cert-stat-ratio').innerText = `已踏足 ${count} / ${total} 个关键案发现场 (${pct}%)`;
        document.getElementById('cert-progress-bar').style.width = `${pct}%`;
        document.getElementById('cert-rank-title').innerText = rank.title;
        document.getElementById('cert-badge-count').innerText = `${unlockedCount} / ${BADGES_CONFIG.length} 枚`;
        
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('cert-date').innerText = today;
      }
    }

    // Launch application on window load
    window.addEventListener('DOMContentLoaded', () => {
      document.getElementById('hero-img-banner').src = IMG_HIGHWAY;
      document.getElementById('featured-pollos-img').src = IMG_POLLOS;
      window.app = new BCSApp();
    });