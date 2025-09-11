#!/usr/bin/env node

import { execSync } from 'child_process';
import chalk from 'chalk';

function runLint() {
  try {
    console.log(chalk.blue('🔍 ESLint 검사 중...\n'));

    // ESLint 실행
    execSync('eslint . --ext .js,.jsx,.ts,.tsx --format=stylish', {
      encoding: 'utf8',
      stdio: 'pipe',
    });

    // 수정사항이 없는 경우
    console.log(chalk.green('✅ 수정사항이 없습니다.'));
    process.exit(0);
  } catch (error) {
    const output = error.stdout || error.stderr || '';

    if (output.includes('error') || output.includes('warning')) {
      console.log(chalk.red('❌ ESLint 검사에서 문제를 발견했습니다:\n'));
      console.log(output);

      // 에러와 경고 개수 계산
      const errorCount = (output.match(/error/g) || []).length;
      const warningCount = (output.match(/warning/g) || []).length;

      if (errorCount > 0) {
        console.log(
          chalk.red(`\n📊 총 ${errorCount}개의 에러가 발견되었습니다.`),
        );
      }

      if (warningCount > 0) {
        console.log(
          chalk.yellow(`⚠️  총 ${warningCount}개의 경고가 발견되었습니다.`),
        );
      }

      console.log(chalk.blue('\n💡 수정하려면 다음 명령어를 사용하세요:'));
      console.log(chalk.cyan('   pnpm lint:fix'));

      process.exit(1);
    } else {
      // 예상치 못한 에러
      console.log(chalk.red('❌ ESLint 실행 중 오류가 발생했습니다:'));
      console.log(chalk.red(error.message));
      process.exit(1);
    }
  }
}

runLint();
