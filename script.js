// 第四章高级数据可视化平台 - JavaScript核心代码
// 基于matplotlib图表样式、颜色应用与线型选择的教学内容

class DataVisualizationPlatform {
    constructor() {
        this.currentExample = 'book_purchase';
        this.currentData = [];
        this.charts = {};
        this.initialized = false;
        this.init();
    }

    init() {
        if (this.initialized) return;
        
        // 初始化数据
        this.initExampleData();
        
        // 绑定事件
        this.bindEvents();
        
        // 初始化图表
        this.initCharts();
        
        // 更新UI
        this.updateUI();
        
        this.initialized = true;
    }

    initExampleData() {
        switch (this.currentExample) {
            case 'book_purchase':
                // 4.2.3 实例：两个地区对不同种类图书的采购情况
                this.currentData = [
                    { category: '家庭', value1: 1200, value2: 1050 },
                    { category: '小说', value1: 2400, value2: 2100 },
                    { category: '心理', value1: 1800, value2: 1300 },
                    { category: '科技', value1: 2200, value2: 1600 },
                    { category: '儿童', value1: 1600, value2: 1340 }
                ];
                break;
            case 'exchange_rate':
                // 4.3.2 实例：2017年7月与2019年7月美元/人民币汇率走势
                this.currentData = [
                    { date: '7月3日', value1: 6.8007, value2: 6.8640 },
                    { date: '7月4日', value1: 6.8007, value2: 6.8705 },
                    { date: '7月5日', value1: 6.8015, value2: 6.8697 },
                    { date: '7月6日', value1: 6.8015, value2: 6.8697 },
                    { date: '7月7日', value1: 6.8060, value2: 6.8697 },
                    { date: '7月8日', value1: 6.8060, value2: 6.8881 },
                    { date: '7月9日', value1: 6.8060, value2: 6.8853 },
                    { date: '7月10日', value1: 6.8036, value2: 6.8856 },
                    { date: '7月11日', value1: 6.8025, value2: 6.8677 },
                    { date: '7月12日', value1: 6.7877, value2: 6.8662 },
                    { date: '7月13日', value1: 6.7835, value2: 6.8662 },
                    { date: '7月14日', value1: 6.7758, value2: 6.8662 },
                    { date: '7月17日', value1: 6.7700, value2: 6.8827 },
                    { date: '7月18日', value1: 6.7463, value2: 6.8761 },
                    { date: '7月19日', value1: 6.7519, value2: 6.8635 },
                    { date: '7月24日', value1: 6.7511, value2: 6.8860 },
                    { date: '7月25日', value1: 6.7511, value2: 6.8737 },
                    { date: '7月26日', value1: 6.7539, value2: 6.8796 },
                    { date: '7月31日', value1: 6.7265, value2: 6.8841 }
                ];
                break;

            case 'product_sales':
                // 4.4.2 实例：不同产品各季度的销售额
                this.currentData = [
                    { category: '第1季度', value1: 2144, value2: 853, value3: 153 },
                    { category: '第2季度', value1: 4617, value2: 1214, value3: 155 },
                    { category: '第3季度', value1: 7674, value2: 2414, value3: 292 },
                    { category: '第4季度', value1: 6666, value2: 4409, value3: 680 }
                ];
                break;

            case 'temperature':
                // 4.5.2 实例：未来15天的最高气温和最低气温
                this.currentData = [
                    { category: '7月4日', value1: 32, value2: 19 },
                    { category: '7月5日', value1: 33, value2: 19 },
                    { category: '7月6日', value1: 34, value2: 20 },
                    { category: '7月7日', value1: 34, value2: 22 },
                    { category: '7月8日', value1: 33, value2: 22 },
                    { category: '7月9日', value1: 31, value2: 21 },
                    { category: '7月10日', value1: 30, value2: 22 },
                    { category: '7月11日', value1: 29, value2: 16 },
                    { category: '7月12日', value1: 30, value2: 18 },
                    { category: '7月13日', value1: 29, value2: 18 },
                    { category: '7月14日', value1: 26, value2: 17 },
                    { category: '7月15日', value1: 23, value2: 14 },
                    { category: '7月16日', value1: 21, value2: 15 },
                    { category: '7月17日', value1: 25, value2: 16 },
                    { category: '7月18日', value1: 31, value2: 16 }
                ];
                break;

            default:
                // 其他实例数据
                this.currentData = [
                    { category: '产品A', value1: 2144, value2: 853, value3: 153 },
                    { category: '产品B', value1: 4617, value2: 1214, value3: 155 },
                    { category: '产品C', value1: 7674, value2: 2414, value3: 292 },
                    { category: '产品D', value1: 6666, value2: 4409, value3: 680 }
                ];
        }

        this.updateDataTable();
    }

    bindEvents() {
        // 实例选择事件
        const exampleSelect = document.getElementById('exampleSelect');
        if (exampleSelect) {
            exampleSelect.addEventListener('change', (e) => {
                this.currentExample = e.target.value;
                this.initExampleData();
                this.updateCharts();
                this.updateUI();
            });
        }

        // 编辑数据按钮事件绑定
        this.bindButtonClick('editData', () => this.toggleDataEditor());

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
        this.bindButtonClick('closeEditor', () => this.toggleDataEditor());
        this.bindButtonClick('closeEditor', () => this.toggleDataEditor());

        // 数据导入功能
        this.bindButtonClick('confirmImport', () => this.importData());
        this.bindButtonClick('cancelImport', () => this.hideImportModal());
        
        // 分析功能按钮
        this.bindButtonClick('exportAnalysis', () => this.exportAnalysisReport());
        this.bindButtonClick('advancedAnalysis', () => this.performAdvancedAnalysis());
        
        // 窗口大小变化
        window.addEventListener('resize', () => this.resizeCharts());

        // 颜色方案选择
        document.querySelectorAll('.color-scheme').forEach(scheme => {
            scheme.addEventListener('click', () => {
                document.querySelectorAll('.color-scheme').forEach(s => s.classList.remove('active'));
                scheme.classList.add('active');
                this.updateCharts();
            });
        });

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

        // 绑定控制面板事件
        this.bindControlEvents();
    }

    bindButtonClick(buttonId, callback) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', callback);
        }
    }

    bindControlEvents() {
        // 样式应用按钮
        this.bindButtonClick('applyChanges', () => this.applyStyleChanges());
        
        // 重置数据
        this.bindButtonClick('resetData', () => this.resetData());
        
        // 导出功能
        this.bindButtonClick('exportPNG', () => this.exportChartsAsPNG());
        this.bindButtonClick('exportData', () => this.exportData());
        this.bindButtonClick('importData', () => this.showImportModal());
        this.bindButtonClick('screenshot', () => this.takeScreenshot());
        
        // 趋势预测
        this.bindButtonClick('generateForecast', () => this.generateForecast());
        
        // 全屏模式
        this.bindButtonClick('fullscreen', () => this.toggleFullscreen());
        
        // 章节信息
        this.bindButtonClick('chapterInfo', () => this.showChapterInfo());

        // 图表全屏和下载
        document.querySelectorAll('.chart-fullscreen').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartId = e.target.dataset.chart;
                this.fullscreenChart(chartId);
            });
        });

        document.querySelectorAll('.chart-download').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartId = e.target.dataset.chart;
                this.downloadChart(chartId);
            });
        });

        // 实时滑块事件
        this.bindSliderEvents();
    }

    bindSliderEvents() {
        const sliders = [
            { id: 'markerSize', callback: (value) => this.updateMarkerSize(value) },
            { id: 'lineWidth', callback: (value) => this.updateLineWidth(value) },
            { id: 'opacity', callback: (value) => this.updateOpacity(value) },
            { id: 'animationSpeed', callback: (value) => this.updateAnimationSpeed(value) }
        ];

        sliders.forEach(slider => {
            const element = document.getElementById(slider.id);
            const valueElement = document.getElementById(slider.id + 'Value');
            
            if (element && valueElement) {
                element.addEventListener('input', (e) => {
                    const value = e.target.value;
                    valueElement.textContent = slider.id === 'opacity' ? 
                        `${Math.round(value * 100)}%` : 
                        slider.id === 'animationSpeed' ? 
                        `${value}ms` : 
                        `${value}px`;
                    
                    slider.callback(value);
                });
            }
        });
    }

    initCharts() {
        // 初始化ECharts实例
        this.charts['chart1'] = echarts.init(document.getElementById('mainChart1'));
        this.charts['chart2'] = echarts.init(document.getElementById('mainChart2'));
        
        // 初始化Chart.js实例用于趋势分析
        this.initTrendChart();
        
        this.updateCharts();
    }

    updateCharts() {
        const option1 = this.generateChartOptions('chart1');
        const option2 = this.generateChartOptions('chart2');
        
        this.charts['chart1'].setOption(option1, true);
        this.charts['chart2'].setOption(option2, true);
        
        this.updateTrendChart();
    }

    generateChartOptions(chartId) {
        const chartType1 = document.getElementById('chartType1').value;
        const chartType2 = document.getElementById('chartType2').value;
        
        const chartType = chartId === 'chart1' ? chartType1 : chartType2;
        
        const baseOption = {
            animation: document.getElementById(chartId === 'chart1' ? 'animation1' : 'animation2').checked,
            animationDuration: parseInt(document.getElementById('animationSpeed').value),
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                show: document.getElementById('legendToggle').checked,
                data: ['地区1', '地区2']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                    dataView: { readOnly: false }
                }
            }
        };

        switch (chartType) {
            case 'line':
                return this.generateLineChartOptions(baseOption);
            case 'bar':
                return this.generateBarChartOptions(baseOption);
            case 'stacked_bar':
                return this.generateStackedBarChartOptions(baseOption);
            case 'area':
                return this.generateAreaChartOptions(baseOption);
            case 'scatter':
                return this.generateScatterChartOptions(baseOption);
            case 'pie':
                return this.generatePieChartOptions(baseOption);
            case 'radar':
                return this.generateRadarChartOptions(baseOption);
            default:
                return baseOption;
        }
    }

    generateLineChartOptions(baseOption) {
        const categories = this.currentData.map(item => 
            this.currentExample === 'exchange_rate' ? item.date : item.category
        );
        
        const values1 = this.currentData.map(item => item.value1);
        const values2 = this.currentData.map(item => item.value2);
        
        const smooth = document.getElementById('smoothToggle').checked;
        const lineStyle = document.getElementById('lineStyle').value;
        const markerSize = parseInt(document.getElementById('markerSize').value);
        const lineWidth = parseInt(document.getElementById('lineWidth').value);
        const opacity = parseFloat(document.getElementById('opacity').value);
        
        // 获取颜色方案
        const colorScheme = this.getSelectedColorScheme();
        const finalColors = colorScheme || ['#9AC5F4', '#A7ECEE'];

        return {
            ...baseOption,
            xAxis: {
                type: 'category',
                data: categories,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#666'
                    }
                },
                axisLabel: {
                    rotate: this.currentExample === 'exchange_rate' ? 45 : 0
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#666'
                    }
                },
                splitLine: {
                    show: document.getElementById('gridToggle').checked,
                    lineStyle: {
                        color: '#f0f0f0'
                    }
                }
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
    }

    generateBarChartOptions(baseOption) {
        const categories = this.currentData.map(item => 
            this.currentExample === 'exchange_rate' ? item.date : item.category
        );
        
        const values1 = this.currentData.map(item => item.value1);
        const values2 = this.currentData.map(item => item.value2);
        
        const opacity = parseFloat(document.getElementById('opacity').value);
        const colorScheme = this.getSelectedColorScheme();
        const finalColors = colorScheme || ['#9AC5F4', '#A7ECEE'];

        return {
            ...baseOption,
            xAxis: {
                type: 'category',
                data: categories,
                axisLabel: {
                    rotate: this.currentExample === 'exchange_rate' ? 45 : 0
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: document.getElementById('gridToggle').checked
                }
            },
            series: [
                {
                    name: '地区1',
                    type: 'bar',
                    data: values1,
                    itemStyle: { color: finalColors[0], opacity: opacity }
                },
                {
                    name: '地区2',
                    type: 'bar',
                    data: values2,
                    itemStyle: { color: finalColors[1], opacity: opacity }
                }
            ]
        };
    }

    generateStackedBarChartOptions(baseOption) {
        const categories = this.currentData.map(item => 
            this.currentExample === 'exchange_rate' ? item.date : item.category
        );
        
        const values1 = this.currentData.map(item => item.value1);
        const values2 = this.currentData.map(item => item.value2);
        
        const opacity = parseFloat(document.getElementById('opacity').value);
        const colorScheme = this.getSelectedColorScheme();
        const finalColors = colorScheme || ['#9AC5F4', '#A7ECEE'];

        return {
            ...baseOption,
            xAxis: {
                type: 'category',
                data: categories,
                axisLabel: {
                    rotate: this.currentExample === 'exchange_rate' ? 45 : 0
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: document.getElementById('gridToggle').checked
                }
            },
            series: [
                {
                    name: '地区1',
                    type: 'bar',
                    stack: 'total',
                    data: values1,
                    itemStyle: { color: finalColors[0], opacity: opacity }
                },
                {
                    name: '地区2',
                    type: 'bar',
                    stack: 'total',
                    data: values2,
                    itemStyle: { color: finalColors[1], opacity: opacity }
                }
            ]
        };
    }

    generateAreaChartOptions(baseOption) {
        const categories = this.currentData.map(item => 
            this.currentExample === 'exchange_rate' ? item.date : item.category
        );
        
        const values1 = this.currentData.map(item => item.value1);
        const values2 = this.currentData.map(item => item.value2);
        
        const opacity = parseFloat(document.getElementById('opacity').value);
        const colorScheme = this.getSelectedColorScheme();
        const finalColors = colorScheme || ['#9AC5F4', '#A7ECEE'];

        return {
            ...baseOption,
            xAxis: {
                type: 'category',
                data: categories,
                axisLabel: {
                    rotate: this.currentExample === 'exchange_rate' ? 45 : 0
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: document.getElementById('gridToggle').checked
                }
            },
            series: [
                {
                    name: '地区1',
                    type: 'line',
                    stack: 'total',
                    areaStyle: {},
                    data: values1,
                    itemStyle: { color: finalColors[0], opacity: opacity },
                    lineStyle: { opacity: opacity }
                },
                {
                    name: '地区2',
                    type: 'line',
                    stack: 'total',
                    areaStyle: {},
                    data: values2,
                    itemStyle: { color: finalColors[1], opacity: opacity },
                    lineStyle: { opacity: opacity }
                }
            ]
        };
    }

    generateScatterChartOptions(baseOption) {
        const values1 = this.currentData.map(item => [item.value1, item.value2]);
        
        const markerSize = parseInt(document.getElementById('markerSize').value);
        const opacity = parseFloat(document.getElementById('opacity').value);
        const colorScheme = this.getSelectedColorScheme();
        const finalColors = colorScheme || ['#9AC5F4'];

        return {
            ...baseOption,
            xAxis: {
                type: 'value',
                name: '地区1',
                splitLine: {
                    show: document.getElementById('gridToggle').checked
                }
            },
            yAxis: {
                type: 'value',
                name: '地区2',
                splitLine: {
                    show: document.getElementById('gridToggle').checked
                }
            },
            series: [
                {
                    type: 'scatter',
                    data: values1,
                    symbolSize: markerSize,
                    itemStyle: { 
                        color: finalColors[0],
                        opacity: opacity
                    }
                }
            ]
        };
    }

    generatePieChartOptions(baseOption) {
        const categories = this.currentData.map(item => 
            this.currentExample === 'exchange_rate' ? item.date : item.category
        );
        const values1 = this.currentData.map(item => item.value1);
        
        const opacity = parseFloat(document.getElementById('opacity').value);
        const colorScheme = this.getSelectedColorScheme();

        return {
            ...baseOption,
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: categories.map((category, index) => ({
                        name: category,
                        value: values1[index]
                    })),
                    itemStyle: {
                        opacity: opacity
                    },
                    label: {
                        show: true,
                        formatter: '{b}: {c} ({d}%)'
                    }
                }
            ]
        };
    }

    generateRadarChartOptions(baseOption) {
        const categories = this.currentData.map(item => 
            this.currentExample === 'exchange_rate' ? item.date : item.category
        );
        const values1 = this.currentData.map(item => item.value1);
        const values2 = this.currentData.map(item => item.value2);
        
        const opacity = parseFloat(document.getElementById('opacity').value);
        const colorScheme = this.getSelectedColorScheme();
        const finalColors = colorScheme || ['#9AC5F4', '#A7ECEE'];

        return {
            ...baseOption,
            radar: {
                indicator: categories.map(category => ({ name: category, max: Math.max(...values1, ...values2) * 1.2 }))
            },
            series: [
                {
                    type: 'radar',
                    data: [
                        {
                            value: values1,
                            name: '地区1',
                            itemStyle: { color: finalColors[0], opacity: opacity },
                            lineStyle: { opacity: opacity }
                        },
                        {
                            value: values2,
                            name: '地区2',
                            itemStyle: { color: finalColors[1], opacity: opacity },
                            lineStyle: { opacity: opacity }
                        }
                    ]
                }
            ]
        };
    }

    getSelectedColorScheme() {
        const activeScheme = document.querySelector('.color-scheme.active');
        if (!activeScheme) return null;
        
        const scheme = activeScheme.dataset.scheme;
        
        // 高级淡色方案 - 优雅淡色、精致淡色、宁静淡色
        switch (scheme) {
            case 'elegant':
                return ['#9AC5F4', '#A7ECEE', '#FFE699', '#FFA8A8', '#C4C1E0'];
            case 'delicate':
                return ['#F8C6D7', '#D4F1F9', '#FFE6B3', '#B5EAD7', '#C9C2FF'];
            case 'serene':
                return ['#E1F5FE', '#F3E5F5', '#E8F5E8', '#FFF3E0', '#FCE4EC'];
            case 'matplotlib':
                return ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'];
            default:
                // 默认使用优雅淡色方案
                return ['#9AC5F4', '#A7ECEE', '#FFE699', '#FFA8A8', '#C4C1E0'];
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
                    <td><input type="number" value="${item.value1}" data-index="${index}" data-field="value1" step="0.1" class="data-input"></td>
                    <td><input type="number" value="${item.value2}" data-index="${index}" data-field="value2" step="0.1" class="data-input"></td>
                </tr>
            `).join('');
        } else if (this.currentExample === 'exchange_rate') {
            headers = '<tr><th onclick="platform.sortData(\'date\')" style="cursor: pointer;">日期 🔽</th><th onclick="platform.sortData(\'value1\')" style="cursor: pointer;">2017年汇率 🔽</th><th onclick="platform.sortData(\'value2\')" style="cursor: pointer;">2019年汇率 🔽</th></tr>';
            rows = this.currentData.map((item, index) => `
                <tr>
                    <td>${item.date}</td>
                    <td><input type="number" value="${item.value1}" data-index="${index}" data-field="value1" step="0.01" class="data-input"></td>
                    <td><input type="number" value="${item.value2}" data-index="${index}" data-field="value2" step="0.01" class="data-input"></td>
                </tr>
            `).join('');
        } else {
            headers = '<tr><th onclick="platform.sortData(\'category\')" style="cursor: pointer;">类别 🔽</th><th onclick="platform.sortData(\'value1\')" style="cursor: pointer;">系列1 🔽</th><th onclick="platform.sortData(\'value2\')" style="cursor: pointer;">系列2 🔽</th></tr>';
            rows = this.currentData.map((item, index) => `
                <tr>
                    <td><input type="text" value="${item.category}" data-index="${index}" data-field="category" class="data-input"></td>
                    <td><input type="number" value="${item.value1}" data-index="${index}" data-field="value1" step="0.1" class="data-input"></td>
                    <td><input type="number" value="${item.value2}" data-index="${index}" data-field="value2" step="0.1" class="data-input"></td>
                </tr>
            `).join('');
        }
        
        table.innerHTML = `<table><thead>${headers}</thead><tbody>${rows}</tbody></table>`;
        
        // 绑定input事件监听器
        this.bindInputEvents();
    }

    bindInputEvents() {
        // 为所有input元素添加事件监听器
        const inputs = document.querySelectorAll('#dataTable input');
        inputs.forEach(input => {
            // 移除之前的事件监听器
            input.removeEventListener('input', this.handleInputChange);
            input.removeEventListener('change', this.handleInputChange);
            
            // 添加新的事件监听器
            input.addEventListener('input', this.handleInputChange.bind(this));
            input.addEventListener('change', this.handleInputChange.bind(this));
        });
    }

    handleInputChange(event) {
        const input = event.target;
        const index = parseInt(input.getAttribute('data-index'));
        const field = input.getAttribute('data-field');
        const value = input.value;
        
        console.log('Input changed:', { index, field, value });
        
        if (index >= 0 && field) {
            this.updateDataValue(index, field, value);
        }
    }

    updateDataValue(index, field, value) {
        console.log('正在更新数据:', index, field, value);
        
        if (index >= 0 && index < this.currentData.length) {
            if (field === 'value1' || field === 'value2') {
                const numValue = parseFloat(value);
                this.currentData[index][field] = isNaN(numValue) ? 0 : numValue;
            } else {
                this.currentData[index][field] = value;
            }
            
            console.log('更新后数据:', this.currentData[index]);
            
            this.updateCharts();
            this.updateStats();
            this.updateTrendChart();
            this.showAlert('数据已更新！');
        } else {
            console.error('索引超出范围:', index);
            this.showAlert('数据更新失败，请检查索引！', 'error');
        }
    }

    sortData(field) {
        this.currentData.sort((a, b) => {
            if (field === 'category' || field === 'date') {
                return a[field].localeCompare(b[field]);
            } else {
                return a[field] - b[field];
            }
        });
        
        this.updateDataTable();
        this.updateCharts();
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

    // 编辑数据功能
    toggleDataEditor() {
        const dataEditor = document.querySelector('.data-editor');
        if (dataEditor) {
            if (dataEditor.style.display === 'none' || dataEditor.style.display === '') {
                dataEditor.style.display = 'block';
                this.showAlert('数据编辑功能已激活！请在下方的数据表格中直接编辑数值');
            } else {
                dataEditor.style.display = 'none';
                this.showAlert('数据编辑功能已关闭');
            }
        } else {
            this.showAlert('数据编辑面板未找到！', 'error');
        }
    }

    // 样式应用
    applyStyleChanges() {
        this.updateCharts();
        this.showAlert('样式已应用！');
    }

    // 重置数据
    resetData() {
        this.initExampleData();
        this.updateCharts();
        this.updateStats();
        this.showAlert('数据已重置！');
    }

    // 更新UI
    updateUI() {
        const chartTitle = document.getElementById('chartTitle');
        const currentSection = document.getElementById('currentSection');
        
        if (chartTitle && currentSection) {
            switch (this.currentExample) {
                case 'book_purchase':
                    chartTitle.textContent = '4.2.3 两个地区对不同种类图书的采购情况';
                    currentSection.textContent = '4.2.3 图书采购情况实例';
                    break;
                case 'exchange_rate':
                    chartTitle.textContent = '4.3.2 2017年7月与2019年7月国际外汇市场美元/人民币汇率走势';
                    currentSection.textContent = '4.3.2 汇率走势图';
                    break;
                case 'product_sales':
                    chartTitle.textContent = '4.4.2 标记不同产品各季度的销售额';
                    currentSection.textContent = '4.4.2 产品销售分析';
                    break;
                case 'temperature':
                    chartTitle.textContent = '4.5.2 未来15天的最高气温和最低气温';
                    currentSection.textContent = '4.5.2 气温变化趋势';
                    break;
                default:
                    chartTitle.textContent = '第四章数据可视化平台';
                    currentSection.textContent = '自定义数据';
            }
        }
        
        this.updateStats();
    }

    // 更新统计信息
    updateStats() {
        const values = [...this.currentData.map(item => item.value1), ...this.currentData.map(item => item.value2)];
        
        document.getElementById('dataCount').textContent = this.currentData.length;
        
        if (values.length > 0) {
            const sum = values.reduce((a, b) => a + b, 0);
            const mean = sum / values.length;
            const max = Math.max(...values);
            const min = Math.min(...values);
            
            document.getElementById('dataMean').textContent = mean.toFixed(2);
            document.getElementById('dataMax').textContent = max.toFixed(2);
            document.getElementById('dataMin').textContent = min.toFixed(2);
        }
    }

    // 滑块更新函数
    updateMarkerSize(size) {
        this.updateCharts();
    }

    updateLineWidth(width) {
        this.updateCharts();
    }

    updateOpacity(opacity) {
        this.updateCharts();
    }

    updateAnimationSpeed(speed) {
        this.updateCharts();
    }

    // 调整图表大小
    resizeCharts() {
        Object.keys(this.charts).forEach(key => {
            if (this.charts[key]) {
                this.charts[key].resize();
            }
        });
    }

    // 主题切换
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        this.updateCharts();
        this.showAlert('主题已切换！');
    }

    // 全屏模式
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    // 图表全屏
    fullscreenChart(chartId) {
        const chartElement = document.getElementById(`mainChart${chartId}`);
        if (chartElement && !chartElement.classList.contains('fullscreen')) {
            chartElement.classList.add('fullscreen');
            this.charts[`chart${chartId}`].resize();
        } else {
            chartElement.classList.remove('fullscreen');
            this.charts[`chart${chartId}`].resize();
        }
    }

    // 导出图表
    downloadChart(chartId) {
        try {
            const chart = this.charts[`chart${chartId}`];
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

    // 趋势分析图表
    initTrendChart() {
        const ctx = document.getElementById('trendChart').getContext('2d');
        this.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    updateTrendChart() {
        if (!this.trendChart) return;
        
        const labels = this.currentData.map(item => 
            this.currentExample === 'exchange_rate' ? item.date : item.category
        );
        
        const values1 = this.currentData.map(item => item.value1);
        const values2 = this.currentData.map(item => item.value2);
        
        this.trendChart.data.labels = labels;
        this.trendChart.data.datasets = [
            {
                label: '系列1',
                data: values1,
                borderColor: '#9AC5F4',
                backgroundColor: 'rgba(154, 197, 244, 0.1)',
                tension: 0.1
            },
            {
                label: '系列2',
                data: values2,
                borderColor: '#A7ECEE',
                backgroundColor: 'rgba(167, 236, 238, 0.1)',
                tension: 0.1
            }
        ];
        
        this.trendChart.update();
        this.updateAnalysis();
    }

    // 分析功能
    updateAnalysis() {
        const values1 = this.currentData.map(item => item.value1);
        const values2 = this.currentData.map(item => item.value2);
        
        // 计算相关系数
        const correlation = this.calculateCorrelation(values1, values2);
        document.getElementById('correlation').textContent = correlation.toFixed(3);
        
        // 计算增长率
        if (values1.length > 1) {
            const growthRate = ((values1[values1.length - 1] - values1[0]) / values1[0] * 100).toFixed(1);
            document.getElementById('growthRate').textContent = `${growthRate}%`;
        }
        
        // 计算标准差
        const stdDev = this.calculateStandardDeviation(values1);
        document.getElementById('stdDev').textContent = stdDev.toFixed(2);
        
        // 计算变异系数
        const mean = values1.reduce((a, b) => a + b, 0) / values1.length;
        const cv = (stdDev / mean * 100).toFixed(1);
        document.getElementById('cv').textContent = `${cv}%`;
        
        // 更新趋势摘要
        this.updateTrendSummary();
        
        // 更新数据洞察
        this.updateInsights();
    }

    calculateCorrelation(arr1, arr2) {
        if (arr1.length !== arr2.length) return 0;
        
        const n = arr1.length;
        const sum1 = arr1.reduce((a, b) => a + b, 0);
        const sum2 = arr2.reduce((a, b) => a + b, 0);
        const sum1Sq = arr1.reduce((a, b) => a + b * b, 0);
        const sum2Sq = arr2.reduce((a, b) => a + b * b, 0);
        const pSum = arr1.reduce((a, b, i) => a + b * arr2[i], 0);
        
        const num = pSum - (sum1 * sum2) / n;
        const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));
        
        return den === 0 ? 0 : num / den;
    }

    calculateStandardDeviation(arr) {
        const n = arr.length;
        const mean = arr.reduce((a, b) => a + b, 0) / n;
        return Math.sqrt(arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n);
    }

    updateTrendSummary() {
        const values1 = this.currentData.map(item => item.value1);
        const summary = document.getElementById('trendSummary');
        
        if (values1.length > 1) {
            const trend = values1[values1.length - 1] > values1[0] ? '上升' : '下降';
            const change = Math.abs(values1[values1.length - 1] - values1[0]).toFixed(2);
            
            summary.innerHTML = `
                <p>数据呈现<strong>${trend}</strong>趋势，变化量为 ${change}</p>
                <p>数据点数量: ${values1.length}</p>
                <p>数据范围: ${Math.min(...values1).toFixed(2)} - ${Math.max(...values1).toFixed(2)}</p>
            `;
        }
    }

    updateInsights() {
        const insightsList = document.getElementById('insightsList');
        const values1 = this.currentData.map(item => item.value1);
        
        if (values1.length > 0) {
            const maxVal = Math.max(...values1);
            const minVal = Math.min(...values1);
            const avgVal = values1.reduce((a, b) => a + b, 0) / values1.length;
            
            insightsList.innerHTML = `
                <li>最大值出现在 ${this.currentData[values1.indexOf(maxVal)].category || this.currentData[values1.indexOf(maxVal)].date}</li>
                <li>最小值出现在 ${this.currentData[values1.indexOf(minVal)].category || this.currentData[values1.indexOf(minVal)].date}</li>
                <li>平均值: ${avgVal.toFixed(2)}</li>
                <li>数据波动范围: ${(maxVal - minVal).toFixed(2)}</li>
            `;
        }
    }

    // 趋势预测
    generateForecast() {
        const values1 = this.currentData.map(item => item.value1);
        
        if (values1.length > 1) {
            // 简单的线性回归预测
            const n = values1.length;
            const x = Array.from({length: n}, (_, i) => i);
            const y = values1;
            
            const sumX = x.reduce((a, b) => a + b, 0);
            const sumY = y.reduce((a, b) => a + b, 0);
            const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
            const sumX2 = x.reduce((a, b) => a + b * b, 0);
            
            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            
            const forecastValue = slope * n + intercept;
            
            document.getElementById('forecastResults').innerHTML = `
                <p>基于线性回归预测，下一个数据点约为: <strong>${forecastValue.toFixed(2)}</strong></p>
                <p>趋势斜率: ${slope.toFixed(3)}</p>
                <p>预测模型: y = ${slope.toFixed(3)}x + ${intercept.toFixed(3)}</p>
            `;
        }
    }

    // 导出功能
    exportData() {
        const dataStr = JSON.stringify(this.currentData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `data-${this.currentExample}.json`;
        link.click();
        
        this.showAlert('数据已导出！');
    }

    exportChartsAsPNG() {
        try {
            this.downloadChart('1');
            setTimeout(() => this.downloadChart('2'), 500);
        } catch (error) {
            this.showAlert('图表导出失败！', 'error');
        }
    }

    takeScreenshot() {
        html2canvas(document.querySelector('.container')).then(canvas => {
            const link = document.createElement('a');
            link.download = `screenshot-${this.currentExample}.png`;
            link.href = canvas.toDataURL();
            link.click();
            this.showAlert('截图已保存！');
        });
    }

    // 数据导入
    showImportModal() {
        document.getElementById('importModal').style.display = 'block';
    }

    hideImportModal() {
        document.getElementById('importModal').style.display = 'none';
    }

    importData() {
        const fileInput = document.getElementById('dataFile');
        const file = fileInput.files[0];
        
        if (!file) {
            this.showAlert('请选择文件！', 'error');
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
                    this.showAlert('数据导入成功！');
                    this.hideImportModal();
                } else {
                    this.showAlert('文件格式不正确！', 'error');
                }
            } catch (error) {
                this.showAlert('文件解析失败！', 'error');
            }
        };
        
        reader.readAsText(file);
    }

    // 章节信息
    showChapterInfo() {
        document.getElementById('chapterModal').style.display = 'block';
    }

    // 分析报告
    exportAnalysisReport() {
        const report = this.generateAnalysisReport();
        const blob = new Blob([report], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `analysis-report-${this.currentExample}.txt`;
        link.click();
        
        this.showAlert('分析报告已导出！');
    }

    generateAnalysisReport() {
        const values1 = this.currentData.map(item => item.value1);
        const values2 = this.currentData.map(item => item.value2);
        
        return `数据分析报告 - ${this.currentExample}
生成时间: ${new Date().toLocaleString()}

数据统计:
- 数据点数量: ${values1.length}
- 平均值: ${(values1.reduce((a, b) => a + b, 0) / values1.length).toFixed(2)}
- 最大值: ${Math.max(...values1).toFixed(2)}
- 最小值: ${Math.min(...values1).toFixed(2)}
- 标准差: ${this.calculateStandardDeviation(values1).toFixed(2)}

趋势分析:
- 相关系数: ${this.calculateCorrelation(values1, values2).toFixed(3)}
- 数据波动性: ${((Math.max(...values1) - Math.min(...values1)) / Math.min(...values1) * 100).toFixed(1)}%

数据洞察:
${this.generateDataInsights()}
`;
    }

    generateDataInsights() {
        const values1 = this.currentData.map(item => item.value1);
        let insights = '';
        
        if (values1.length > 0) {
            const trend = values1[values1.length - 1] > values1[0] ? '上升' : '下降';
            insights += `- 整体趋势: ${trend}\n`;
            insights += `- 数据范围: ${Math.min(...values1).toFixed(2)} - ${Math.max(...values1).toFixed(2)}\n`;
            insights += `- 平均增长率: ${((values1[values1.length - 1] - values1[0]) / values1[0] * 100).toFixed(1)}%\n`;
        }
        
        return insights;
    }

    // 高级分析
    performAdvancedAnalysis() {
        this.showAlert('高级分析功能开发中...');
    }

    // 提示消息
    showAlert(message, type = 'success') {
        const alertModal = document.getElementById('alertModal');
        const alertMessage = document.getElementById('alertMessage');
        
        if (alertModal && alertMessage) {
            alertMessage.textContent = message;
            alertMessage.className = type;
            alertModal.style.display = 'block';
            
            setTimeout(() => {
                alertModal.style.display = 'none';
            }, 3000);
        }
    }
}

// 初始化平台
const platform = new DataVisualizationPlatform();

// 全局函数供HTML调用
window.updateDataValue = (index, field, value) => platform.updateDataValue(index, field, value);
window.sortData = (field) => platform.sortData(field);
window.platform = platform;