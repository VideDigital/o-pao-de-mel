# Ô Pão de Mel — Landing Page

Landing page demonstrativa criada pela Agência VIDE para apresentar um curso de pão de mel a visitantes de campanhas Meta Ads.

## Status

**Demonstração em desenvolvimento, não publicada e não pronta para anúncios.** O repositório é privado, e o site foi criado na branch `main`.

### Visual

- Design claro e editorial, com tons de creme, chocolate e caramelo;
- Layout mobile-first/responsivo, botão de inscrição no rodapé do celular;
- Apresentação, possíveis tópicos, galeria ilustrativa, público e FAQ;
- Nenhuma avaliação, garantia, resultado financeiro, preço ou condição de venda inventada;
- **Imagens ilustrativas** de chocolate / confeitaria usadas como referência, **não são fotos da Ô Pão de Mel**. Devem ser trocadas antes da publicação real.

### Para testar

Execute um servidor local simples (ou conecte este repositório ao Cloudflare Pages como projeto de desenvolvimento):

```bash
python -m http.server 8080
```

Abra `http://localhost:8080`.

Cloudflare Pages: escolha **Framework preset = None**; **Build command = (vazio)**; **Build output directory = /** (raiz do repositório), usando conexão com GitHub. Não conecte o domínio oficial antes da aprovação.

### Configurações oficiais

Edite apenas o arquivo `config.js`:

- `checkoutUrl`: link oficial HTTPS da Kiwify, no domínio Kiwify;
- `whatsappNumber`: DDI + DDD + telefone (somente dígitos);
- `whatsappMessage`: mensagem inicial;
- `videoUrl`: vídeo oficial YouTube ou MP4/WebM HTTPS;
- `preserveCampaignParams`: encaminhar parâmetros UTM e fbclid presentes na URL para a Kiwify.

Sem os URLs oficiais, os botões exibem um aviso e **não enviam o visitante a terceiros**. O botão de vídeo também só reproduz um vídeo quando o endereço for configurado.

### Tracking

O `script.js` dispara `dataLayer.push` para:

- `course_checkout_click`: clique real no botão com checkout configurado;
- `course_whatsapp_click`: clique real no WhatsApp configurado;
- `course_video_play`: tentativa de reprodução com vídeo configurado.

**Nenhum GTM, GA4 ou Meta Pixel foi instalado.** Os eventos não significam venda, lead validado ou compra confirmada. Para acompanhar vendas de fato, será necessário configurar o processo de conversão na Kiwify e, se disponível, integrar o evento de compra, com consentimento e políticas de privacidade adequados.

### Checklist anterior à publicação

- [ ] Confirmar nome do curso, quem ensina, proposta, público e grade;
- [ ] Receber logo e fotografias reais aprovadas pelo titular da marca;
- [ ] Receber vídeo oficial;
- [ ] Confirmar informações de preço, acesso, bônus, suporte e eventuais garantias;
- [ ] Receber e validar link do checkout Kiwify e número WhatsApp;
- [ ] Substituir imagens genéricas/ilustrativas e validar uso de imagem;
- [ ] Implementar aviso/política de privacidade e consentimento adequado se forem ativados pixels;
- [ ] Configurar e testar GA4/GTM, Meta Pixel e eventos de conversão sem disparos duplicados;
- [ ] Validar ambiente mobile, navegação, carregamento, compartilhamento e rastreamento;
- [ ] Remover `<meta name="robots" content="noindex, nofollow">` e `robots.txt` bloqueante apenas quando aprovado para indexação;
- [ ] Conectar domínio e publicar.

### Créditos das fotos de demonstração

Fotografias ilustrativas da plataforma Pexels, nas URLs do arquivo `index.html` (IDs 14048850, 34281975 e 9501445). As imagens são apenas referências de design, **não representam produções, alunos nem a pessoa instrutora do curso**. Verifique direitos e substitua por mídia autorizada antes do lançamento.

Feito com HTML, CSS e JavaScript — sem framework e sem dependências de compilação.
