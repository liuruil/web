import { CURRENT_PAGE, ID, LIST, PAGE_SIZE, TOTAL } from '@/config';

// 参数常量
export const MONITOR_PARAMS = {
    ID,
    LIST,
    TOTAL,
    PAGE_SIZE,
    CURRENT_PAGE,
    NAME: 'ruleName',
    MANNER: 'manner',
    DURATION: 'duration',
    CONTENT: 'ruleContent',
    STATUS: 'monitorStatus',
    CREATE_TIME: 'createTime',
    FREQUENCY_NUM: 'frequencyNum',
    FREQUENCY_TYPE: 'frequencyType',
};

// 监测配置
export const monitorConfig = {
    // 监测频率
    left: [{
        label: '每周',
        value: 0
    }, {
        label: '每月',
        value: 1
    }],
    // 按周
    rightWeek: [
        { label: '周一', value: 1 },
        { label: '周二', value: 2 },
        { label: '周三', value: 3 },
        { label: '周四', value: 4 },
        { label: '周五', value: 5 },
        { label: '周六', value: 6 },
        { label: '周日', value: 7 }
    ],
    // 按月
    rightMonth: [
        { label: '第1日', value: 1 },
        { label: '第2日', value: 2 },
        { label: '第3日', value: 3 },
        { label: '第4日', value: 4 },
        { label: '第5日', value: 5 },
        { label: '第6日', value: 6 },
        { label: '第7日', value: 7 },
        { label: '第8日', value: 8 },
        { label: '第9日', value: 9 },
        { label: '第10日', value: 10 },
        { label: '第11日', value: 11 },
        { label: '第12日', value: 12 },
        { label: '第13日', value: 13 },
        { label: '第14日', value: 14 },
        { label: '第15日', value: 15 },
        { label: '第16日', value: 16 },
        { label: '第17日', value: 17 },
        { label: '第18日', value: 18 },
        { label: '第19日', value: 19 },
        { label: '第20日', value: 20 },
        { label: '第21日', value: 21 },
        { label: '第22日', value: 22 },
        { label: '第23日', value: 23 },
        { label: '第24日', value: 24 },
        { label: '第25日', value: 25 },
        { label: '第26日', value: 26 },
        { label: '第27日', value: 27 },
        { label: '第28日', value: 28 }
    ],
    // 监测时长
    monitorTime: [
        {
            label: '一个月',
            value: 1
        },
        {
            label: '三个月',
            value: 3
        },
        {
            label: '六个月',
            value: 6
        },
        {
            label: '一年',
            value: 12
        }
    ],
    // 告警方式
    warnType: [{
        id: 'remindWatch',
        title: '关注',
        list: [{
            label: '短信',
            value: false
        }, {
            label: '邮箱',
            value: false
        }, {
            label: '站内信',
            value: true
        }]
    },
    {
        id: 'remindAction',
        title: '行动',
        list: [{
            label: '短信',
            value: false
        }, {
            label: '邮箱',
            value: false
        }, {
            label: '站内信',
            value: true
        }]
    }],
    // 监控内容
    content: [
        {
            id: '1',
            label: '收入',
            checked: false,
            topValue: 1,
            bottomValue: 1,
        },
        {
            id: '2',
            label: '消费',
            checked: false,
            topValue: 1,
            bottomValue: 1,
        },
        {
            id: '3',
            label: '社保',
            checked: false,
            topValue: 1,
            bottomValue: 1,
        },
        {
            id: '4',
            label: '共债',
            checked: false,
            topValue: 1,
            bottomValue: 1,
        },
    ]
};