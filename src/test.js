// src/test.ts
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Inicializa o ambiente de testes
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Carrega todos os arquivos de teste
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);