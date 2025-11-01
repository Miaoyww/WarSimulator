<script lang="ts">
	import { leftBarPinned } from '$lib/stores/sidebar-store';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
</script>

{#if $leftBarPinned}
	<div
		class="sidebar blur-backdrop absolute top-30 bottom-30 z-1000 overflow-hidden rounded-lg"
		style:left={'20px'}
		transition:slide={{ duration: 500, delay: 50, easing: cubicInOut, axis: 'y' }}
	>
		<div class="sidebar-content">
			<div class="panel-section">
				<div class="panel-title">
					<span class="icon">⚔️</span>
					<span>阵营选择</span>
				</div>
				<div class="faction-selector" id="faction-selector"></div>

				<div class="custom-faction-panel">
					<div class="form-group">
						<label>阵营名称</label>
						<input type="text" id="faction-name" placeholder="输入阵营名称" />
					</div>
					<div class="form-group">
						<label>阵营颜色</label>
						<div class="color-input">
							<input type="color" id="faction-color" value="#ff0000" />
							<div
								class="color-preview"
								id="color-preview"
								style="background-color: #ff0000;"
							></div>
						</div>
					</div>
					<button id="add-faction-btn">
						<span class="icon">➕</span>
						<span>添加阵营</span>
					</button>
				</div>
			</div>

			<div class="panel-section">
				<div class="panel-title">
					<span class="icon">⚔️</span>
					<span>军事单位</span>
				</div>
				<div class="unit-selector">
					<div class="branch-selector" id="branch-selector">
						<button class="branch-btn active" data-branch="army">陆军</button>
						<button class="branch-btn" data-branch="navy">海军</button>
						<button class="branch-btn" data-branch="air_force">空军</button>
					</div>

					<div class="level-selector" id="level-selector"></div>

					<div class="unit-list" id="unit-list"></div>

					<!-- 陆军自定义编组面板 -->
					<div class="custom-unit-panel custom-panel active" id="army-custom-panel">
						<div class="form-group">
							<label>编组名称</label>
							<input type="text" id="army-unit-name" placeholder="输入编组名称" />
						</div>

						<div class="component-group">
							<div class="component-title">步兵单位</div>
							<div class="component-controls">
								<select id="army-infantry-type">
									<option value="light">轻步兵</option>
									<option value="mechanized">机械化步兵</option>
									<option value="airborne">空降兵</option>
									<option value="marine">海军陆战队</option>
								</select>
								<select id="army-infantry-quality">
									<option value="basic">基础装备</option>
									<option value="standard">标准装备</option>
									<option value="advanced">先进装备</option>
									<option value="elite">精英装备</option>
								</select>
								<input
									type="number"
									id="army-infantry-count"
									placeholder="数量"
									min="1"
									max="10000"
									value="1000"
								/>
							</div>
							<button
								id="add-army-infantry"
								class="success"
								style="width: 100%; margin-bottom: 10px;"
							>
								<span class="icon">➕</span>
								<span>添加步兵单位</span>
							</button>
							<div class="component-list" id="army-infantry-list"></div>
						</div>

						<div class="component-group">
							<div class="component-title">装甲单位</div>
							<div class="component-controls">
								<select id="army-armor-type">
									<option value="light_tank">轻型坦克</option>
									<option value="main_tank">主战坦克</option>
									<option value="apc">装甲运兵车</option>
									<option value="ifv">步兵战车</option>
								</select>
								<select id="army-armor-quality">
									<option value="gen1">一代</option>
									<option value="gen2">二代</option>
									<option value="gen3">三代</option>
									<option value="gen4">四代</option>
									<option value="gen5">五代</option>
								</select>
								<input
									type="number"
									id="army-armor-count"
									placeholder="数量"
									min="1"
									max="1000"
									value="50"
								/>
							</div>
							<button id="add-army-armor" class="success" style="width: 100%; margin-bottom: 10px;">
								<span class="icon">➕</span>
								<span>添加装甲单位</span>
							</button>
							<div class="component-list" id="army-armor-list"></div>
						</div>

						<div class="component-group">
							<div class="component-title">导弹单位</div>
							<div class="component-controls">
								<select id="army-missile-type">
									<option value="anti_tank">反坦克导弹</option>
									<option value="surface_air">防空导弹</option>
									<option value="cruise">巡航导弹</option>
									<option value="ballistic">弹道导弹</option>
								</select>
								<select id="army-missile-quality">
									<option value="basic">基础型</option>
									<option value="guided">制导型</option>
									<option value="precision">精确制导</option>
									<option value="advanced">先进型</option>
								</select>
								<input
									type="number"
									id="army-missile-count"
									placeholder="数量"
									min="1"
									max="500"
									value="20"
								/>
							</div>
							<button
								id="add-army-missile"
								class="success"
								style="width: 100%; margin-bottom: 10px;"
							>
								<span class="icon">➕</span>
								<span>添加导弹单位</span>
							</button>
							<div class="component-list" id="army-missile-list"></div>
						</div>

						<button id="create-army-unit" class="warning" style="width: 100%; margin-top: 15px;">
							<span class="icon">🛠️</span>
							<span>创建陆军单位</span>
						</button>
					</div>

					<!-- 海军自定义编组面板 -->
					<div class="custom-unit-panel custom-panel" id="navy-custom-panel">
						<div class="form-group">
							<label>编组名称</label>
							<input type="text" id="navy-unit-name" placeholder="输入编组名称" />
						</div>

						<div class="component-group">
							<div class="component-title">水面舰艇</div>
							<div class="component-controls">
								<select id="navy-surface-type">
									<option value="destroyer">驱逐舰</option>
									<option value="frigate">护卫舰</option>
									<option value="cruiser">巡洋舰</option>
									<option value="carrier">航空母舰</option>
								</select>
								<select id="navy-surface-quality">
									<option value="basic">基础型</option>
									<option value="guided">制导型</option>
									<option value="advanced">先进型</option>
									<option value="cutting_edge">尖端型</option>
								</select>
								<input
									type="number"
									id="navy-surface-count"
									placeholder="数量"
									min="1"
									max="20"
									value="2"
								/>
							</div>
							<button
								id="add-navy-surface"
								class="success"
								style="width: 100%; margin-bottom: 10px;"
							>
								<span class="icon">➕</span>
								<span>添加水面舰艇</span>
							</button>
							<div class="component-list" id="navy-surface-list"></div>
						</div>

						<div class="component-group">
							<div class="component-title">潜艇单位</div>
							<div class="component-controls">
								<select id="navy-submarine-type">
									<option value="attack_sub">攻击潜艇</option>
									<option value="missile_sub">导弹潜艇</option>
									<option value="nuclear_sub">核潜艇</option>
									<option value="ssbn">弹道导弹潜艇</option>
								</select>
								<select id="navy-submarine-quality">
									<option value="basic">基础型</option>
									<option value="stealth">隐身型</option>
									<option value="advanced">先进型</option>
									<option value="nuclear">核动力型</option>
								</select>
								<input
									type="number"
									id="navy-submarine-count"
									placeholder="数量"
									min="1"
									max="15"
									value="1"
								/>
							</div>
							<button
								id="add-navy-submarine"
								class="success"
								style="width: 100%; margin-bottom: 10px;"
							>
								<span class="icon">➕</span>
								<span>添加潜艇单位</span>
							</button>
							<div class="component-list" id="navy-submarine-list"></div>
						</div>

						<div class="component-group">
							<div class="component-title">支援舰艇</div>
							<div class="component-controls">
								<select id="navy-support-type">
									<option value="amphibious">两栖攻击舰</option>
									<option value="logistics">后勤支援舰</option>
									<option value="mine">扫雷舰</option>
									<option value="patrol">巡逻舰</option>
								</select>
								<select id="navy-support-quality">
									<option value="basic">基础型</option>
									<option value="standard">标准型</option>
									<option value="advanced">先进型</option>
									<option value="specialized">专用型</option>
								</select>
								<input
									type="number"
									id="navy-support-count"
									placeholder="数量"
									min="1"
									max="10"
									value="1"
								/>
							</div>
							<button
								id="add-navy-support"
								class="success"
								style="width: 100%; margin-bottom: 10px;"
							>
								<span class="icon">➕</span>
								<span>添加支援舰艇</span>
							</button>
							<div class="component-list" id="navy-support-list"></div>
						</div>

						<button id="create-navy-unit" class="warning" style="width: 100%; margin-top: 15px;">
							<span class="icon">🛠️</span>
							<span>创建海军单位</span>
						</button>
					</div>

					<!-- 空军自定义编组面板 -->
					<div class="custom-unit-panel custom-panel" id="air_force-custom-panel">
						<div class="form-group">
							<label>编组名称</label>
							<input type="text" id="air-force-unit-name" placeholder="输入编组名称" />
						</div>

						<div class="component-group">
							<div class="component-title">战斗机单位</div>
							<div class="component-controls">
								<select id="air-force-fighter-type">
									<option value="air_superiority">制空战斗机</option>
									<option value="multi_role">多用途战斗机</option>
									<option value="interceptor">拦截机</option>
									<option value="stealth">隐身战斗机</option>
								</select>
								<select id="air-force-fighter-quality">
									<option value="gen4">四代机</option>
									<option value="gen4plus">四代半</option>
									<option value="gen5">五代机</option>
									<option value="gen6">六代机</option>
								</select>
								<input
									type="number"
									id="air-force-fighter-count"
									placeholder="数量"
									min="1"
									max="50"
									value="12"
								/>
							</div>
							<button
								id="add-air-force-fighter"
								class="success"
								style="width: 100%; margin-bottom: 10px;"
							>
								<span class="icon">➕</span>
								<span>添加战斗机单位</span>
							</button>
							<div class="component-list" id="air-force-fighter-list"></div>
						</div>

						<div class="component-group">
							<div class="component-title">轰炸机单位</div>
							<div class="component-controls">
								<select id="air-force-bomber-type">
									<option value="strategic">战略轰炸机</option>
									<option value="tactical">战术轰炸机</option>
									<option value="stealth_bomber">隐身轰炸机</option>
									<option value="fighter_bomber">战斗轰炸机</option>
								</select>
								<select id="air-force-bomber-quality">
									<option value="basic">基础型</option>
									<option value="advanced">先进型</option>
									<option value="stealth">隐身型</option>
									<option value="hypersonic">高超音速型</option>
								</select>
								<input
									type="number"
									id="air-force-bomber-count"
									placeholder="数量"
									min="1"
									max="20"
									value="4"
								/>
							</div>
							<button
								id="add-air-force-bomber"
								class="success"
								style="width: 100%; margin-bottom: 10px;"
							>
								<span class="icon">➕</span>
								<span>添加轰炸机单位</span>
							</button>
							<div class="component-list" id="air-force-bomber-list"></div>
						</div>

						<div class="component-group">
							<div class="component-title">支援飞机</div>
							<div class="component-controls">
								<select id="air-force-support-type">
									<option value="awacs">预警机</option>
									<option value="tanker">加油机</option>
									<option value="transport">运输机</option>
									<option value="recon">侦察机</option>
								</select>
								<select id="air-force-support-quality">
									<option value="basic">基础型</option>
									<option value="standard">标准型</option>
									<option value="advanced">先进型</option>
									<option value="specialized">专用型</option>
								</select>
								<input
									type="number"
									id="air-force-support-count"
									placeholder="数量"
									min="1"
									max="15"
									value="2"
								/>
							</div>
							<button
								id="add-air-force-support"
								class="success"
								style="width: 100%; margin-bottom: 10px;"
							>
								<span class="icon">➕</span>
								<span>添加支援飞机</span>
							</button>
							<div class="component-list" id="air-force-support-list"></div>
						</div>

						<button
							id="create-air-force-unit"
							class="warning"
							style="width: 100%; margin-top: 15px;"
						>
							<span class="icon">🛠️</span>
							<span>创建空军单位</span>
						</button>
					</div>
				</div>
			</div>

			<div class="panel-section">
				<div class="panel-title">
					<span class="icon">📝</span>
					<span>行动记录</span>
				</div>
				<div class="action-log" id="action-log">
					<p>系统已启动，等待操作...</p>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.panel-section {
		padding: 10px;
	}

	.panel-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: bold;
		margin-bottom: 5px;
	}

	.sidebar-content {
		flex: 1;
		padding: 15px;
		overflow-y: auto;
	}

	.panel-section {
		border-radius: 8px;
		padding: 15px;
		margin-bottom: 15px;
	}

	.panel-title {
		font-size: 1rem;
		margin-bottom: 12px;
		padding-bottom: 8px;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.panel-title .icon {
		width: 20px;
		text-align: center;
	}

	/* 自定义编组面板样式 */
	.custom-unit-panel {
		margin-top: 15px;
		padding-top: 15px;
		border-top: 1px solid var(--border-color);
	}

	.component-group {
		margin-bottom: 15px;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--border-color);
	}

	.component-title {
		font-size: 0.9rem;
		margin-bottom: 8px;
		color: var(--text-primary);
		font-weight: 600;
	}

	.component-controls {
		display: flex;
		gap: 10px;
		margin-bottom: 8px;
	}

	.component-controls select,
	.component-controls input {
		flex: 1;
	}

	.component-list {
		max-height: 150px;
		overflow-y: auto;
		border-radius: 4px;
		padding: 5px;
	}

	.action-log {
		height: 200px;
		overflow-y: auto;
		font-size: 0.8rem;
		border-radius: 6px;
		padding: 10px;
	}

	.action-log p {
		padding: 5px 0;
	}

	.action-log p:last-child {
		border-bottom: none;
	}

	.faction-selector {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-bottom: 15px;
	}

	.custom-faction-panel {
		margin-top: 15px;
		padding-top: 15px;
		border-top: 1px solid var(--border-color);
	}

	.form-group {
		margin-bottom: 10px;
	}

	.form-group label {
		display: block;
		margin-bottom: 5px;
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.color-input {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.color-input input {
		flex: 1;
	}

	.color-preview {
		width: 30px;
		height: 30px;
		border-radius: 4px;
		border: 1px solid var(--border-color);
	}

	@keyframes pulse {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.6;
		}
	}

	/* 自定义编组面板切换 */
	.custom-panel {
		display: none;
	}

	.custom-panel.active {
		display: block;
	}
</style>
