'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Award, Shield } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Counter } from "./counter"


function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}


export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#17171c] flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-red-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-orange-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-green-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-blue-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
      </div>


      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-2 text-sm leading-6 text-slate-700 ring-1 ring-slate-900/10 hover:ring-slate-900/20 bg-white/50 backdrop-blur">
              <span className="inline-flex items-center gap-2 text-white">
                <div className="h-2 w-2 rounded-full bg-green-500  animate-pulse"></div>
                실시간 데이터 분석 중
              </span>
              <Link href="#featured" className="font-semibold text-blue-600 ml-2">
                <span className="absolute inset-0" aria-hidden="true" />
                둘러보기 <ArrowRight className="inline h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8">
            <span className="block">쿠팡의 베스트 상품을</span>
            <span className="block bg-gradient-to-r from-red-500 via-orange-500 via-green-500 to-blue-600 bg-clip-text text-transparent">
              전문적으로 큐레이션
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl leading-8 text-slate-300 max-w-4xl mx-auto">
            데이터 분석과 전문 리뷰를 통해 검증된 상품만을 추천합니다.
            <br className="hidden sm:block" />
            매일 업데이트되는 랭킹과 할인 정보로 현명한 쇼핑을 경험하세요.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-[12px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300" asChild>
              <Link href="#categories">
                카테고리 탐색하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-[12px] px-8 py-4 text-lg border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50" asChild>
              <Link href="#featured">베스트 상품 보기</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2">
                <Counter to={1000} duration={2.5} />+
              </div>
              <div className="text-sm lg:text-base text-slate-200">분석된 상품</div>
            </div>

            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2">
                <Counter to={50} duration={2} />+
              </div>
              <div className="text-sm lg:text-base text-slate-200">카테고리</div>
            </div>

            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2">
                <Counter to={24} duration={2} />시간
              </div>
              <div className="text-sm lg:text-base text-slate-200">실시간 업데이트</div>
            </div>

            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2">
                <Counter to={95} duration={2.2} />%
              </div>
              <div className="text-sm lg:text-base text-slate-200">만족도</div>
            </div>
          </div>

        </div>
      </div>

      {/* Features section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-100 mb-4">데이터 기반 분석</h3>
            <p className="text-slate-400 leading-relaxed">
              실시간 판매 데이터, 리뷰 분석, 가격 추이를 종합하여
              객관적이고 신뢰할 수 있는 상품 평가를 제공합니다.
            </p>
          </div>

          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-100 mb-4">전문가 큐레이션</h3>
            <p className="text-slate-400 leading-relaxed">
              각 분야별 전문가들이 직접 테스트하고 검증한
              상품만을 선별하여 추천드립니다.
            </p>
          </div>

          <div className="text-center group">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-slate-100 mb-4">검증된 품질</h3>
            <p className="text-slate-400 leading-relaxed">
              엄격한 품질 검증 프로세스를 통과한 상품만을
              소개하여 안심하고 구매할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}