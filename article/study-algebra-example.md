## 解方程 $3^x = x^9$
解：等式两边同时开 $x$ 次方，得 ${(3^x)}^{\frac{1}{x}}={(x^9)}^{\frac{1}{x}}$ ，即 $3=x^{\frac{9}{x}}$

上式两边同时立方，得 $27=3^3=(x^{\frac{9}{x}})^{3}=x^{\frac{27}{x}}$

上式两边同时开27次方，得 $27^{\frac{1}{27}}=({x}^{\frac{27}{x}})^\frac{1}{27}=x^\frac{1}{x}$

$\therefore x=27$

## 已知 $2x^2-6x+y^2=0$ ，求 $x^2+2x+y^2$ (1式)的最大值
解：根据 $2x^2-6x+y^2=0$ ，得 $y^2=-2x^2+6x$ (2式)

$\because y^2\ge0$ ，即 $-2x^2+6x\ge0$ ， $\therefore 0\le x\le3$

将(2)式代入(1)式，得 $x^2+2x-2x^2+6x=-x^2+8x=-(x^2-8x+16)+16=-(x-4)^2+16$ (3式)

(3)式的最大值出现在 $x=3$ 处，即 $-(3-4)^2+16=15$

## 解方程 $\frac{1}{x}+\frac{1}{x^2}+\frac{1}{x^3}=14$
解：令 $t=\frac{1}{x}$ ，则原式得 $t+t^2+t^3=14$ ，即 $t^3+t^2+t-14=0$

调整得 $t^3-8+t^2+t-6=0$ ，即 $(t-2)(t^2+2t+4)+(t-2)(t+3)=0$

$\therefore (t-2)(t^2+3t+7)=0$

$\because t^2+3t+7=0$ 无实数解， $\therefore t-2=0$ ，即 $x=\frac{1}{2}$

## 已知 $a^3-b^3=16$ ，求 $ab$ 的最小值
解：令 $a^3=t+8$ 、 $b^3=t-8$ ，则有 $(ab)^3=t^2-64\ge-64$

$\therefore ab\ge-4$ ，即 $ab$ 的最小值为 $-4$

## 解方程 $x+\frac{x}{\sqrt{x^2-1}}=2\sqrt{2}$
解：根据 $\sqrt{x^2-1}$ 位于分母且等式右侧为正数，得 $x^2-1>0$ 、 $x$ 非负，即 $x>1$

令 $\frac{1}{x}=\sin \alpha$ ， $0<\alpha<\frac{\pi}{2}$

构建直角三角形，斜边长为 $x$ ， $\alpha$ 角的对边为 $1$ 。

根据勾股定理， $\alpha$ 角的相邻直角边长为 $\sqrt{x^2-1}$ ，则 $\therefore \cos \alpha=\frac{\sqrt{x^2-1}}{x}$

原方程得 $\frac{1}{\sin \alpha}+\frac{1}{\cos \alpha}=2\sqrt{2}$ ，即 $\sin \alpha+\cos \alpha=2\sqrt{2}\sin \alpha\cos \alpha$

$\therefore \frac{1}{\sqrt{2}}(\sin \alpha+\cos \alpha)=\sin 2\alpha$  (1式)

$\because \frac{1}{\sqrt{2}}=\sin \frac{\pi}{4}=\cos \frac{\pi}{4}$ ，(1式)可得 $\sin (\alpha+\frac{\pi}{4})=\sin 2\alpha$

$\therefore \alpha+\frac{\pi}{4}=2\alpha$ 或 $\alpha+\frac{\pi}{4}=\pi-2\alpha$

$\therefore \alpha=\frac{\pi}{4}$ ，即  $x=\frac{1}{\sin \frac{\pi}{4}}=\sqrt{2}$
