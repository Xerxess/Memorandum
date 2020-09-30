<!-- TOC -->

- [OCR](#ocr)
- [CNN+RNN+CTC](#cnnrnnctc)
- [CRNN 网络结构](#crnn-网络结构)
- [calamari](#calamari)
- [PaddleOCR](#paddleocr)
- [tesseract](#tesseract)
- [chineseocr_lite](#chineseocr_lite)
- [TrWebOCR](#trwebocr)

<!-- /TOC -->

# OCR

# CNN+RNN+CTC

* CNN: （卷积层），使用深度CNN，对输入图像提取特征，得到特征图；
* RNN: 循环神经网络（Recurrent neural network：RNN）是神经网络的一种 提取图像卷积特征中的序列特征
* CTC: Connectionist Temporal Classification(CTC) 训练

# CRNN 网络结构

全称为 Convolutional Recurrent Neural Network 主要用于端到端地对不定长的文本序列进行识别，不用先对单个文字进行切割，而是将文本识别转化为时序依赖的序列学习问题，就是基于图像的序列识别。

* CNN: （卷积层），使用深度CNN，对输入图像提取特征，得到特征图；
* RNN（循环层），使用双向RNN（BLSTM）对特征序列进行预测，对序列中的每个特征向量进行学习，并输出预测标签（真实值）分布；
* CTC loss（转录层），使用 CTC 损失，把从循环层获取的一系列标签分布转换成最终的标签序列。

# calamari

使用python3基于OCRopy和Kraken的OCR引擎。

https://github.com/Calamari-OCR/calamari

# PaddleOCR

PaddleOCR旨在打造一套丰富、领先、且实用的OCR工具库，助力使用者训练出更好的模型，并应用落地。

https://github.com/PaddlePaddle/PaddleOCR

# tesseract

该软件包包含一个OCR引擎-libtesseract和一个命令行程序- tesseract。

https://github.com/tesseract-ocr/tesseract


# chineseocr_lite

超轻量级中文ocr，支持竖排文字识别, 支持ncnn推理 ( dbnet(1.8M) + crnn(2.5M) + anglenet(378KB)) 总模型仅4.7M

https://github.com/ouyanghuiyu/chineseocr_lite

# TrWebOCR

TrWebOCR-开源的离线OCR

https://github.com/alisen39/TrWebOCR