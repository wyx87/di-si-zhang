// 第四章高级数据可视化平台 - 基于matplotlib图表样式与颜色应用

class Chapter4AdvancedVisualizationPlatform {
    constructor() {
        this.charts = {};
        this.currentData = [];
        this.currentExample = 'book_purchase';
        this.isMultiChartMode = true;
        this.colorSchemes = {
            matplotlib: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f'],
            pastel: ['#FFB6C1', '#87CEFA', '#98FB98', '#FFD700', '#DDA0DD', '#FFA07A', '#20B2AA', '#87CEEB'],
            cool: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3']
        };
        this.currentColorScheme = 'matplotlib';
        this.lineStyles = {
            solid: 'solid',
            dashed: 'dashed',
            dotted: 'dotted',
            dashdot: 'dashdot'
        };
        this.colormaps = ['viridis', 'plasma', 'inferno', 'magma', 'cool', 'hot', 'spring', 'summer', 'autumn', 'winter'];
        this.init();
    }

    // 初始化方法
    init() {
        console.log('初始化第四章高级数据可视化平台...');
        this.loadExampleData();
        this.initializeCharts();
        this.bindEvents();
        this.updateDataTable();
        this.updateCodeDisplay();
        this.updateSectionTitle();
        this.updateStats();
        console.log('初始化完成！');
    }

    // 加载示例数据
    loadExampleData() {
        if (this.currentExample === 'book_purchase') {
            // 4.2.3 图书采购情况实例数据
            this.currentData = [
                { category: '家庭', value1: 1200, value2: 1050 },
                { category: '小说', value1: 2400, value2: 2100 },
                { category: '心理', value1: 1800, value2: 1300 },
                { category: '科技', value1: 2200, value2: 1600 },
                { category: '儿童', value1: 1600, value2: 1340 }
            ];
        } else if (this.currentExample === 'exchange_rate') {
            // 4.3.2 汇率走势图实例数据
            this.currentData = [
                { date: '2017-07-01', value1: 6.78, value2: 6.89 },
                { date: '2017-07-08', value1: 6.79, value2: 6.91 },
                { date: '2017-07-15', value1: 6.80, value2: 6.93 },
                { date: '2017-07-22', value1: 6.82, value2: 6.95 },
                { date: '2017-07-29', value1: 6.84, value2: 6.97 },
                { date: '2019-07-01', value1: 6.85, value2: 6.98 },
                { date: '2019-07-08', value1: 6.86, value2: 6.99 },
                { date: '2019-07-15', value1: 6.87, value2: 7.00 },
                { date: '2019-07-22', value1: 6.88, value2: 7.01 },
                { date: '2019-07-29', value1: 6.89, value2: 7.02 }
            ];
        } else {
            // 自定义数据
            this.currentData = [
                { category: '数据1', value1: 100, value2: 200 },
                { category: '数据2', value1: 150, value2: 180 },
                { category: '数据3', value1: 200, value2: 220 },
                { category: '数据4', value1: 120, value2: 160 },
                { category: '数据5', value1: 180, value2: 190 }
            ];
        }
    }

    // 初始化图表
    initializeCharts() {
        console.log('初始化图表...');
        // 检查元素是否存在
        const chart1Element = document.getElementById('mainChart1');
        const chart2Element = document.getElementById('mainChart2');
        
        if (!chart1Element || !chart2Element) {
            console.error('图表容器元素不存在！');
            return;
        }

        // 初始化两个图表
        try {
            this.charts.chart1 = echarts.init(chart1Element);
            this.charts.chart2 = echarts.init(chart2Element);
            this.updateCharts();
            console.log('图表初始化成功！');
        } catch (error) {
            console.error('图表初始化失败:', error);
        }
    }

    // 绑定事件
    bindEvents() {
        console.log('绑定事件...');
        
        // 实例选择
        const exampleSelect = document.getElementById('exampleSelect');
        if (exampleSelect) {
            exampleSelect.addEventListener('change', (e) => {
                this.currentExample = e.target.value;
                this.loadExampleData();
                this.updateDataTable();
                this.updateCharts();
                this.updateCodeDisplay();
                this.updateSectionTitle();
                this.updateStats();
            });
        }

        // 图表类型切换
        this.bindSelectChange('chartType1', () => this.updateCharts());
        this.bindSelectChange('chartType2', () => this.updateCharts());

        // 动画效果
        this.bindCheckboxChange('animation1', () => this.updateCharts());
        this.bindCheckboxChange('animation2', () => this.updateCharts());

        // 颜色方案切换
        document.querySelectorAll('.color-scheme').forEach(scheme => {
            scheme.addEventListener('click', () => {
                document.querySelectorAll('.color-scheme').forEach(s => s.classList.remove('active'));
                scheme.classList.add('active');
                this.currentColorScheme = scheme.dataset.scheme;
                this.updateCharts();
                this.updateCodeDisplay();
            });
        });

        // 颜色映射表
        this.bindSelectChange('colormap', () => this.updateCharts());

        // 线型样式
        this.bindSelectChange('lineStyle', () => {
            this.updateCharts();
            this.updateCodeDisplay();
        });

        // 样式设置
        this.bindCheckboxChange('gridToggle', () => this.updateCharts());
        this.bindCheckboxChange('legendToggle', () => this.updateCharts());
        this.bindCheckboxChange('smoothToggle', () => this.updateCharts());

        // 高级图表设置
        this.bindRangeInput('markerSize', 'markerSizeValue', 'px', () => this.updateCharts());
        this.bindRangeInput('lineWidth', 'lineWidthValue', 'px', () => this.updateCharts());
        this.bindRangeInput('opacity', 'opacityValue', '%', (e) => {
            document.getElementById('opacityValue').textContent = Math.round(e.target.value * 100) + '%';
            this.updateCharts();
        }, true);
        this.bindRangeInput('animationSpeed', 'animationSpeedValue', 'ms', () => this.updateCharts());

        // 操作按钮
        this.bindButtonClick('applyChanges', () => this.applyChanges());
        this.bindButtonClick('resetData', () => this.resetData());
        this.bindButtonClick('exportPNG', () => this.exportAsPNG());
        this.bindButtonClick('exportData', () => this.exportData());
        this.bindButtonClick('importData', () => this.showImportModal());
        this.bindButtonClick('screenshot', () => this.takeScreenshot());

        // 全屏功能
        this.bindButtonClick('fullscreen', () => this.toggleFullscreen());
        
        // 图表全屏按钮
        document.querySelectorAll('.chart-fullscreen').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartId = e.target.dataset.chart;
                this.toggleChartFullscreen(chartId);
            });
        });

        // 图表下载按钮
        document.querySelectorAll('.chart-download').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartId = e.target.dataset.chart;
                this.downloadChart(chartId);
            });
        });

        // 章节信息
        this.bindButtonClick('chapterInfo', () => {
            document.getElementById('chapterModal').style.display = 'block';
        });

        // 主题切换
        this.bindButtonClick('themeToggle', () => this.toggleTheme());

        // 代码标签切换
        document.querySelectorAll('.code-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.code-display').forEach(d => d.classList.remove('active'));
                
                e.target.classList.add('active');
                const tabName = e.target.dataset.tab;
                document.getElementById(tabName + 'Code').classList.add('active');
            });
        });

        // 数据编辑功能
        this.bindButtonClick('addRow', () => this.addDataRow());
        this.bindButtonClick('removeRow', () => this.removeDataRow());
        this.bindButtonClick('addColumn', () => this.addDataColumn());
        this.bindButtonClick('removeColumn', () => this.removeDataColumn());

        // 数据导入功能
        this.bindButtonClick('confirmImport', () => this.importData());
        this.bindButtonClick('cancelImport', () => this.hideImportModal());
        
        // 分析功能按钮
        this.bindButtonClick('exportAnalysis', () => this.exportAnalysisReport());
        this.bindButtonClick('advancedAnalysis', () => this.performAdvancedAnalysis());
        
        // 窗口大小变化
        window.addEventListener('resize', () => this.resizeCharts());

        // 默认激活matplotlib颜色方案
        const matplotlibScheme = document.querySelector('[data-scheme="matplotlib"]');
        if (matplotlibScheme) {
            matplotlibScheme.classList.add('active');
        }

        // 模态框关闭按钮
        document.querySelectorAll('.modal .close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                closeBtn.closest('.modal').style.display = 'none';
            });
        });

        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            document.querySelectorAll('.modal').forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        console.log('事件绑定完成！');
    }

    // 绑定选择框变化事件
    bindSelectChange(id, callback) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', callback);
        }
    }

    // 绑定复选框变化事件
    bindCheckboxChange(id, callback) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', callback);
        }
    }

    // 绑定范围输入变化事件
    bindRangeInput(inputId, displayId, unit, callback, isPercentage = false) {
        const input = document.getElementById(inputId);
        const display = document.getElementById(displayId);
        
        if (input && display) {
            input.addEventListener('input', (e) => {
                if (isPercentage) {
                    display.textContent = Math.round(e.target.value * 100) + unit;
                } else {
                    display.textContent = e.target.value + unit;
                }
                callback(e);
            });
        }
    }

    // 绑定按钮点击事件
    bindButtonClick(id, callback) {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', callback);
        }
    }

    // 更新图表
    updateCharts() {
        console.log('更新图表...');
        
        if (!this.charts.chart1 || !this.charts.chart2) {
            console.error('图表未初始化！');
            return;
        }

        try {
            const chartType1 = document.getElementById('chartType1').value;
            const chartType2 = document.getElementById('chartType2').value;
            const option1 = this.getChartOption(chartType1, 1);
            const option2 = this.getChartOption(chartType2, 2);
            
            this.charts.chart1.setOption(option1, true);
            this.charts.chart2.setOption(option2, true);
            console.log('图表更新成功！');
        } catch (error) {
            console.error('图表更新失败:', error);
        }
    }

    // 获取图表配置
    getChartOption(chartType, chartNumber) {
        const colors = this.colorSchemes[this.currentColorScheme];
        const colormap = document.getElementById('colormap').value;
        const showGrid = document.getElementById('gridToggle').checked;
        const showLegend = document.getElementById('legendToggle').checked;
        const animation1 = document.getElementById('animation1').checked;
        const animation2 = document.getElementById('animation2').checked;
        const animation = chartNumber === 1 ? animation1 : animation2;
        const lineStyle = document.getElementById('lineStyle').value;
        const smooth = document.getElementById('smoothToggle').checked;
        
        // 高级设置
        const markerSize = parseInt(document.getElementById('markerSize').value);
        const lineWidth = parseInt(document.getElementById('lineWidth').value);
        const opacity = parseFloat(document.getElementById('opacity').value);
        const animationSpeed = parseInt(document.getElementById('animationSpeed').value);

        // 生成颜色映射表
        const generateColormapColors = () => {
            return colors.map((color, index) => {
                switch (colormap) {
                    case 'viridis':
                        return colors[index % colors.length];
                    case 'plasma':
                        return colors[(index + 2) % colors.length];
                    case 'inferno':
                        return colors[(index + 4) % colors.length];
                    case 'magma':
                        return colors[(index + 1) % colors.length];
                    case 'cool':
                        return `hsl(${240 - index * 30}, 70%, 60%)`;
                    case 'hot':
                        return `rgb(${255 - index * 30}, ${100 + index * 20}, ${50})`;
                    case 'spring':
                        return `hsl(${330 - index * 20}, 100%, 60%)`;
                    case 'summer':
                        return `hsl(${90 - index * 10}, 80%, 60%)`;
                    case 'autumn':
                        return `hsl(${30 - index * 5}, 100%, 60%)`;
                    case 'winter':
                        return `hsl(${240 - index * 10}, 100%, 60%)`;
                    default:
                        return colors[index % colors.length];
                }
            });
        };

        const finalColors = colormap !== 'viridis' ? generateColormapColors() : colors;

        const baseOption = {
            backgroundColor: 'transparent',
            animation: animation,
            animationDuration: animationSpeed,
            animationEasing: 'cubicOut',
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    let result = `<strong>${params[0].name}</strong><br/>`;
                    params.forEach(param => {
                        result += `${param.seriesName}: ${param.value}<br/>`;
                    });
                    return result;
                }
            },
            legend: {
                show: showLegend,
                data: this.currentExample === 'book_purchase' ? ['地区1', '地区2'] : 
                      this.currentExample === 'exchange_rate' ? ['2017年', '2019年'] : ['系列1', '系列2'],
                textStyle: { color: '#666' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            }
        };

        if (this.currentExample === 'book_purchase') {
            const categories = this.currentData.map(item => item.category);
            const values1 = this.currentData.map(item => item.value1);
            const values2 = this.currentData.map(item => item.value2);

            switch (chartType) {
                case 'line':
                    return {
                        ...baseOption,
                        xAxis: {
                            type: 'category',
                            data: categories,
                            axisLine: { lineStyle: { color: '#ccc' } }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: { lineStyle: { color: '#ccc' } },
                            splitLine: { show: showGrid, lineStyle: { color: '#f0f0f0' } }
                        },
                        series: [
                            {
                                name: '地区1',
                                type: 'line',
                                data: values1,
                                smooth: smooth,
                                lineStyle: { 
                                    type: lineStyle,
                                    width: lineWidth,
                                    opacity: opacity
                                },
                                itemStyle: { 
                                    color: finalColors[0],
                                    opacity: opacity
                                },
                                symbolSize: markerSize,
                                lineWidth: lineWidth
                            },
                            {
                                name: '地区2',
                                type: 'line',
                                data: values2,
                                smooth: smooth,
                                lineStyle: { 
                                    type: lineStyle,
                                    width: lineWidth,
                                    opacity: opacity
                                },
                                itemStyle: { 
                                    color: finalColors[1],
                                    opacity: opacity
                                },
                                symbolSize: markerSize,
                                lineWidth: lineWidth
                            }
                        ]
                    };

                case 'bar':
                    return {
                        ...baseOption,
                        xAxis: {
                            type: 'category',
                            data: categories,
                            axisLine: { lineStyle: { color: '#ccc' } }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: { lineStyle: { color: '#ccc' } },
                            splitLine: { show: showGrid, lineStyle: { color: '#f0f0f0' } }
                        },
                        series: [
                            {
                                name: '地区1',
                                type: 'bar',
                                data: values1,
                                itemStyle: { color: finalColors[0] }
                            },
                            {
                                name: '地区2',
                                type: 'bar',
                                data: values2,
                                itemStyle: { color: finalColors[1] }
                            }
                        ]
                    };

                case 'stacked_bar':
                    return {
                        ...baseOption,
                        xAxis: {
                            type: 'category',
                            data: categories,
                            axisLine: { lineStyle: { color: '#ccc' } }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: { lineStyle: { color: '#ccc' } },
                            splitLine: { show: showGrid, lineStyle: { color: '#f0f0f0' } }
                        },
                        series: [
                            {
                                name: '地区1',
                                type: 'bar',
                                stack: '总量',
                                data: values1,
                                itemStyle: { color: finalColors[0] }
                            },
                            {
                                name: '地区2',
                                type: 'bar',
                                stack: '总量',
                                data: values2,
                                itemStyle: { color: finalColors[1] }
                            }
                        ]
                    };

                case 'area':
                    return {
                        ...baseOption,
                        xAxis: {
                            type: 'category',
                            data: categories,
                            axisLine: { lineStyle: { color: '#ccc' } }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: { lineStyle: { color: '#ccc' } },
                            splitLine: { show: showGrid, lineStyle: { color: '#f0f0f0' } }
                        },
                        series: [
                            {
                                name: '地区1',
                                type: 'line',
                                data: values1,
                                smooth: smooth,
                                lineStyle: { type: lineStyle },
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: colors[0] },
                                        { offset: 1, color: colors[0] + '20' }
                                    ])
                                }
                            },
                            {
                                name: '地区2',
                                type: 'line',
                                data: values2,
                                smooth: smooth,
                                lineStyle: { type: lineStyle },
                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: colors[1] },
                                        { offset: 1, color: colors[1] + '20' }
                                    ])
                                }
                            }
                        ]
                    };

                case 'pie':
                    return {
                        ...baseOption,
                        series: [
                            {
                                name: '地区1',
                                type: 'pie',
                                radius: '50%',
                                data: categories.map((cat, i) => ({
                                    name: cat,
                                    value: values1[i]
                                })),
                                itemStyle: {
                                    color: (params) => colors[params.dataIndex % colors.length]
                                }
                            }
                        ]
                    };

                case 'radar':
                    return {
                        ...baseOption,
                        radar: {
                            indicator: categories.map(cat => ({ name: cat, max: 3000 }))
                        },
                        series: [
                            {
                                name: '地区1',
                                type: 'radar',
                                data: [values1],
                                itemStyle: { color: finalColors[0] }
                            },
                            {
                                name: '地区2',
                                type: 'radar',
                                data: [values2],
                                itemStyle: { color: finalColors[1] }
                            }
                        ]
                    };

                default:
                    return baseOption;
            }
        } else {
            // 汇率走势图数据或自定义数据
            const categories = this.currentData.map(item => 
                this.currentExample === 'exchange_rate' ? item.date : item.category
            );
            const values1 = this.currentData.map(item => item.value1);
            const values2 = this.currentData.map(item => item.value2);

            const seriesName1 = this.currentExample === 'exchange_rate' ? '2017年' : '系列1';
            const seriesName2 = this.currentExample === 'exchange_rate' ? '2019年' : '系列2';

            switch (chartType) {
                case 'line':
                    return {
                        ...baseOption,
                        xAxis: {
                            type: 'category',
                            data: categories,
                            axisLine: { lineStyle: { color: '#ccc' } }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: { lineStyle: { color: '#ccc' } },
                            splitLine: { show: showGrid, lineStyle: { color: '#f0f0f0' } }
                        },
                        series: [
                            {
                                name: seriesName1,
                                type: 'line',
                                data: values1,
                                smooth: smooth,
                                lineStyle: { type: lineStyle },
                                itemStyle: { color: finalColors[0] }
                            },
                            {
                                name: seriesName2,
                                type: 'line',
                                data: values2,
                                smooth: smooth,
                                lineStyle: { type: lineStyle },
                                itemStyle: { color: finalColors[1] }
                            }
                        ]
                    };

                case 'bar':
                    return {
                        ...baseOption,
                        xAxis: {
                            type: 'category',
                            data: categories,
                            axisLine: { lineStyle: { color: '#ccc' } }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: { lineStyle: { color: '#ccc' } },
                            splitLine: { show: showGrid, lineStyle: { color: '#f0f0f0' } }
                        },
                        series: [
                            {
                                name: seriesName1,
                                type: 'bar',
                                data: values1,
                                itemStyle: { color: finalColors[0] }
                            },
                            {
                                name: seriesName2,
                                type: 'bar',
                                data: values2,
                                itemStyle: { color: finalColors[1] }
                            }
                        ]
                    };

                case 'scatter':
                    return {
                        ...baseOption,
                        xAxis: {
                            type: 'value',
                            axisLine: { lineStyle: { color: '#ccc' } }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: { lineStyle: { color: '#ccc' } },
                            splitLine: { show: showGrid, lineStyle: { color: '#f0f0f0' } }
                        },
                        series: [
                            {
                                name: seriesName1,
                                type: 'scatter',
                                data: values1.map((v, i) => [v, values2[i]]),
                                itemStyle: { color: finalColors[0] }
                            }
                        ]
                    };

                default:
                    return baseOption;
            }
        }
    }

    // 更新数据表格
    updateDataTable() {
        const table = document.getElementById('dataTable');
        if (!table) return;
        
        let headers = '';
        let rows = '';
        
        if (this.currentExample === 'book_purchase') {
            headers = '<tr><th onclick="platform.sortData(\'category\')" style="cursor: pointer;">图书种类 🔽</th><th onclick="platform.sortData(\'value1\')" style="cursor: pointer;">地区1采购量 🔽</th><th onclick="platform.sortData(\'value2\')" style="cursor: pointer;">地区2采购量 🔽</th></tr>';
            rows = this.currentData.map((item, index) => `
                <tr>
                    <td>${item.category}</td>
                    <td><input type="number" value="${item.value1}" onchange="platform.updateDataValue(${index}, 'value1', this.value)"></td>
                    <td><input type="number" value="${item.value2}" onchange="platform.updateDataValue(${index}, 'value2', this.value)"></td>
                </tr>
            `).join('');
        } else if (this.currentExample === 'exchange_rate') {
            headers = '<tr><th onclick="platform.sortData(\'date\')" style="cursor: pointer;">日期 🔽</th><th onclick="platform.sortData(\'value1\')" style="cursor: pointer;">2017年汇率 🔽</th><th onclick="platform.sortData(\'value2\')" style="cursor: pointer;">2019年汇率 🔽</th></tr>';
            rows = this.currentData.map((item, index) => `
                <tr>
                    <td>${item.date}</td>
                    <td><input type="number" value="${item.value1}" onchange="platform.updateDataValue(${index}, 'value1', this.value)"></td>
                    <td><input type="number" value="${item.value2}" onchange="platform.updateDataValue(${index}, 'value2', this.value)"></td>
                </tr>
            `).join('');
        } else {
            headers = '<tr><th onclick="platform.sortData(\'category\')" style="cursor: pointer;">类别 🔽</th><th onclick="platform.sortData(\'value1\')" style="cursor: pointer;">系列1 🔽</th><th onclick="platform.sortData(\'value2\')" style="cursor: pointer;">系列2 🔽</th></tr>';
            rows = this.currentData.map((item, index) => `
                <tr>
                    <td><input type="text" value="${item.category}" onchange="platform.updateDataValue(${index}, 'category', this.value)"></td>
                    <td><input type="number" value="${item.value1}" onchange="platform.updateDataValue(${index}, 'value1', this.value)"></td>
                    <td><input type="number" value="${item.value2}" onchange="platform.updateDataValue(${index}, 'value2', this.value)"></td>
                </tr>
            `).join('');
        }
        
        table.innerHTML = `<table><thead>${headers}</thead><tbody>${rows}</tbody></table>`;
    }

    // 数据排序
    sortData(field) {
        this.currentData.sort((a, b) => {
            if (typeof a[field] === 'string') {
                return a[field].localeCompare(b[field]);
            } else {
                return a[field] - b[field];
            }
        });
        this.updateDataTable();
        this.updateCharts();
        this.showAlert(`数据已按 ${field} 排序`);
    }

    // 更新数据值
    updateDataValue(index, field, value) {
        this.currentData[index][field] = field.includes('value') ? parseFloat(value) : value;
        this.updateCharts();
        this.updateStats();
    }

    // 更新统计信息
    updateStats() {
        const values = [...this.currentData.map(item => item.value1), ...this.currentData.map(item => item.value2)];
        const count = values.length;
        const mean = values.reduce((a, b) => a + b, 0) / count;
        const max = Math.max(...values);
        const min = Math.min(...values);

        const countElement = document.getElementById('dataCount');
        const meanElement = document.getElementById('dataMean');
        const maxElement = document.getElementById('dataMax');
        const minElement = document.getElementById('dataMin');

        if (countElement) countElement.textContent = count;
        if (meanElement) meanElement.textContent = mean.toFixed(2);
        if (maxElement) maxElement.textContent = max.toFixed(2);
        if (minElement) minElement.textContent = min.toFixed(2);
    }

    // 更新代码显示
    updateCodeDisplay() {
        const pythonCode = document.getElementById('pythonCode');
        const javascriptCode = document.getElementById('javascriptCode');
        
        if (!pythonCode || !javascriptCode) return;

        const chartType1 = document.getElementById('chartType1').value;
        const chartType2 = document.getElementById('chartType2').value;
        const showGrid = document.getElementById('gridToggle').checked;
        const showLegend = document.getElementById('legendToggle').checked;
        const smooth = document.getElementById('smoothToggle').checked;
        const lineStyle = document.getElementById('lineStyle').value;
        const colormap = document.getElementById('colormap').value;
        
        if (this.currentExample === 'book_purchase') {
            pythonCode.innerHTML = `
                <pre><code># 第四章 4.2.3 实例代码 - 两个地区对图书采购情况
# 知识点：图表样式、颜色应用、线型选择

import matplotlib.pyplot as plt
import numpy as np

# 4.1 图表样式配置
plt.rcParams['font.sans-serif'] = ['SimHei']     # 中文字体
plt.rcParams['axes.unicode_minus'] = False      # 负号显示
plt.rcParams['figure.figsize'] = (10, 6)         # 图表尺寸

# 4.2 颜色应用 - ${colormap}颜色映射表
colors = plt.cm.${colormap}(np.linspace(0, 1, 5))

# 数据准备
categories = ['家庭', '小说', '心理', '科技', '儿童']
region1 = [1200, 2400, 1800, 2200, 1600]
region2 = [1050, 2100, 1300, 1600, 1340]

# 创建图表
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

# 图表1: ${this.getChartDisplayName(chartType1)}
if '${chartType1}' == 'line':
    ax1.plot(categories, region1, color=colors[0], linewidth=2, 
             linestyle='${this.getMatplotlibLineStyle(lineStyle)}', 
             marker='o', label='地区1')
    ax1.plot(categories, region2, color=colors[1], linewidth=2,
             linestyle='${this.getMatplotlibLineStyle(lineStyle)}', 
             marker='s', label='地区2')
    ax1.set_title('图书采购趋势对比')
elif '${chartType1}' == 'bar':
    x = np.arange(len(categories))
    ax1.bar(x - 0.2, region1, 0.4, color=colors[0], label='地区1')
    ax1.bar(x + 0.2, region2, 0.4, color=colors[1], label='地区2')
    ax1.set_xticks(x)
    ax1.set_xticklabels(categories)
    ax1.set_title('图书采购数量对比')

# 图表2: ${this.getChartDisplayName(chartType2)}
if '${chartType2}' == 'area':
    ax2.fill_between(categories, region1, alpha=0.3, color=colors[0], label='地区1')
    ax2.fill_between(categories, region2, alpha=0.3, color=colors[1], label='地区2')
    ax2.set_title('图书采购面积图')

# 4.3 线型样式与图表美化
ax1.grid(${showGrid}, alpha=0.3)
ax2.grid(${showGrid}, alpha=0.3)
ax1.legend() if ${showLegend} else None
ax2.legend() if ${showLegend} else None

plt.tight_layout()
plt.show()</code></pre>
            `;
        } else {
            pythonCode.innerHTML = `
                <pre><code># 第四章 4.3.2 实例代码 - 美元/人民币汇率走势
# 知识点：时间序列、线型应用、图表样式

import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# 样式配置
plt.style.use('seaborn-v0_8')  # 使用seaborn样式
plt.rcParams['font.sans-serif'] = ['SimHei']

# 汇率数据准备
dates_2017 = ['2017-07-01', '2017-07-08', '2017-07-15', '2017-07-22', '2017-07-29']
dates_2019 = ['2019-07-01', '2019-07-08', '2019-07-15', '2019-07-22', '2019-07-29']
rates_2017 = [6.78, 6.79, 6.80, 6.82, 6.84]
rates_2019 = [6.85, 6.86, 6.87, 6.88, 6.89]

# 创建图表
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

# 图表1: ${this.getChartDisplayName(chartType1)}
if '${chartType1}' == 'line':
    # 4.3.2 线型选择应用
    ax1.plot(dates_2017, rates_2017, color='${this.colorSchemes[this.currentColorScheme][0]}',
             linewidth=2, linestyle='${this.getMatplotlibLineStyle(lineStyle)}',
             marker='o', label='2017年')
    ax1.plot(dates_2019, rates_2019, color='${this.colorSchemes[this.currentColorScheme][1]}',
             linewidth=2, linestyle='${this.getMatplotlibLineStyle(lineStyle)}',
             marker='s', label='2019年')
    ax1.set_title('汇率走势对比')
    ax1.tick_params(axis='x', rotation=45)

# 图表2: ${this.getChartDisplayName(chartType2)}
if '${chartType2}' == 'scatter':
    ax2.scatter(rates_2017, rates_2019, color='${this.colorSchemes[this.currentColorScheme][2]}',
               alpha=0.7, s=100)
    ax2.set_title('汇率散点关系')

# 图表样式设置
ax1.grid(${showGrid}, alpha=0.3)
ax2.grid(${showGrid}, alpha=0.3)
if ${showLegend}:
    ax1.legend(loc='best')

plt.tight_layout()
plt.show()</code></pre>
            `;
        }

        javascriptCode.innerHTML = `
            <pre><code>// ECharts配置代码示例
// 基于第四章数据可视化需求

// 图表1: ${this.getChartDisplayName(chartType1)}
const option1 = {
    title: {
        text: '图表1: ${this.getChartDisplayName(chartType1)}',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            return params[0].name + '<br/>' + 
                   params.map(p => p.marker + p.seriesName + ': ' + p.value).join('<br/>');
        }
    },
    legend: {
        show: ${showLegend},
        data: ['${this.currentExample === 'book_purchase' ? '地区1' : '2017年'}', '${this.currentExample === 'book_purchase' ? '地区2' : '2019年'}'],
        top: '10%'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ${JSON.stringify(this.currentData.map(d => d.category || d.date))},
        axisLabel: { rotate: 45 }
    },
    yAxis: { type: 'value' },
    series: [
        {
            name: '${this.currentExample === 'book_purchase' ? '地区1' : '2017年'}',
            type: '${chartType1}',
            data: ${JSON.stringify(this.currentData.map(d => d.value1))},
            smooth: ${smooth},
            lineStyle: { type: '${lineStyle}' },
            itemStyle: { color: '${this.colorSchemes[this.currentColorScheme][0]}' }
        }
    ]
};

// 图表2: ${this.getChartDisplayName(chartType2)}
const option2 = {
    title: {
        text: '图表2: ${this.getChartDisplayName(chartType2)}',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ${JSON.stringify(this.currentData.map(d => d.category || d.date))},
        axisLabel: { rotate: 45 }
    },
    yAxis: { type: 'value' },
    series: [
        {
            name: '${this.currentExample === 'book_purchase' ? '地区2' : '2019年'}',
            type: '${chartType2}',
            data: ${JSON.stringify(this.currentData.map(d => d.value2))},
            smooth: ${smooth},
            lineStyle: { type: '${lineStyle}' },
            itemStyle: { color: '${this.colorSchemes[this.currentColorScheme][1]}' }
        }
    ]
};

// 图表初始化
echarts.init(document.getElementById('chart1')).setOption(option1);
echarts.init(document.getElementById('chart2')).setOption(option2);</code></pre>
        `;
    }

    // 获取图表显示名称
    getChartDisplayName(chartType) {
        const names = {
            'line': '折线图',
            'bar': '柱状图',
            'stacked_bar': '堆叠柱状图',
            'area': '面积图',
            'scatter': '散点图',
            'pie': '饼图',
            'radar': '雷达图'
        };
        return names[chartType] || chartType;
    }

    // 获取matplotlib线型样式
    getMatplotlibLineStyle(lineStyle) {
        const styles = {
            'solid': '-',
            'dashed': '--',
            'dotted': ':',
            'dashdot': '-.'
        };
        return styles[lineStyle] || '-';
    }

    // 更新章节标题
    updateSectionTitle() {
        const sectionElement = document.getElementById('currentSection');
        if (!sectionElement) return;
        
        if (this.currentExample === 'book_purchase') {
            sectionElement.textContent = '4.2.3 图书采购情况实例';
        } else if (this.currentExample === 'exchange_rate') {
            sectionElement.textContent = '4.3.2 汇率走势图实例';
        } else {
            sectionElement.textContent = '自定义数据实例';
        }
    }

    // 应用更改
    applyChanges() {
        this.updateCharts();
        this.updateCodeDisplay();
        this.showAlert('图表样式已成功应用！');
    }

    // 重置数据
    resetData() {
        this.loadExampleData();
        this.updateDataTable();
        this.updateCharts();
        this.updateStats();
        this.showAlert('数据已重置为初始状态！');
    }

    // 导出为PNG
    exportAsPNG() {
        if (!this.charts.chart1) {
            this.showAlert('请先初始化图表！', 'error');
            return;
        }
        
        try {
            const chart = this.charts.chart1;
            const imageUrl = chart.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `chapter4-${this.currentExample}-chart.png`;
            link.click();
            this.showAlert('图表已导出为PNG文件！');
        } catch (error) {
            this.showAlert('图表导出失败！', 'error');
            console.error('导出失败:', error);
        }
    }

    // 导出数据
    exportData() {
        const dataStr = JSON.stringify(this.currentData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `chapter4-${this.currentExample}-data.json`;
        link.click();
        this.showAlert('数据已导出为JSON文件！');
    }

    // 显示导入模态框
    showImportModal() {
        document.getElementById('importModal').style.display = 'block';
    }

    // 隐藏导入模态框
    hideImportModal() {
        document.getElementById('importModal').style.display = 'none';
    }

    // 导入数据
    importData() {
        const fileInput = document.getElementById('dataFile');
        const file = fileInput.files[0];
        
        if (!file) {
            this.showAlert('请选择要导入的文件！', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (Array.isArray(data)) {
                    this.currentData = data;
                    this.updateDataTable();
                    this.updateCharts();
                    this.updateStats();
                    this.hideImportModal();
                    this.showAlert('数据导入成功！');
                } else {
                    this.showAlert('文件格式不正确！', 'error');
                }
            } catch (error) {
                this.showAlert('文件解析错误！', 'error');
            }
        };
        reader.readAsText(file);
    }

    // 截图功能
    takeScreenshot() {
        if (typeof html2canvas === 'undefined') {
            this.showAlert('html2canvas库未加载，无法截图！', 'error');
            return;
        }
        
        html2canvas(document.querySelector('.chart-area')).then(canvas => {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'chapter4-visualization-screenshot.png';
            link.click();
        }).catch(error => {
            this.showAlert('截图失败！', 'error');
            console.error('截图失败:', error);
        });
    }

    // 切换主题
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // 更新图表主题
        Object.keys(this.charts).forEach(key => {
            if (this.charts[key]) {
                this.charts[key].dispose();
                this.charts[key] = echarts.init(document.getElementById(`mainChart${key.slice(-1)}`), isDark ? 'dark' : null);
            }
        });
        this.updateCharts();
        this.showAlert(isDark ? '已切换到暗色主题' : '已切换到亮色主题');
    }

    // 全屏查看
    toggleFullscreen() {
        const chartArea = document.querySelector('.chart-area');
        
        if (!document.fullscreenElement) {
            // 进入全屏
            if (chartArea.requestFullscreen) {
                chartArea.requestFullscreen();
            } else if (chartArea.webkitRequestFullscreen) {
                chartArea.webkitRequestFullscreen();
            } else if (chartArea.msRequestFullscreen) {
                chartArea.msRequestFullscreen();
            }
            this.showAlert('已进入全屏模式，按ESC键退出');
        } else {
            // 退出全屏
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            this.showAlert('已退出全屏模式');
        }
    }

    // 图表全屏
    toggleChartFullscreen(chartId) {
        const chartContainer = document.getElementById(`mainChart${chartId}`).parentElement;
        
        if (!document.fullscreenElement) {
            if (chartContainer.requestFullscreen) {
                chartContainer.requestFullscreen();
            }
            this.showAlert(`图表${chartId}已进入全屏模式`);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            this.showAlert('已退出全屏模式');
        }
    }

    // 下载图表
    downloadChart(chartId) {
        const chart = this.charts[`chart${chartId}`];
        if (!chart) {
            this.showAlert('图表未初始化！', 'error');
            return;
        }
        
        try {
            const imageUrl = chart.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#fff'
            });
            
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `chart${chartId}-${this.currentExample}.png`;
            link.click();
            this.showAlert(`图表${chartId}已下载！`);
        } catch (error) {
            this.showAlert('图表下载失败！', 'error');
            console.error('下载失败:', error);
        }
    }

    // 数据编辑功能
    addDataRow() {
        const newRow = this.currentExample === 'book_purchase' ? 
            { category: '新类别', value1: 0, value2: 0 } :
            this.currentExample === 'exchange_rate' ?
            { date: new Date().toISOString().split('T')[0], value1: 0, value2: 0 } :
            { category: '新数据', value1: 0, value2: 0 };
        
        this.currentData.push(newRow);
        this.updateDataTable();
        this.updateCharts();
        this.updateStats();
        this.showAlert('已添加新数据行');
    }

    removeDataRow() {
        if (this.currentData.length > 1) {
            this.currentData.pop();
            this.updateDataTable();
            this.updateCharts();
            this.updateStats();
            this.showAlert('已删除最后一行数据');
        } else {
            this.showAlert('至少需要保留一行数据！', 'error');
        }
    }

    addDataColumn() {
        this.currentData.forEach(item => {
            item['value3'] = Math.random() * 1000;
        });
        this.updateDataTable();
        this.updateCharts();
        this.updateStats();
        this.showAlert('已添加新数据列');
    }

    removeDataColumn() {
        if (Object.keys(this.currentData[0]).length > 3) {
            this.currentData.forEach(item => {
                delete item['value3'];
            });
            this.updateDataTable();
            this.updateCharts();
            this.updateStats();
            this.showAlert('已删除扩展数据列');
        } else {
            this.showAlert('没有可删除的数据列！', 'error');
        }
    }

    // 调整图表大小
    resizeCharts() {
        Object.keys(this.charts).forEach(key => {
            if (this.charts[key]) {
                this.charts[key].resize();
            }
        });
    }

    // 显示提醒
    showAlert(message, type = 'success') {
        const alertModal = document.getElementById('alertModal');
        const alertMessage = document.getElementById('alertMessage');
        
        if (!alertModal || !alertMessage) {
            console.log(`Alert: ${message} (${type})`);
            return;
        }
        
        alertMessage.textContent = message;
        
        // 设置消息类型样式
        alertMessage.className = '';
        if (type === 'error') {
            alertMessage.classList.add('error');
        } else if (type === 'warning') {
            alertMessage.classList.add('warning');
        } else {
            alertMessage.classList.add('success');
        }
        
        alertModal.style.display = 'block';
        
        // 自动关闭提醒
        const closeTime = type === 'error' ? 5000 : type === 'warning' ? 4000 : 3000;
        setTimeout(() => {
            alertModal.style.display = 'none';
        }, closeTime);
    }

    // 导出分析报告（简化版）
    exportAnalysisReport() {
        this.showAlert('分析报告功能正在开发中...', 'warning');
    }

    // 高级分析（简化版）
    performAdvancedAnalysis() {
        this.showAlert('高级分析功能正在开发中...', 'warning');
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成，初始化平台...');
    
    // 检查ECharts是否加载
    if (typeof echarts === 'undefined') {
        console.error('ECharts库未加载！');
        return;
    }
    
    // 创建全局平台实例
    window.platform = new Chapter4AdvancedVisualizationPlatform();
    console.log('第四章高级数据可视化平台初始化完成！');
});

// 处理窗口加载完成
window.addEventListener('load', () => {
    console.log('页面完全加载完成！');
    
    // 如果DOM加载时echarts还未准备好，这里再次尝试初始化
    if (window.platform) {
        console.log('平台已初始化，重新检查图表...');
        setTimeout(() => {
            window.platform.initializeCharts();
        }, 100);
    }
});