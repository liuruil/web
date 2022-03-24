export default {
    // 监测配置规则的使用状态
    RULE_USE_STATUS: {
        NOT_USE: {
            value: 0,
            desc: '未使用'
        },
        IN_USE: {
            value: 1,
            desc: '使用中'
        }
    },
    // 案件管理监测状态
    CASE_MONITOR_STATUS: {
        UNDER_MONITORING: {
            value: 1,
            desc: '监测中'
        },
        NOT_MONITOR: {
            value: 0,
            desc: '未监测'
        }
    },
    // 操作文字
    OPERATE_TEXT: {
        // 值为0代表下一步操作为启用
        UNFREEZE: {
            value: 0,
            desc: '启用'
        },
        // 值为1代表下一步操作为停用
        FREEZE: {
            value: 1,
            desc: '停用'
        }
    }
};